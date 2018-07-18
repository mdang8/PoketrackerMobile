import React from 'react';
import { ActivityIndicator, Dimensions, Platform, StyleSheet, View } from 'react-native';
import { find } from 'lodash';
import PokemonCard from './PokemonCard';
import SearchForm from './SearchForm';

const { width, height } = Dimensions.get('window');

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      displayedPokemonId: 1,
      isLoading: true,
    };
  }

  componentDidMount() {
    // @TODO - change URL to production one
    const url = 'http://192.168.0.118:3000/api/v1/pokemon/all';
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ pokemons: data, isLoading: false }))
      .catch(err => console.error(err));
  }

  setLoadingState() {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading });
  }

  updateDisplayedPokemon(id) {
    // @TODO - remove this
    console.log('Updating displayed Pokemon.');

    this.setState({
      displayedPokemonId: id,
    });
  }

  render() {
    const { pokemons, displayedPokemonId, isLoading } = this.state;
    const pokemonSelects = pokemons.map(pokemon => ({ id: pokemon.id, name: pokemon.name }));
    const displayedComponents = (pokemons.length !== 0)
      ? (
        <View style={styles.container}>
          <SearchForm
            pokemons={pokemonSelects}
            currentId={displayedPokemonId}
            handleChange={id => this.updateDisplayedPokemon(id)}
          />
          <PokemonCard
            pokemon={find(pokemons, { id: displayedPokemonId })}
            handleLoading={() => this.setLoadingState()}
          />
          {LoadingOverlay(isLoading)}
        </View>
      )
      : <View />;

    return displayedComponents;
  }
}

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
  }
});

export default Main;
