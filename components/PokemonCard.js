import React from 'react';
import { Button, Image, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

export default function PokemonCard(props) {
  const { pokemon } = props;

  return (
    <View style={styles.card}>
      <Image source={{ uri: pokemon.imageSrc }} style={styles.cardImg} />
      <View style={{ margin: 10 }}>
        <Text style={styles.cardText}>
          {pokemon.name}
        </Text>
        <View style={{ margin: 10 }}>
          <Button title="Pokedex" onPress={() => props.handleClick(props.pokemon.id)} style={styles.cardButton} />
        </View>
      </View>
    </View>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
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
});
