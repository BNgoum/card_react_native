import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

import Card from './components/Card';

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
    isHidden: false,
    userInfo : {},
    cardIsOpen: false
  };

  // On request la permission d'utilisation de la camera
  // Si ok on modifie le state de la variable hasCameraPermission à true
  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    let objectUser = JSON.parse(result.data); 

    for (const key in objectUser) {
      if (objectUser.hasOwnProperty(key)) {
        switch (key) {
          case 'nom' :
            this.setState(({userInfo}) => ({userInfo: {
              ...userInfo,
              nom: objectUser[key],
            }}))
            break;
          case 'prenom' :
            this.setState(({userInfo}) => ({userInfo: {
              ...userInfo,
              prenom: objectUser[key],
            }}))
            break;
          case 'age' :
            this.setState(({userInfo}) => ({userInfo: {
              ...userInfo,
              age: objectUser[key],
            }}))
            break;
          case 'mail' :
            this.setState(({userInfo}) => ({userInfo: {
              ...userInfo,
              mail: objectUser[key],
            }}))
            break;
          case 'avatar' :
            this.setState(({userInfo}) => ({userInfo: {
              ...userInfo,
              avatar: objectUser[key],
            }}))
            break;
          default:
            console.log('Case default');
        }
      }
    }

    // if (result.data !== this.state.lastScannedUrl) {
    //   LayoutAnimation.spring();
    //   this.setState({ lastScannedUrl: result.data });
    // }
  };

  // On cache le block d'accueil et on fait une demande d'autorisation d'utilisation de la caméra
  handleOnPressOpenCamera = () => {
    this.setState({isHidden: true});
    this._requestCameraPermission();
  }

  // On récupère le changement de state du children
  handleDisplayCard = () => {
    // On set le state cardIsOpen à true puis à false
    this.setState({cardIsOpen: true})
    setTimeout(() => { this.setState({cardIsOpen: false, userInfo: {}}) }, 500);

  }

  // On affiche la carte seulement si l'object userInfo n'est pas vide et que la carte n'est pas déjà ouverte
  displayCard = () => {
    if (Object.keys(this.state.userInfo).length > 0 && !this.state.cardIsOpen) {
      return <Card data={this.state.userInfo} displayCard={this.handleDisplayCard}/>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          !this.state.isHidden &&
          <View style={styles.wrapperApp}>
            <Text style={styles.title}>Scanne et découvre !</Text>
            <Image style={styles.qrcode} source={require('./assets/qrcode.png')}/>
            <TouchableOpacity style={styles.wrapperButton} onPress={() => this.handleOnPressOpenCamera()}><Text style={styles.textButton}>Scanner</Text></TouchableOpacity>
          </View>
        }
        
        {
          this.state.hasCameraPermission !== null &&
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={styles.viewCamera}
          />
        }

        { this.displayCard() }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  viewCamera: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 34,
    textAlign: 'center',
    color: '#333'
  },
  wrapperButton: {
    padding: 16,
    width: 130,
    backgroundColor: '#333',
    borderRadius: 50,
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  wrapperApp: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 48,
    borderWidth: 7,
    borderColor: '#2ab5b5',
    position: 'absolute',
    width: '90%',
    height: '94%',
    left: '5%',
    top: '3%',
    borderRadius: 15
  },
  qrcode: {
    width: 230,
    height: 230,
  }
});
