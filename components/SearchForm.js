import React from 'react';
import { Picker, StyleSheet, View } from 'react-native';
import { map, padStart, sortBy } from 'lodash';
import PropTypes from 'prop-types';

export default function SearchForm(props) {
  const { pokemons, currentId } = props;
  const pokemonItems = populateSelect(pokemons);

  return (
    <View>
      <Picker
        selectedValue={(pokemons.length !== 0) ? currentId : -1}
        onValueChange={(val, ind) => props.handleChange(val, ind)}
        style={styles.picker}
      >
        {pokemonItems}
      </Picker>
    </View>
  );
}

// Populates the select input dropdown with the Pokemon names and ID's.
function populateSelect(pokemons) {
  // sorts the list of Pokemon by their ID
  const pokemonList = sortBy(pokemons, ['id']);
  const options = map(pokemonList, (pokemon) => {
    // pads the ID string with 0's
    let paddedId = padStart(pokemon.id.toString(), 3, '0');
    return <Picker.Item label={`${paddedId} - ${pokemon.name}`} value={pokemon.id} key={pokemon.id} />;
  });

  return options;
}

SearchForm.propTypes = {
  pokemons: PropTypes.arrayOf(String).isRequired,
  currentId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

// @TODO - fix styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 300,
  },
});
