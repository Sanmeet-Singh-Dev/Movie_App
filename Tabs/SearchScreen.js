import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, Button, View, Text } from 'react-native';
import useFetch from '../hooks/useFetch';
import Card from '../components/cards/Card';
import DropDown from '../components/DropDown/DropDown';

export const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('multi');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const media_type = searchType;

  const searchTypes = [
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
    { label: 'Multi', value: 'multi' },
  ];

  const fetchData = async (query, type) => {
    const apiKey = 'cbec399c1cb768204282f8d291452bab';
    const url = `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${query}`;

    try {
      const searchData = await useFetch(url);
      setSearchResults(searchData.results);
      setShowResults(true);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSearch = () => {
    setShowResults(false); 
    fetchData(searchQuery, searchType);
  };

  console.log(media_type)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchForm}>
        <View style={styles.row}>
          <TextInput
            placeholder="Enter your search query *"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            style={styles.searchInput}
          />
          <Button title="Search" onPress={handleSearch} />
        </View>
        <View style={styles.dropdownContainer}>
          <DropDown
            data={searchTypes}
            labelField="label"
            valueField="value"
            placeholder="Select Search Type"
            onSelect={(selectedValue) => setSearchType(selectedValue.value)}
            value={searchType}
            style={styles.dropdown}
          />
        </View>
      </View>

      {showResults && searchResults.length === 0 && (
        <Text style={styles.noResultsText}>No results found. Please enter a search query.</Text>
      )}

      {showResults && searchResults.map((result) => (
        <Card key={result.id} movie={result} navigation={navigation} media_type={media_type} />
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
  searchForm: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  dropdownContainer: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  dropdown: {
    width: 120,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});
