import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"
import styles from '../styles/DetailScreenStyle';
import AppContext from '../components/AppContext';


const DetailScreen = ({route}, props) => {
  const [movieList, setMovieList] = useState([]);

  //For navigating back to SearchScreen
  const navigation = useNavigation();

  //For getting the information of the picked movie
  const {name} = route.params;
  const {image} = route.params;
  const {language} = route.params;
  const {releaseDate} = route.params;
  const {genre} = route.params;
  const {description} = route.params;
  const {searchByGenre} = route.params;

  const myContext = useContext(AppContext);

  async function addToMylist() {
    // console.log("Name: " + movieTitle);
    // console.log("Image: " + props.image.uri);
    // console.log("Language: " + capitalizedLanguage);
    // console.log("releaseDate: " + release_date);
    // console.log("Genre: " + props.genre);
    // console.log("Description: " + props.description);
    // console.log("User: " + myContext.name);

    const json = JSON.stringify({
      name: props.name,
      image: props.image,
      language: props.language,
      description: props.description,
      user: myContext.name
    });

    console.log(json);


    const response = await fetch("https://moviefy-328609.ew.r.appspot.com/rest/movieservice/addjsonmovie/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: props.name,
          image: props.image,
          language: props.language,
          description: props.description,
          user: myContext.name
        })
      });

    const responseData = await response.json();
    console.log(responseData);

    setMovieList(movieList => [...movieList, json]);
    if (responseData.result == true) {
      Alert.alert(
        "Success",
        props.name + " has been added to your list.",
        [
          { text: "OK" }
        ]
      );
    } else {
      Alert.alert(
        "Failure",
        "List was not updated."
        [
        { text: "OK" }
        ]
      );
    }

  }

    return(
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <View style={styles.goBackBtnView}>
            {
              searchByGenre == true ?
              <TouchableOpacity style={styles.ButtonStyle} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/arrow.png')} style={styles.ImageAdd}/>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.ButtonStyle} onPress={() => navigation.navigate('Search movie')}>
                <Image source={require('../assets/arrow.png')} style={styles.ImageAdd}/>
              </TouchableOpacity>
            }
          </View>
          <View style={styles.addButtonView}>
            <TouchableOpacity style={styles.ButtonStyle} onPress={addToMylist}>
                <Image source={require('../assets/ribbon.png')} style={styles.ImageAdd}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textContentStyle}>
          <Image source={image} style={styles.Image}/>
          <Text style={styles.titleStyle}>{name}</Text>
          <Text style={styles.detailsStyle}>{language} | {releaseDate} | {genre}</Text>
          <View style={styles.borderstyle}></View>
          <View style={styles.ScrollViewStyle}>
            <Text style={styles.titleStyle2}>Story line</Text>
            <ScrollView>
              <Text style={styles.detailsStyle}>{description}</Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.attributionContainer}>
          <Text style={styles.titleStyle2}>Information of the movies provided by</Text>
          <Svg width={300} height={35}>
            <Path d="M191.85,35.37h63.9A17.67,17.67,0,0,0,273.42,17.7h0A17.67,17.67,0,0,0,255.75,0h-63.9A17.67,17.67,0,0,0,174.18,17.7h0A17.67,17.67,0,0,0,191.85,35.37ZM10.1,35.42h7.8V6.92H28V0H0v6.9H10.1Zm28.1,0H46V8.25h.1L55.05,35.4h6L70.3,8.25h.1V35.4h7.8V0H66.45l-8.2,23.1h-.1L50,0H38.2ZM89.14.12h11.7a33.56,33.56,0,0,1,8.08,1,18.52,18.52,0,0,1,6.67,3.08,15.09,15.09,0,0,1,4.53,5.52,18.5,18.5,0,0,1,1.67,8.25,16.91,16.91,0,0,1-1.62,7.58,16.3,16.3,0,0,1-4.38,5.5,19.24,19.24,0,0,1-6.35,3.37,24.53,24.53,0,0,1-7.55,1.15H89.14Zm7.8,28.2h4a21.66,21.66,0,0,0,5-.55A10.58,10.58,0,0,0,110,26a8.73,8.73,0,0,0,2.68-3.35,11.9,11.9,0,0,0,1-5.08,9.87,9.87,0,0,0-1-4.52,9.17,9.17,0,0,0-2.63-3.18A11.61,11.61,0,0,0,106.22,8a17.06,17.06,0,0,0-4.68-.63h-4.6ZM133.09.12h13.2a32.87,32.87,0,0,1,4.63.33,12.66,12.66,0,0,1,4.17,1.3,7.94,7.94,0,0,1,3,2.72,8.34,8.34,0,0,1,1.15,4.65,7.48,7.48,0,0,1-1.67,5,9.13,9.13,0,0,1-4.43,2.82V17a10.28,10.28,0,0,1,3.18,1,8.51,8.51,0,0,1,2.45,1.85,7.79,7.79,0,0,1,1.57,2.62,9.16,9.16,0,0,1,.55,3.2,8.52,8.52,0,0,1-1.2,4.68,9.32,9.32,0,0,1-3.1,3A13.38,13.38,0,0,1,152.32,35a22.5,22.5,0,0,1-4.73.5h-14.5Zm7.8,14.15h5.65a7.65,7.65,0,0,0,1.78-.2,4.78,4.78,0,0,0,1.57-.65,3.43,3.43,0,0,0,1.13-1.2,3.63,3.63,0,0,0,.42-1.8A3.3,3.3,0,0,0,151,8.6a3.42,3.42,0,0,0-1.23-1.13A6.07,6.07,0,0,0,148,6.9a9.9,9.9,0,0,0-1.85-.18h-5.3Zm0,14.65h7a8.27,8.27,0,0,0,1.83-.2,4.67,4.67,0,0,0,1.67-.7,3.93,3.93,0,0,0,1.23-1.3,3.8,3.8,0,0,0,.47-1.95,3.16,3.16,0,0,0-.62-2,4,4,0,0,0-1.58-1.18,8.23,8.23,0,0,0-2-.55,15.12,15.12,0,0,0-2.05-.15h-5.9Z" fill="#01b4e4" />
          </Svg>
          <Text style={styles.tmdbStyle}>This product uses the TMDB API but is not endorsed or certified by TMDB.</Text>
        </View>
      </View>
    );
  }

  export default DetailScreen;
