import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Constants, takeSnapshotAsync, MediaLibrary} from 'expo';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

export default class Card extends Component {
    state = {
        snapshot: null,
    };

    _saveScreenshotAsync = async () => {
        try {
          let result = await takeSnapshotAsync(this.containerCard, {
            format: 'jpg'
        });
        this.setState({ snapshot: result });

        // const asset = await MediaLibrary.createAssetAsync(this.state.snapshot);
        // console.log('asset : ', asset);
        MediaLibrary.createAssetAsync(this.state.snapshot)
        .then(() => {
            Alert.alert('L\'image est bien sauvegardé dans votre galerie !')
        })
        .catch(error => {
            Alert.alert('Une erreur est apparu lors de l\'enregistrement de la Kart: ', error);
        });
        } catch (e) {
          console.log(e);
        }
    };

    takePictureAndCreateAlbum = async () => {
        console.log('tpaca');
        const { uri } = await this.camera.takePictureAsync();
        console.log('uri', uri);
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log('asset', asset);
        MediaLibrary.createAlbumAsync('Expo', asset)
          .then(() => {
            Alert.alert('Album created!')
          })
          .catch(error => {
            Alert.alert('An Error Occurred!')
          });
      };
    

    handleDisplay = () => {
        this.props.displayCard(false);            
    }

    render() {
        console.log('SAve : ', this.state.snapshot)
        return (
            <View style={ styles.wrapperContent }>
                <View style={ [styles.wrapperCard, this.props.data.isPro && styles.wrapperCardPro] } ref={view => {
                this.containerCard = view;
              }}>

                    <Image style={ styles.avatar } source={{uri: this.props.data.avatar}} />

                    <Header data={this.props.data} />
                    
                    <Content data={this.props.data} />
                    
                    <Footer data={this.props.data} />
                </View>

                {this.state.snapshot ? (
                <Image
                    source={{ uri: `data:image/png;base64, ${this.state.snapshot}` }}
                    style={{ width: 200, height: 200 }}
                />
                ) : null}

                <TouchableOpacity style={ styles.wrapperClose } onPress={ () => this.handleDisplay() }>
                    <Text>Fermer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ styles.wrapperSave } onPress={ () => this._saveScreenshotAsync() }>
                    <Text>Enregistrer</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    wrapperCard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '90%',
        height: '80%',
        position: 'absolute',
        top: '5%',
        left: '5%',
        bottom: 0,
        right: 0,
        borderRadius: 10,
        borderWidth: 7,
        borderColor: '#2ab5b5',
    },
    wrapperCardPro: {
        borderColor: '#333',
    },
    wrapperPro: {
        backgroundColor: '#333',
    },
    avatar: {
        width: '100%',
        height: 200,
    },
    wrapperClose: {
        padding: 12,
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 50
    },
    wrapperSave: {
        padding: 12,
        position: 'absolute',
        bottom: '5%',
        backgroundColor: '#fff',
        borderRadius: 50
    },
  });