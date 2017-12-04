import React from 'react';
import {
   Button,StyleSheet, Text, View ,TextInput,
  StatusBar,ListView,TouchableHighlight,Image,ScrollView,
  Dimensions, TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";
const util =require('util');
const styles = require('./Style.js');
import { Hoshi } from 'react-native-textinput-effects';
import Toolbar from './toolbar.js';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAdNYanntWbMjaFhl6Za2vuuwAdDYbnY18",
  authDomain: "awesomeprojectsdb.firebaseapp.com",
  databaseURL: "https://awesomeprojectsdb.firebaseio.com",
  projectId: "awesomeprojectsdb",
  storageBucket: "awesomeprojectsdb.appspot.com",
  messagingSenderId: "745265789591"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    title: 'TU-Housing',
  };

  render() {
    return (
      <View style={{flex:1}}>
        <Image style={{flex:1,height:undefined,width:undefined}} source={require('./img/BG.jpg')}>
        <Toolbar/>
        <ScrollView>
        <View style={{flex:1,flexDirection:'row',marginTop:4,height:130,marginLeft:3,marginRight:3}}>
          <View style={{flex:19,flexDirection:'column',padding:3}}>
            <Image
              style={{flex:1,width: undefined, height: undefined,borderRadius:4,opacity:0.9}}
              source={require('./img/dorm1.jpg')}
            />
          </View>
          <View style={{flex:22,flexDirection:'column',padding:3}}>
            <Image
              style={{flex:1,width: undefined, height: undefined,borderRadius:4,opacity:0.9}}
              source={require('./img/dorm2.jpg')}
            />
          </View>
        </View>

        <View style={{flex:1,flexDirection:'row',height:130,marginLeft:3,marginRight:3}}>
          <View style={{flex:22,flexDirection:'column',padding:3}}>
          <Image
            style={{flex:1,width: undefined, height: undefined,borderRadius:4,opacity:0.9}}
            source={require('./img/dorm3.png')}
          />
          </View>
          <View style={{flex:19,flexDirection:'column',padding:3}}>
          <Image
            style={{flex:1,width: undefined, height: undefined,borderRadius:4,opacity:0.9}}
            source={require('./img/dorm4.png')}
          />
          </View>
        </View>

        <View style={{flex:1,flexDirection:'row',height:130,marginLeft:3,marginRight:3}}>
          <View style={{flex:19,flexDirection:'column',padding:3}}>
          <Image
            style={{flex:1,width: undefined, height: undefined,borderRadius:4,opacity:0.9}}
            source={require('./img/dorm5.png')}
          />
          </View>
          <View style={{flex:22,flexDirection:'column',padding:3}}>
          <Image
            style={{flex:1,width: undefined, height: undefined,borderRadius:4,opacity:0.9}}
            source={require('./img/dorm6.png')}
          />
          </View>
        </View>

        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{margin:10,backgroundColor:'lightpink',width:360,borderRadius:4}}>
          <Hoshi
            label={'Search'}
          />
          <View style={{flex:1,margin:10,backgroundColor:'white',borderRadius:4}}>
            <Text>Hello</Text>
          </View>

          </View>
        </View>
        </ScrollView>
          </Image>
      </View>
    )
  };
}

class SearchPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Search',
    title: 'TU-Housing',
  };
  constructor(){
    super();
    console.ignoredYellowBox =
    [
      'Setting a timer'
    ];
    let ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !=r2});
    this.state = {
      itemDataSource:ds,
      newName:'',
      newAdress:'',
      newPrice:'',
      newTel:'',
      newWeb:'',
    }
    let obj = '';
    let priceDescItem =[];
    let priceAscItem=[];
    let origItem=[];
    let reverse=[];
    let AlpDesc=[];
    let AlpAsc=[];
    let pathImg ='./img/dorm1.png';
    this.itemsRef = this.getRef(obj).child('items');
    //console.log(util.inspect(firebaseApp.database().ref('items').orderByChild('title'),false,null));
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
    this.reverseState = this.reverseState.bind(this);

    //let ref = firebaseApp.database().ref('items');
    //console.log(firebaseApp.ref);

  }

  gotData(data){
    //console.log(data.val());
  }

  getRef(x){
    return(
      firebaseApp.database().ref(x+'/')
    );
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }
  componentDidMount(){
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef){
    itemsRef.on('value',(snap)=>{
      let items = [];
      snap.forEach((child) =>{

        items.push({
          title: child.val().title,
          _key: child.key,
          price: child.val().price,
          name: child.val().name,
          insu: child.val().insurance,
          desc: child.val().description,
          tel: child.val().tel,
          web: child.val().web,
          picNo: child.val().picNo,
          address: child.val().address,
          //console.log(util.inspect(child.val(),false,null));
        });
      });
      console.log(items.picNo);
      origItem = items.slice();
      reverse = items.slice().reverse();
      //Alp notused
      AlpDesc = items.slice().sort(function(a,b){
            const genreA = a.title.toUpperCase();
            const genreB = b.title.toUpperCase();
              let comparison = 0;
              if (genreA > genreB) {
                comparison = 1;
              } else if (genreA < genreB) {
                comparison = -1;
              }
              return comparison;
            });

      AlpAsc = items.slice().sort(function(a,b){
            const genreA = a.title.toUpperCase();
            const genreB = b.title.toUpperCase();
              let comparison = 0;
              if (genreA > genreB) {
                comparison = 1;
              } else if (genreA < genreB) {
                comparison = -1;
              }
              return comparison*-1;
            });
      //
      priceAscItem =  items.slice().sort(function(a,b){
        const genreA = a.price;
        const genreB = b.price;
          return genreA - genreB
        });

      priceDescItem =  items.slice().sort(function(a,b){
        const genreA = a.price;
        const genreB = b.price;
          return genreB - genreA
        });

      //console.log(item);
      //data source into ListView
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });

  }

  reverseState(){
    //console.log('in');
    //console.log('ids',this.state.itemDataSource);
    if(this.state.itemDataSource._dataBlob.s1 == origItem){
      //console.log('in2');
      return this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(reverse)
      });
    }else if(this.state.itemDataSource._dataBlob.s1 == reverse){
      return this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(origItem)
      });
    }else if (this.state.itemDataSource._dataBlob.s1 == priceAscItem){
      return this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(priceDescItem)
      });
    }else if(this.state.itemDataSource._dataBlob.s1 == priceDescItem){
      return this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(priceAscItem)
      });
    }else{
      return this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(reverse)
      });
    }
  }

  pressRow(item){
    //console.log(item);
  }

  renderRow(item){

    return(
      <View>
      <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Detail', {
            title:item.title,
            price: item.price,
            name: item.name,
            insu: item.insu,
            desc: item.desc,
            tel: item.tel,
            web: item.web,
            picNo: item.picNo,
            address: item.address
          })}
      >
      <View style={{flexDirection: 'row',height:130,margin:1,marginBottom:3,borderWidth:1,backgroundColor:'rgba(204, 255, 255, 0.6)',borderRadius:3}}>
        <View style ={{flex:16,
            //borderWidth:1,
            justifyContent:'center',alignItems:'center'}}>
          <Image source={{uri: item.picNo}}  style={{height:120,width:150,padding:10,borderRadius:5}} />
        </View>
        <View style={{flex:19,padding:10,
            //borderWidth:2
            }}>
          <Text style={{fontSize:14}}>{item.name}</Text>
          <Text></Text>
          <Text style={{fontSize:13}}>{item.price} Baht/Month</Text>
          <Text style={{fontSize:13}}>{item.tel}</Text>
          <Text style={{fontSize:11}}>{item.web}</Text>
        </View>
        <View style={{flex:1.5,justifyContent:'center',alignItems:'center',
            borderWidth:2
            }}>
          <Text style={{fontSize:20}}>></Text>
        </View>
      </View>
      </TouchableHighlight>
      </View>
    );
  }

  render() {
      console.log(this.state.itemDataSource);
    return (
      <View style={{flex:1,marginBottom:1}}>
        <Image style={{flex:1,height:undefined,width:undefined}} source={require('./img/BG.jpg')}>
        <Toolbar title="List of Dorms and houses"/>
        <Text style={{flex:0.05,paddingLeft:10,fontSize:15}} >Sort by</Text>
        <View style={{flex:0.1,flexDirection:'row',paddingBottom:2}}>
          <View style={{flex:1,borderWidth:1,margin:2,backgroundColor:'rgba(204, 255, 255, 0.7)',borderRadius:3}}>
            <TouchableHighlight
              style={{flex:1,justifyContent:'center',alignItems:'center'}}
              onPress={() => {this.setState({itemDataSource: this.state.itemDataSource.cloneWithRows(origItem)})}}
            >
              <Text>Default</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex:1,borderWidth:1,margin:2,backgroundColor:'rgba(204, 255, 255, 0.7)',borderRadius:3}}>
            <TouchableHighlight
              style={{flex:1,justifyContent:'center',alignItems:'center'}}
              onPress={() => {this.setState({itemDataSource: this.state.itemDataSource.cloneWithRows(priceAscItem)})}}>
              <Text>Price</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex:1,borderWidth:1,margin:2,backgroundColor:'rgba(204, 255, 255, 0.7)',borderRadius:3}}>
            <TouchableHighlight
              style={{flex:1,justifyContent:'center',alignItems:'center'}}
              onPress={() => {this.reverseState()}}>
              <Text>Desc/Asc</Text>
            </TouchableHighlight>
          </View>
        </View>

        <ListView
            style={{padding:4,flex:1}}
            dataSource ={this.state.itemDataSource}
            renderRow ={this.renderRow}
            enableEmptySections={true}
        />
        </Image>
      </View>
    )
  };
}

