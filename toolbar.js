import React, {Component} from 'react';
import { Button,StyleSheet, Text, View ,StatusBar,Image} from 'react-native';

const styles = require('./Style.js');

export default class Toolbar extends Component{
  includeImage(){
      return(
        <Image
          style={{flex:1,width: 25, height: 25,borderRadius:4,opacity:0.9}}
          source={require('./img/TUHousing2.png')}
        />
      );
    }

  render(){
    return(
      <View>
        <StatusBar
           backgroundColor="blue"
           barStyle="light-content"
         />
         <View style={styles.navbar}>
         <Image
           style={{width: 70, height: 80,opacity:0.9}}
           source={require('./img/TUHousing.png')}
         />
         <Text style={styles.navbarTitle}>
            {this.props.title}
         </Text>
         </View>
      </View>
    );
  }
}
