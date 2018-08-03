import React from 'react';
import {
  ActivityIndicator, Alert, Dimensions, StyleSheet, ToastAndroid, View
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
      markers: [],
    };
  }

  /**
   * Sends a GET request to retrieve all of the Pokemon data from the database and then makes a
   * call to @method setLocation to set the initial location when the component mounts.
   */
  componentDidMount() {
    // @TODO - change URL to production one
    const url = 'http://192.168.1.10:3000/api/v1/pokemon/all';
    fetch(url)
      .then(res => res.json())
      .then(async (data) => {
        this.setState({ pokemons: data });
        await this.setLocation();
      })
      .catch(err => console.error(err));
  }

  /**
   * Retrieves the current location and sets the relevant values in the state. If the location
   * retrieval fails, then a default location is used.
   */
  setLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        isLoading: false,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }, console.log('Initial location set.'));
    }, (err) => {
      console.log(err);
      // displays an alert box informing the user that their location couldn't be found
      Alert.alert(
        'Oops something went wrong!',
        'Problem: Location couldn\'t be found :(\nSolution: Using the default location.',
        [
          { text: 'OK', onPress: () => console.log('OK pressed') },
          // { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
        ],
        { cancelable: true }
      );
      // sets the latitude and longitude values in the state to use the ones for New York City as
      // default values
      this.setState({ isLoading: false, latitude: 40.7128, longitude: -74.0060 });
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 120000 });
  }

  /**
   * Toggles the loading boolean value in the state.
   */
  setLoadingState = () => {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading });
  }

  /**
   * Updates the ID value in the state for the Pokemon to currently display.
   * @param {number} pokemonId - The ID of the Pokemon to display.
   */
  updateDisplayedPokemon = (pokemonId) => {
    // @TODO - remove this
    console.log('Updating displayed Pokemon.');

    this.setState({
      displayedPokemonId: pokemonId,
    });
  }

  /**
   * Sets the isChoosingLocation value in the state to render the map view.
   * @param {number} pokemonId - The ID of the Pokemon to update in the Pokedex.
   * @param {boolean} owned - The boolean value to be updated of if the Pokemon is owned.
   */
  updatePokedex = (pokemonId, owned) => {
    // const { pokemons, isChoosingLocation } = this.state;
    this.setState({ isChoosingLocation: true });
  }

  /**
   * Handles when the map is pressed. Adds a marker to the list of markers in the state to be
   * rendered on the map view.
   * @param {Object} event - The event that gets returned from the onPress function of MapView.
   */
  handleLocationSelect = (event) => {
    const { markers } = this.state;
    const { coordinate, position } = event.nativeEvent;
    const { latitude, longitude } = coordinate;
    console.log(position);
    const updatedMarkers = markers.slice();
    updatedMarkers.push({
      coordinate: { latitude, longitude },
      title: 'Pokemon Location',
      description: 'Marker indicating where this Pokemon was found.',
      identifier: `${latitude}${longitude}`,
    });
    this.setState({ latitude, longitude, markers: updatedMarkers });
  }

  /**
   * Removes the marker with the matching ID as the one in the given @param event.
   * @param {Object} event - The event that gets returned from the onPress function of Marker.
   */
  removeMarker = (event) => {
    const { markers } = this.state;
    const { coordinate, position, id } = event.nativeEvent;
    // @TODO - remove these log statements
    console.log(event.nativeEvent);
    console.log(`Removing marker with ID = ${id}`);
    // applies a filter to the list of markers to remove the ones with the matching ID
    const updatedMarkers = markers.slice().filter(marker => marker.identifier !== id);
    this.setState({ markers: updatedMarkers });
  }

  /**
   * Sends a PUT request to update the ownership status of the Pokemon with the given ID.
   * @param {number} pokemonId - The ID of the Pokemon to update in the Pokedex.
   * @param {boolean} owned - The boolean value to be updated of if the Pokemon is owned.
   * @param {number} latitude - The latitude coordinate value.
   * @param {number} longitude - The longitude coordinate value.
   */
  sendPokedexUpdateDetails(pokemonId, owned, latitude, longitude) {
    const { pokemons, displayedPokemonId } = this.state;
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
        this.setState({ pokemons: pokemonsCopy },
          ToastAndroid.show(`Pokemon with ID = ${displayedPokemonId} found at { lat: ${latitude}, long: ${longitude} }`, ToastAndroid.SHORT));
      })
      .catch(err => console.error(err));
  }

  /**
   * Method for rendering the main components on the view and formats any necessary data to pass
   * to the child components.
   */
  render() {
    const {
      pokemons, displayedPokemonId, isLoading, isChoosingLocation, latitude, longitude, markers
    } = this.state;
    // renders the main components if the state values are properly set
    const defaultView = (pokemons.length !== 0)
      ? (
        <View style={styles.container}>
          {determineSearchFormView(pokemons, displayedPokemonId, this.updateDisplayedPokemon)}
          {
            determineCardView(
              pokemons,
              displayedPokemonId,
              this.updatePokedex,
              this.setLoadingState
            )
          }
          {LoadingOverlay(isLoading)}
        </View>
      )
      : null;
    const renderedView = (isChoosingLocation)
      ? determineMapView(latitude, longitude, markers, this.handleLocationSelect, this.removeMarker)
      : defaultView;

    return renderedView;
  }
}

