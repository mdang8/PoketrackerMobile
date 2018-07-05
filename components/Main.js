import React from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import PokemonCard from './PokemonCard';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      displayedPokemonId: 1,
    }
  }

  componentDidMount() {
  }

  updatePokedex(id) {
    Alert.alert(
      'Pokedex Action',
      `Clicked on button. Pokemon ID = ${id}`,
      [
        {text: 'OK', onPress: () => console.log('OK pressed')},
      ]
    );
  }
  
  render() {
    const pokemon = {
      id: 1,
      name: 'Bulbasaur',
      types: ['Grass'],
      owned: false,
      imageSrc: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
    };

    return (
      <View style={styles.container}>
        {/* <Text>{instructions}</Text> */}
        <PokemonCard pokemon={pokemon} handleClick={this.updatePokedex.bind(this)} />
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
});