class Add extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Request',
    title: 'TU-Housing',
  };
  constructor(){
    super();
    let ds =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !=r2});
    this.state = {
      itemDataSource:ds,
      text:'',
    }
    this.itemsRef = this.getRef().child('items');
  }
  getRef(){
    return firebaseApp.database().ref();
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Toolbar title="Request a place added"/>
        <Image style={{flex:1,height:undefined,width:undefined}} source={require('./img/BG.jpg')}>
        <View style={{alignItems:'center',marginTop:20}}>
        <TextInput
          style={styles.textInput}
          value={this.state.newName}
          placeholder="Property name"
          onChangeText = {(value)=>this.setState({newName:value})}
        />
        <TextInput
          style={styles.textInput}
          value={this.state.newAdress}
          placeholder="Address"
          onChangeText = {(value)=>this.setState({newAdress:value})}
        />
        <TextInput
          style={styles.textInput}
          value={this.state.newPrice}
          placeholder="Price"
          onChangeText = {(value)=>this.setState({newPrice:value})}
        />
        <TextInput
          style={styles.textInput}
          value={this.state.newTel}
          placeholder="Tel"
          onChangeText = {(value)=>this.setState({newTel:value})}
        />
        <TextInput
          style={styles.textInput}
          value={this.state.newWeb}
          placeholder="Web"
          onChangeText = {(value)=>this.setState({newWeb:value})}
        />
        </View>

        <View style={styles.action}>
          <TouchableHighlight
            onPress ={()=>
              {this.itemsRef.push({
                name:this.state.newName,
                address:this.state.newAdress,
                price:this.state.newPrice,
                tel:this.state.newTel,
                web:this.state.newWeb,
                description : "Dorm near Chiang Rak",
                insurance : '696969',
                picNo : "https://s-media-cache-ak0.pinimg.com/originals/89/22/41/892241351aed65d3ed09cedbd9e309d2.jpg",
                title : "Item new",
              });}
            }
          >
            <Text style={styles.actionText}>Request</Text>
          </TouchableHighlight>
        </View>
        </Image>
      </View>
    )
  };
}

class Detail extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };
  separator(){
    return(
      <View style={{height:1,backgroundColor:'lightgray',margin:5}}/>
    );
  }
  render(){
      let {params} = this.props.navigation.state;
      console.log(util.inspect(this.props.navigation.state,false,null));
    return(
      <View style={{flexDirection:'column',flex:1}}>
        <Image style={{flex:1,height:undefined,width:undefined}} source={require('./img/BG2.png')}>
        <View style={{flex:1,flexDirection:'column'}}>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Image style={styles.image} source={{uri: params.picNo}}/>
          </View>
          <View style={{flex:1,padding:10,marginTop:45,}}>
            <Text></Text>
            <Text style={{fontSize:18}}>          {params.name}</Text>
            {this.separator()}
            <Text style={{fontSize:12}}>{params.address}</Text>

            <Text style={{fontSize:10}}>    Webpage:  {params.web}</Text>
            {this.separator()}

          </View>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:1,padding:15}}>
            <Text style={{fontSize:12}}>Description: {params.desc}</Text>
            {this.separator()}
            <Text style={{fontSize:12}}>Price: {params.price} Baht/Month</Text>
            {this.separator()}
            <Text style={{fontSize:12}}>Insurance limit: {params.insu}</Text>
            {this.separator()}
            <Text style={{fontSize:12}}>Tel#: {params.tel}</Text>
            {this.separator()}
          </View>
          <View style={{flex:1,padding:10}}>
          <MapView
            style={{flex:1}}
            initialRegion={{
              zoomEnabled:true,
              minZoomLevel:5,
              maxZoomLevel:16,
              latitude: 14.0708,
              longitude:  100.6079029,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
            />
          </View>
        </View>
        </View>
        </Image>
      </View>
    );
  }
}

const MainScreenNavigator = TabNavigator({
  Home: { screen: Home },
  SearchPage: { screen: SearchPage },
  Add: { screen: Add },
});
const StackNav = StackNavigator({
  Main: { screen: MainScreenNavigator },
  Detail: { screen: Detail },
});

export default class App extends React.Component {
  render() {
    return (
        <StackNav/>
    );
  }
}