/**
 * Determines the map view to render with the markers.
 * @param {number} latitude - The latitude coordinate value.
 * @param {number} longitude - The longitude coordinate value.
 * @param {Object[]} markers - The list of markers to render on the map.
 * @param {Function} handleLocationSelect - The function to handle location selection.
 * @param {Function} removeMarker - The function to handle marker removals.
 */
function determineMapView(latitude, longitude, markers, handleLocationSelect, removeMarker) {
  // applies a map to the list of marker objects to build a list of renderable MapView Markers
  const displayedMarkers = markers.slice().map(marker => (
    <MapView.Marker
      identifier={marker.identifier}
      key={marker.identifier}
      coordinate={marker.coordinate}
      onPress={e => removeMarker(e)}
    />
  ));

  return (
    <MapView
      style={styles.container}
      customMapStyle={RetroMapStyles}
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={e => handleLocationSelect(e)}
    >
      {displayedMarkers}
    </MapView>
  );
}

/**
 * Determines the search form view to render.
 * @param {Object[]} pokemons - The list of all the Pokemon objects.
 * @param {number} displayedPokemonId - The ID of the Pokemon that is currently displayed.
 * @param {Function} updateDisplayedPokemon - The function to handle updating the currently
 * displayed Pokemon.
 */
function determineSearchFormView(pokemons, displayedPokemonId, updateDisplayedPokemon) {
  // formats the array of Pokemon objects to populate the select dropdown
  const pokemonSelects = pokemons.map(pokemon => ({ id: pokemon.id, name: pokemon.name }));

  return (
    <SearchForm
      pokemons={pokemonSelects}
      currentId={displayedPokemonId}
      handleChange={updateDisplayedPokemon}
    />
  );
}

/**
 * Determines the Pokemon card view to render.
 * @param {Object[]} pokemons - The list of all the Pokemon objects.
 * @param {number} displayedPokemonId - The ID of the Pokemon that is currently displayed.
 * @param {Function} updatePokedex - The function to handle updating the Pokedex.
 * @param {Function} setLoadingState - The function to handle setting the loading status.
 */
function determineCardView(pokemons, displayedPokemonId, updatePokedex, setLoadingState) {
  return (
    <PokemonCard
      pokemons={pokemons}
      currentPokemonId={displayedPokemonId}
      handlePokedexUpdate={updatePokedex}
      handleLoading={setLoadingState}
    />
  );
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
