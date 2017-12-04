'use strict'
let React =require('react-native');
let {StyleSheet} = React;
const constants ={
  actionColor: '#3cb371'
}

module.exports = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },navbar:{
      alignItems:'center',
      backgroundColor: '#fff',
      borderBottomColor: '#eee',
      borderColor: 'transparent',
      borderWidth:1,
      justifyContent:'center',
      height:35,
      flexDirection:'row',
    },navbarTitle:{
      color:'#444',
      fontSize:16,
      fontWeight: "500",
    },toolbar:{
      backgroundColor:'#fff',
      height:22,
    },listView:{
      flex:1
    },li:{
      flex:1,flexDirection:'column',
      backgroundColor:'#fff',
      borderBottomColor:'#eee',
      borderColor:'transparent',
      borderWidth:1,
      paddingLeft:16,
      paddingTop:14,
      paddingBottom:16
    },liContainer:{
      flex:1
    },liText:{
      flex:1,flexDirection:'column',
      color:'#333',
      fontSize:16,
    },center:{
      textAlign: 'center'
    },actionText:{
      color: '#fff',
      fontSize: 16,
      textAlign: 'center'
    },action:{
      backgroundColor: constants.actionColor,
      borderColor: 'transparent',
      borderWidth:1,
      paddingLeft: 0,
      paddingTop:11,
      paddingBottom: 11,
      marginLeft:120,
      marginRight:120,
      marginTop: 20,
      borderRadius:3,
    },textInput:{
      width:250,
      margin:5,
      paddingLeft:16,
      height: 36,
      fontSize: 15,
      backgroundColor: '#fff',
      color: 'black',
      borderColor: 'transparent',
      borderWidth: 1,
    },image:{
      flex:1,
      width:undefined,height:undefined,
      borderRadius: 4,
      margin:20,
      marginTop:45,
    },
  });
