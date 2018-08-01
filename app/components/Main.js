import React from 'react';
import {
  ActivityIndicator, Dimensions, StyleSheet, View
} from 'react-native';
import MapView from 'react-native-maps';
import { findIndex } from 'lodash';
import PokemonCard from './PokemonCard';
import SearchForm from './SearchForm';
import RetroMapStyles from '../styles/RetroMapStyles.json';

const { width, height } = Dimensions.get('window');

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      displayedPokemonId: 1,
      isLoading: true,
      isChoosingLocation: false,
      latitude: null,
      longitude: null,
    };
  }

  /**
   * Sends a GET request to retrieve all of the Pokemon data from the database when the component
   * mounts.
   */
  componentDidMount() {
    // @TODO - change URL to production one
    const url = 'http://192.168.1.10:3000/api/v1/pokemon/all';
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            pokemons: data,
            isLoading: false,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }, console.log('Initial state set.'));
        },
          err => console.error(err.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
      })
      .catch(err => console.error(err));
  }

  /**
   * Toggles the loading boolean value in the state.
   */
  setLoadingState() {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading });
  }

  /**
   * Updates the ID value in the state for the Pokemon to currently display.
   * @param {number} pokemonId - The ID of the Pokemon to display.
   */
  updateDisplayedPokemon(pokemonId) {
    // @TODO - remove this
    console.log('Updating displayed Pokemon.');

    this.setState({
      displayedPokemonId: pokemonId,
    });
  }

  /**
   * Sends a PUT request to update the ownership status of the Pokemon with the given ID.
   * @param {number} pokemonId - The ID of the Pokemon to update in the Pokedex.
   * @param {boolean} owned - The boolean value to be updated of if the Pokemon is owned.
   */
  updatePokedex(pokemonId, owned) {
    // const { pokemons, isChoosingLocation } = this.state;
    this.setState({ isChoosingLocation: true });
  }

  sendPokedexUpdateDetails(pokemonId, owned, latitude, longitude) {
    const { pokemons } = this.state;
    const pokemonsCopy = pokemons.slice();
    const pokemonIndex = findIndex(pokemonsCopy, { id: pokemonId });
    // @TODO - change URL to production one
    fetch(`http://192.168.0.118:3000/api/v1/pokemon/${pokemonId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: pokemonId,
        owned,
        latitude,
        longitude,
      }),
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        pokemonsCopy[pokemonIndex].owned = owned;
        this.setState({ pokemons: pokemonsCopy });
      })
      .catch(err => console.error(err));
  }

  /**
   * Method for rendering the main components on the view and formats any necessary data to pass
   * to the child components.
   */
  render() {
    const {
      pokemons, displayedPokemonId, isLoading, isChoosingLocation, latitude, longitude
    } = this.state;
    const renderedView = (isChoosingLocation)
      ? (
        <MapView
          style={styles.container}
          customMapStyle={RetroMapStyles}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )
      : determineCardView(pokemons, displayedPokemonId, isLoading);

    return renderedView;
  }
}

function determineCardView(pokemons, displayedPokemonId, isLoading) {
  // formats the array of Pokemon objects to populate the select dropdown
  const pokemonSelects = pokemons.map(pokemon => ({ id: pokemon.id, name: pokemon.name }));
  // renders the main components if the state values are properly set
  const displayedComponents = (pokemons.length !== 0)
    ? (
      <View style={styles.container}>
        <SearchForm
          pokemons={pokemonSelects}
          currentId={displayedPokemonId}
          handleChange={id => this.updateDisplayedPokemon(id)}
        />
        <PokemonCard
          pokemons={pokemons}
          currentPokemonId={displayedPokemonId}
          handlePokedexUpdate={(pokemonId, owned) => this.updatePokedex(pokemonId, owned)}
          handleLoading={() => this.setLoadingState()}
        />
        {LoadingOverlay(isLoading)}
      </View>
    )
    : <View />;

  return displayedComponents;
}

/**
 * Returns an overlay with a loading spinner if the given boolean loading value is true.
 * @param {boolean} isLoading - The boolean value of if the app is currently in a loading status.
 */
function LoadingOverlay(isLoading) {
  if (isLoading) {
    return (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.5,
    width,
    height,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
