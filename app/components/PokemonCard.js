import React from 'react';
import {
  Button, Image, Text, StyleSheet, View
} from 'react-native';
import { find } from 'lodash';
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
      pokemons: props.pokemons,
      currentPokemonId: props.currentPokemonId,
      pokedexUpdateHandler: props.handlePokedexUpdate,
      loadingHandler: props.handleLoading,
    };
  }

  componentDidMount() {
    // this.updateCurrentLocation(() => console.log('Pokemon Card component mounted.'));
  }

  componentWillReceiveProps(props) {
    const { pokemons, currentPokemonId } = props;
    this.setState({ pokemons, currentPokemonId });
  }

  updatePokedex = async () => {
    const {
      pokemons, currentPokemonId, pokedexUpdateHandler, loadingHandler
    } = this.state;
    const pokemon = find(pokemons, { id: currentPokemonId });
    loadingHandler();
    await pokedexUpdateHandler(!pokemon.owned, { latitude: 0, longitude: 0 });
    loadingHandler();
  }

  render() {
    const { pokemons, currentPokemonId } = this.state;
    const pokemon = find(pokemons, { id: currentPokemonId });
    // maps each of the Pokemon's types to a type style button
    const types = pokemon.types.map(type => (
      // uses the type colors map to determine the color of the current type
      <View style={[styles.type, { backgroundColor: TYPE_COLORS[type] }]} key={type}>
        <Text style={styles.typeText}>
          {type}
        </Text>
      </View>
    ));
    const buttonText = (pokemon.owned) ? 'Remove from Pokédex' : 'Add to Pokédex';
    const buttonColor = (pokemon.owned) ? '#d82032' : '#29e57d';
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
            <Button
              title={buttonText}
              color={buttonColor}
              onPress={this.updatePokedex}
              style={styles.cardButton}
            />
          </View>
        </View>
      </View>
    );
  }
}

PokemonCard.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPokemonId: PropTypes.number.isRequired,
  handlePokedexUpdate: PropTypes.func.isRequired,
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
