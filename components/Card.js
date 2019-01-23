import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    handleDisplay = () => {
        this.props.displayCard(false);            
    }

    render() {
        return (
            <View style={ styles.wrapperContent }>
                <View style={ styles.wrapperCard }>
                    <Image style={ styles.avatar } source={{uri: this.props.data.avatar}} />
                    <Text style={ styles.textCard }>{ this.props.data.nom }</Text>
                    <Text style={ styles.textCard }>{ this.props.data.prenom }</Text>
                    <Text style={ styles.textCard }>{ this.props.data.age }</Text>
                    <Text style={ styles.textCard }>{ this.props.data.mail }</Text>
                </View>
                <TouchableOpacity style={ styles.wrapperClose } onPress={ () => this.handleDisplay() }>
                    <Text>Fermer</Text>
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
        padding: 32,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '80%',
        height: '80%',
        position: 'absolute',
        top: '5%',
        left: '10%',
        bottom: 0,
        right: 0,
        borderRadius: 10,
    },
    textCard: {
        fontSize: 20,
        color: '#000'
    },
    avatar: {
        width: 200,
        height: 200,
    },
    wrapperClose: {
        padding: 12,
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 50
    }
  });