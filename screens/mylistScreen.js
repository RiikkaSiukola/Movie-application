import {View, Text, TextInput, TouchableOpacity, Image, Button, ScrollView, FlatList,Alert, ActivityIndicator,StyleSheet} from 'react-native';

import MoviePreview from '../components/MoviePreview';
import React, {useState, useEffect} from 'react';
import styles from '../styles/SearchScreenStyle';
const MylistScreen = () => {
  const [hasError, setErrors] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setLoading]=useState(true);



  async function fetchData() {
    
    let res = null;
    try{
      
      res=await fetch("http://10.0.2.2:3000/api/persons");
    }
    catch(error){
      setErrors(true);
    }

    try{
      //Getting json from the response
      const responseData = await res.json();
      console.log(responseData);
      setMovies(responseData);
    }
    catch(err){
      setErrors(true);
      setSomeErrors("ERROR: "+hasError+ " my error "+err);
      console.log(someError);
    }
  }

  
  useEffect(() => {
      if (isLoading==true){
      setLoading(false);
      fetchData();
     
    }
  });

  
  if (isLoading==true) {
    return (
      <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  
  else if(hasError){
    return(
      <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
        <Text>{hasError}</Text>
        <Text>{""+someError}</Text>
      </View>
    );
  }
  
  else{
    return (
      <View style={styles.container}>
        <Text>{hasError}</Text>

     
        <FlatList

            
            data={movies}
            
            renderItem={({item}) => (
              <View style={styles.resultBox}>
                
              <View style={styles.resultTextView}>
                 <Text style={styles.resultTitle}>{item.name}</Text>
                <Text style={styles.resultDetails}> {item.name} | {item.language} | {item.genre} | {item.duration}</Text>
                <View style={styles.resultButtonsView}>
                <View style={styles.resultAddButtonView}>
                <TouchableOpacity style={styles.resultButtonStyle}>
                    <Image source={require('../assets/ribbon.png')} style={styles.resultImageAdd}/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.resultInfoButtonView}>
                    <TouchableOpacity style={styles.resultButtonStyle}>
                    <View style={{backgroundColor: 'white', height: 25, width: 25, borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../assets/play.png')} style={styles.resultImageInfo}/>
                    </View>
                </TouchableOpacity>
                </View>

                </View>
              </View>
              </View>
              
            )}
            
        />
      </View>
    );
  }
};
/*const styles=StyleSheet.create({
  container:{
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#0f0',
    backgroundColor: '#fce',    
  }
});*/



  
export default MylistScreen;  