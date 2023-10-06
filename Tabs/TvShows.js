import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import useFetch from '../hooks/useFetch';
import Card from '../components/cards/Card';
import DropDown from '../components/DropDown/DropDown';

export const TvShows = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('popular'); 

  const categories = [
    { label: 'Popular Tv Shows', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'On The Air', value: 'on_the_air' },
    { label: 'Airing today', value: 'airing_today' },
  ];


  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const fetchData = async (selectedCategory) => {
    const apiKey = 'cbec399c1cb768204282f8d291452bab';
    const url = `https://api.themoviedb.org/3/tv/${selectedCategory}?api_key=${apiKey}`;

    try {
       
      const movieData = await useFetch(url);
      setMovies(movieData.results);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue.value); 
    fetchData(selectedValue.value); 
  };
  return (
    <ScrollView style={styles.container}>
        <DropDown
        data={categories}
        labelField="label"
        valueField="value"
        placeholder="Select Category"
        onSelect={handleCategoryChange}
        value={selectedCategory}
      />
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} navigation={navigation} media_type="tv" />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

