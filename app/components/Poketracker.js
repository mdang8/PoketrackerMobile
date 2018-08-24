import React from 'react';
import {
  ActivityIndicator, Alert, Dimensions, StyleSheet, Text, ToastAndroid, TouchableOpacity, View
} from 'react-native';
import MapView from 'react-native-maps';
import { findIndex } from 'lodash';
import PokemonCard from './PokemonCard';
import SearchForm from './SearchForm';
import RetroMapStyles from '../styles/RetroMapStyles.json';

const { width, height } = Dimensions.get('window');
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

class Poketracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      displayedPokemonId: 1,
      isLoading: true,
      isChoosingLocation: false,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
    };
  }

  /**
   * Sends a GET request to retrieve all of the Pokemon data from the database and then makes a
   * call to @method setLocation to set the initial location when the component mounts.
   */
  componentDidMount() {
    // @TODO - change URL to production one
    const url = 'http://192.168.0.118:3000/api/v1/pokemon/all';
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
    const { region } = this.state;
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        isLoading: false,
        region: {
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
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
      this.setState({
        isLoading: false,
        region: {
          ...region,
          latitude: 40.7128,
          longitude: -74.0060,
        },
      });
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
  updatePokedex = async (owned, region) => {
    const { pokemons, displayedPokemonId } = this.state;
    const pokemon = pokemons.find(p => p.id === displayedPokemonId);

    if (owned) {
      this.setState({ isChoosingLocation: true });
    } else {
      const updatedPokemons = await sendPokedexUpdateDetails(displayedPokemonId, owned, region);
      this.setState({ pokemons: updatedPokemons }, console.log('Pokemon updated'));
    }
  }

  /**
   * Handles when the map is pressed. Adds a marker to the list of markers in the state to be
   * rendered on the map view.
   * @param {Object} event - The event that gets returned from the onPress function of MapView.
   */
  addMarker = (event) => {
    const { region, markers } = this.state;
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
    this.setState({ region: { ...region, latitude, longitude, }, markers: updatedMarkers });
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
   * Method for rendering the main components on the view and formats any necessary data to pass
   * to the child components.
   */
  render() {
    const {
      pokemons, displayedPokemonId, isLoading, isChoosingLocation, region, markers
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
      ? determineMapView(displayedPokemonId, region, markers, this.addMarker, this.removeMarker)
      : defaultView;

    return renderedView;
  }
}

function sendPokedexUpdateDetails(id, owned, region) {
  const { latitude, longitude } = region;
  const toastMessage = (owned)
    ? `Pokemon with ID = ${id} found at { lat: ${latitude}, long: ${longitude} }`
    : `Pokemon with ID = ${id} removed from Pokedex`;

  // @TODO - change URL to production one
  return fetch(`http://192.168.0.118:3000/api/v1/pokemon/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      owned,
      latitude,
      longitude,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      ToastAndroid.show(toastMessage, ToastAndroid.SHORT);

      return data;
    })
    .catch(err => console.error(err));
}

/**
 * Determines the map view to render with the markers.
 * @param {number} latitude - The latitude coordinate value.
 * @param {number} longitude - The longitude coordinate value.
 * @param {Object[]} markers - The list of markers to render on the map.
 * @param {Function} addMarker - The function to handle location selection.
 * @param {Function} removeMarker - The function to handle marker removals.
 */
function determineMapView(pokemonId, region, markers, addMarker, removeMarker) {
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
    <View style={styles.mapContainer}>
      <MapView
        style={styles.container}
        customMapStyle={RetroMapStyles}
        showsUserLocation
        region={region}
        onPress={e => addMarker(e)}
      >
        {displayedMarkers}
      </MapView>
      <View style={styles.mapExtrasContainer}>
        <View style={styles.mapButton}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={markers.length === 0}
            onPress={() => sendPokedexUpdateDetails(pokemonId, true, markers[0].coordinate)}
          >
            <Text style={styles.mapButtonText}>
              Select Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  mapContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  mapExtrasContainer: {
    alignItems: 'center',
  },
  mapButton: {
    width: '60%',
    height: 40,
    bottom: 25,
    position: 'absolute',
    elevation: 1,
    backgroundColor: '#ED533B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0 },
  },
  mapButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Poketracker;
