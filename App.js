import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner, Permissions, Font } from 'expo';

import Card from './components/Card';

import { bdd } from './bdd';

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    isHidden: false,
    userInfo : {},
    cardIsOpen: false,
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'roboto-bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
      'roboto-regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  // On request la permission d'utilisation de la camera
  // Si ok on modifie le state de la variable hasCameraPermission à granted
  handleOnPressOpenCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
      isHidden: true
    });
  };

  // Fonction de lecture du QR Code
  _handleQRCodeRead = result => {
    // On récupère l'id 
    let objectUser = JSON.parse(result.data);

    // On parcours la bdd et on compare si l'id récupéré correspond à un id de la Bdd
    for (const key in bdd) {
      if (bdd.hasOwnProperty(key)) {
        // Si ça correspond, on modifie le state avec les données du user et on met cardIsOpen à true
        if ( key == objectUser.id) { this.setState({ userInfo: bdd[key], cardIsOpen: true}) }
      }
    }
  };

  // On récupère le changement de state du children
  handleHideCard = () => {
    // On set le state cardIsOpen à false
    this.setState({cardIsOpen: false})
  }

  // On affiche la carte seulement si l'object userInfo n'est pas vide et que l'état de la carte est ouverte
  displayCard = () => {
    if (Object.keys(this.state.userInfo).length > 0 && this.state.cardIsOpen) {
      return <Card data={this.state.userInfo} displayCard={this.handleHideCard}/>
    }
  }

  render() {
    return (
        this.state.fontLoaded &&
          <View style={styles.container}>
          {
            !this.state.isHidden &&
            <View style={styles.wrapperApp}>
              <Text style={styles.title}>Scanne et découvre !</Text>
              <Image style={styles.qrcode} source={require('./assets/scan.png')}/>
              <TouchableOpacity style={styles.wrapperButton} onPress={() => this.handleOnPressOpenCamera()}><Text style={styles.textButton}>Scanner</Text></TouchableOpacity>
            </View>
          }
          
          {
            this.state.hasCameraPermission !== null &&
            <BarCodeScanner
              onBarCodeRead={this._handleQRCodeRead}
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
    color: '#333',
    fontFamily: 'roboto-bold'
  },
  wrapperButton: {
    padding: 16,
    width: 230,
    backgroundColor: '#333',
    borderRadius: 50,
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'roboto-regular'
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
    width: 180,
    height: 180,
  }
});
