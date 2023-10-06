import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';


const DetailScreen = ({ route }) => {
  // Retrieve the details passed from the previous screen
  const { movie } = route.params;

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{movie.title || movie.name}</Text>
      <Text style={styles.movieInfo}>{movie.overview}</Text>
      <Text style={styles.movieInfo}>Popularity: {movie.popularity}</Text>
      <Text style={styles.movieInfo}>Release Date: {movie.release_date}</Text>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  movieImage: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  
});

export default DetailScreen;
