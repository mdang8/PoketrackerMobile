import React from 'react';
import { Button, Image, Text, StyleSheet, ToastAndroid, View } from 'react-native';
import { map } from 'lodash';
import PropTypes from 'prop-types';

/* eslint-disable object-property-newline */
// mapping of Pokemon types to their associated hex color codes
const TYPE_COLORS = {
  Normal: '#A8A878', Fire: '#F08030', Fighting: '#C03028', Water: '#6890F0', Flying: '#A890F0',
  Grass: '#78C850', Poison: '#A59', Electric: '#F8D030', Ground: '#E0C068',
  Psychic: '#F59', Rock: '#B8A038', Ice: '#98D8D8', Bug: '#A8B820', Dragon: '#7038F8',
  Ghost: '#705898', Dark: '#705848', Steel: '#B8B8D0', Fairy: '#E9E',
};
/* eslint-enable object-property-newline */

class PokemonCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: props.pokemon,
      location: {},
      loadingHandler: props.handleLoading,
    };
  }

  componentDidMount() {
    // this.updateCurrentLocation(() => console.log('Pokemon Card component mounted.'));
  }

  componentWillReceiveProps(props) {
    const { pokemon, handleLoading } = props;
    this.setState({ pokemon, loadingHandler: handleLoading });
  }

  updateCurrentLocation(callback) {
    navigator.geolocation.getCurrentPosition(location => this.setState({ location }, callback),
      error => console.error(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }

  updatePokedex() {
    const { pokemon, loadingHandler } = this.state;
    loadingHandler();
    this.updateCurrentLocation(() => {
      loadingHandler();
      ToastAndroid.show(`Clicked button for Pokemon with ID = ${pokemon.id}`, ToastAndroid.SHORT);
    });

    // this.setState({ isLoading: true }, () => {
    //   this.updateCurrentLocation(() => {
    //     this.setState({ isLoading: false }, () => {
    //       ToastAndroid.show(`Clicked button for Pokemon with ID = ${pokemon.id}`, ToastAndroid.SHORT);
    //     });
    //   });
    // });
  }

  render() {
    const { pokemon } = this.state;
    // maps each of the Pokemon's types to a type style button
    const types = map(pokemon.types, type => (
      // uses the type colors map to determine the color of the current type
      <View style={[styles.type, { backgroundColor: TYPE_COLORS[type] }]} key={type}>
        <Text style={styles.typeText}>
          {type}
        </Text>
      </View>
    ));

    return (
      <View style={styles.card}>
        <Image source={{ uri: pokemon.imageSrc }} style={styles.cardImg} />
        <View style={{ margin: 10 }}>
          <Text style={styles.cardText}>
            {pokemon.name}
          </Text>
          <View style={styles.typesContainer}>
            {types}
          </View>
          <View style={{ margin: 10 }}>
            <Button title="Pokedex" onPress={() => this.updatePokedex(pokemon.id)} style={styles.cardButton} />
          </View>
        </View>
      </View>
    );
  }
}

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
  handleLoading: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    padding: 10,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 2,
  },
  cardImg: {
    height: 250,
  },
  cardText: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardButton: {
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  type: {
    width: 70,
    margin: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    fontFamily: 'HelveticaNeue',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default PokemonCard;
