import React from 'react';
import { Button, Image, Text, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PokemonCard(props) {
  // const types = (props.pokemon.types) ?
  //   props.pokemon.types.join(', ') :
  //   [];
  // const buttonColor = (!props.pokemon.owned) ? 'success' : 'danger';
  // const buttonText = (!props.pokemon.owned) ? 'Add to Pokédex' : 'Remove from Pokédex';
  // const buttonValue = (!props.pokemon.owned) ? 'Add' : 'Remove';
  // const button = (
  //   <Button 
  //     color={buttonColor}
  //     onClick={() => props.handleClick(props.pokemon.id, buttonValue)}
  //     value={buttonValue}>
  //     {(props.main) ? buttonText : buttonValue}
  //   </Button>
  // );

  return (
    <View style={styles.card}>
      <Image source={{ uri: props.pokemon.imageSrc }} style={styles.cardImg} />
      <View style={{ margin: 10 }}>
        <Text style={styles.cardText}>{props.pokemon.name}</Text>
        <View style={{ margin: 10 }}>
          <Button title="Pokedex" onPress={() => props.handleClick(props.pokemon.id)} style={styles.cardButton} />
        </View>
      </View>
    </View>
  );
}

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
})