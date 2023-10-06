import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useFetch from '../../hooks/useFetch';
import { useNavigation } from '@react-navigation/native';

const Card = ({ movie, media_type }) => {

  const titlePropertyName = movie.title ? 'title' : 'name';

  const navigation = useNavigation();

  const handleMoreDetails = async () => {
    try {
      // Fetch detailed information for the selected movie or TV show
      console.log('Movie ID:', movie.id);
      const apiKey = 'cbec399c1cb768204282f8d291452bab';
      const url = `https://api.themoviedb.org/3/${media_type}/${movie.id}?api_key=${apiKey}`;
      const response = await useFetch(url);
    
        console.log(response)
        // Navigate to the DetailScreen and pass the detailed movie or TV show information
        navigation.navigate('DetailScreen', { movie: response });

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <View style={styles.movieCard}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }} style={styles.movieImage} />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{movie[titlePropertyName]}</Text>
        <Text style={styles.movieInfo}>Popularity: {movie.popularity}</Text>
        <Text style={styles.movieInfo}>Release Date: {movie.release_date}</Text>
        <TouchableOpacity style={styles.moreDetailsButton} onPress={handleMoreDetails}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieDetails: {
    flex: 1,
    padding: 12,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  moreDetailsButton: {
    backgroundColor: 'skyblue',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Card;
