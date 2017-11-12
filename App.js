/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//import MapView from 'react-native-maps';
import {WebView} from 'react-native';
import { TouchableHighlight } from 'react-native';
import {
  Platform,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Button, Header, Text, Divider, SocialIcon, Font, CheckBox, FormLabel, FormInput, Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


    
class MapScreen extends Component {
static navigationOptions = {
    title: 'skINsight',
    
}
 /*static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

    _handleBackPress() {
    this.props.navigator.pop();
  }

    _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

    onClick(nextRoute){
        console.log('btn clicked');
        this._handleNextPress(nextRoute);
    }
  */
    constructor(props){
        super(props);
        
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      imgresult: "",
      accu: null,
      
    };
  }
  
  processResponse(resp){
      outputjs = JSON.stringify(resp);
      //make a new screen
      //print json + text
      results = JSON.parse(outputjs);
      console.log(results);
      preds = results.Predictions;
      console.log(preds);
      console.log(preds[0]);
      bestresult = preds[0];
      final = bestresult.Tag;
      confidence = bestresult.Probability;
      this.setState({imgResult:final});
      this.setState({accu:confidence});
      console.log(this.state.accu);
      ////return bestresult;
  }
        
    analyzeButtonClick(imgindex) {
        console.log("bttn clicked");
        var imgUrl = ["https://www.healthline.com/hlcmsresource/images/topic_centers/Psoriasis/gallery/642x361_SLIDE_2_Plaque_Psoriasis.jpg", "http://www.drzehradoust.com/wp-content/uploads/2014/11/vitiligo.jpg", "https://images.medicinenet.com/images/image_collection/pediatrics/rosacea-2-33.jpg"];
        var subscriptionkey = "";
        var uriBase = "https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/241465d5-bece-47e0-ba3f-b5ac8b3778b3/url?iterationId=93f9c093-bced-40ae-8d8a-4fd14e566bb0";     
        var sourceImageUrl = imgUrl[imgindex-1];
        var params = {
            "visualFeatures": "Categories, Description, Color",
            "details": "",
            "language":"en",
        };
        
        var str = Object.keys(params).map(function(key){
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
            
        }).join('&');
        
        var url = uriBase;
        let data = {
            method:'POST',
                credentials: 'same-origin',
                mode: 'same-origin',
                body: JSON.stringify({
                        'Url': sourceImageUrl,
        
                })
                ,
            headers: {
                //'Ocp-Apim-Subscription-Key': subscriptionkey,
                'Prediction-Key': '06bb009302ed4af0bdbe142e75452dc0',
                'Content-Type': 'application/json',
                
            }
        }
        
    return fetch(url,data) 
        .then(response => response.json())
        .then((responseJson) => {
            this.processResponse(responseJson);
        })
        .catch((error) => {
        console.error(error);
    });
        
    };

    onClick(imgindex){
        console.log("btn clicked");
        //this.props.navigation.navigate('Report', {name: 'Lucy'})
        this.analyzeButtonClick(imgindex);
        
    };

    render(){
        /*const nextRoute = {
          component: report,
          title: 'report',
          passProps: { myProp: 'report' }
        }*/
        
        return(
                <View>
                <View style={{flexDirection: 'row', justifyContent: 'center',
            alignItems: 'stretch', marginTop:0}}>
                <Text></Text>
                <Image
                    style={{width: 110, height: 110}}
                    source={{uri: "https://images.medicinenet.com/images/image_collection/skin/vitiligo-back.jpg"}}
                />
                <Button
                    raised
                    onPress={()=>this.onClick(2)}
                    title="identify"
                    backgroundColor="green"
                    //border="solid"
                    />
            </View>
            <Text></Text>
            <View style={{flexDirection: 'row', justifyContent: 'center',
            alignItems: 'stretch', marginTop:0}}>
            <Image
                    style={{width: 110, height: 110}}
                    source={{uri: "https://www.healthline.com/hlcmsresource/images/topic_centers/Psoriasis/gallery/642x361_SLIDE_2_Plaque_Psoriasis.jpg"}}
                />
                <Button
                    raised
                    onPress={()=>this.onClick(1)}
                    title="identify"
                    backgroundColor="red"
                    //border="solid"
                    />
            </View>
            <Text></Text>
            <View style={{flexDirection: 'row', justifyContent: 'center',
            alignItems: 'stretch', marginTop:0}}>
            <Image
                    style={{width: 110, height: 110}}
                    source={{uri: "https://images.medicinenet.com/images/image_collection/pediatrics/rosacea-2-33.jpg"}}
                />
            <Button
                raised
                onPress={()=>this.onClick(3)}
                title="identify"
                backgroundColor="orange"
                //border="solid"
                />
            </View>
            <Text></Text>
                <Text> </Text>
                <Text style={styles.welcome}> You may have: {this.state.imgResult} </Text>
                <Text style={styles.welcome}> Confidence: {this.state.accu} </Text>
                
                </View>
            
            
        )
    }
}



const App = StackNavigator({
    Map: {screen: MapScreen},
    //Report: {screen: ReportScreen},
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
