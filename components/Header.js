import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Header extends Component {
    render() {
        return (
            <View style={ [styles.container, this.props.data.isPro && styles.wrapperPro] }>
                <View style={ styles.wrapperName }>
                    <Text style={ [styles.textName, this.props.data.isPro && styles.textNamePro] }>{ this.props.data.nom }</Text>
                    <Text style={ [styles.textName, this.props.data.isPro && styles.textNamePro] }>{ this.props.data.prenom }</Text>
                </View>
                <Text style={ [styles.textStatut, this.props.data.isPro && styles.textStatutPro] }>{ this.props.data.statut }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#2ab5b5',
        width: "100%"
    },
    wrapperName: {
        display: 'flex',
        flexDirection: 'row'
    },
    wrapperPro: {
        backgroundColor: '#333',
    },
    textStatut: {
        fontSize: 12,
        fontWeight: '300',
        color: '#333',
        fontFamily: 'roboto-regular'
    },
    textStatutPro: {
        color: '#fff'
    },
    textName: {
        fontSize: 24,
        color: '#333',
        fontWeight: '600',
        marginRight: 8,
        fontFamily: 'roboto-bold'
    },
    textNamePro: {
        color: '#fff'
    },
    wrapperPro: {
        backgroundColor: '#333',
    },
  });