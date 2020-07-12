import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';
export default apitest;

function apitest() {
    
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(['i']);
  const [data2, setData2] = useState('i');
  //must set a state to ensure that the constant is not undefined
 

  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(data);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )}
      <Text> data: {JSON.stringify(data[0].releaseYear)} </Text>
    </View>
  );
};
