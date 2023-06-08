import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// Taken from: https://github.com/mdmoin7/react-native-google-maps-autocomplete
function MapInput(props) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2} // minimum length of text to search
      autoFocus={true}
      returnKeyType={"search"} // Can be left out for default return key
      listViewDisplayed={false} // true/false/undefined
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        props.notifyChange(details.geometry.location);
      }}
      query={{
        key: "AIzaSyCK8XiPvTytCUBcc1q6DYTkbgt8q50i_F0",
        language: "en",
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={300}
    />
  );
}
export default MapInput;
