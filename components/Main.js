import React from 'react';
import { Alert, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { find } from 'lodash';
import PokemonCard from './PokemonCard';
import SearchForm from './SearchForm';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      displayedPokemonId: 1,
    };
  }

  componentDidMount() {
    // @TODO - change URL to production one
    const url = 'http://192.168.0.118:3000/api/v1/pokemon/all';
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ pokemons: data }))
      .catch(err => console.error(err));
  }

  updateDisplayedPokemon(id, index) {
    // @TODO - remove this
    console.log('Updating displayed Pokemon.');

    this.setState({
      displayedPokemonId: id,
    });
  }

  updatePokedex(id) {
    ToastAndroid.show(`Clicked button for Pokemon with ID = ${id}`, ToastAndroid.SHORT);
  }

  render() {
    const { pokemons, displayedPokemonId } = this.state;
    const pokemonSelects = pokemons.map(pokemon => ({ id: pokemon.id, name: pokemon.name }));
    const displayedComponents = (pokemons.length !== 0)
      ? (
        <View style={styles.container}>
          <SearchForm
            pokemons={pokemonSelects}
            currentId={displayedPokemonId}
            handleChange={this.updateDisplayedPokemon.bind(this)}
          />
          <PokemonCard
            pokemon={find(pokemons, { id: displayedPokemonId })}
            handleClick={this.updatePokedex.bind(this)}
          />
        </View>
      )
      : <View />;

    return displayedComponents;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
