//import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Button, ScrollView, FlatList,Alert, ActivityIndicator,StyleSheet} from 'react-native';
import styles from '../styles/SearchScreenStyle';
import MoviePreview from '../components/MoviePreview';
import React, {useState} from 'react';
//import {StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList,Alert, ActivityIndicator} from 'react-native';
const SearchScreen = () => {
const [movies, setMovies] = useState([]);
const [isLoading, setLoading]=useState(true);
  let testDataArray = [{name:"Transformers", language: "Eng", genre: "Sci-fi", duration: "2:40", image: require('../assets/testImg.jpg')}, {name:"Harry Potter", language: "Eng", genre:"Fiction", duration: "2:30", image: require('../assets/testImg.jpg')}, 
  {name:"Die hard 2", language: "Eng", genre:"Action", duration: "2:10", image: require('../assets/testImg.jpg')}, {name:"Blancanieves", language: "Spa", genre:"Fairytale", duration: "2:25", image: require('../assets/testImg.jpg')}];
  
  
 
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.textStyle}>Search</Text>
        <View style={styles.searchFieldContainer}>
          <TextInput style={styles.searchField} placeholderTextColor="black" placeholder="Search a movie"/>
          <TouchableOpacity style={styles.buttonStyle}>
            <Image source={require('../assets/magnifying-glass.png')} style={styles.image}/>
          </TouchableOpacity>
          
        </View>
      </View> 
      {
        testDataArray.map((element) => {
          return(
            <MoviePreview name={element.name} language={element.language} genre={element.genre} duration={element.duration} image={element.image}/>
         
            
          );
        })
        
      } 
      
     
   
 </View>
  );
    }

 

    
export default SearchScreen;
