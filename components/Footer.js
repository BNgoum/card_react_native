import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

export default class Footer extends Component {
    render() {
        return (
            <View style={ [styles.wrapperFooter, this.props.data.isPro && styles.wrapperPro] }>
                <TouchableOpacity onPress={()=>{ Linking.openURL('facebook://app')}}>
                    <FontAwesome name="facebook-square" size={30} color={ this.props.data.isPro ? "#fff" : "#333" }/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ Linking.openURL('instagram://app')}}>
                    <Entypo name="instagram" size={30} color={ this.props.data.isPro ? "#fff" : "#333" }/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ Linking.openURL('twitter://app')}}>
                    <FontAwesome name="twitter" size={30} color={ this.props.data.isPro ? "#fff" : "#333" }/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ Linking.openURL('mailto:' + this.props.data.mail)}}>
                    <FontAwesome name="envelope" size={30} color={ this.props.data.isPro ? "#fff" : "#333" }/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperPro: {
        backgroundColor: '#333',
    },
    wrapperFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#2ab5b5',
        paddingTop: 8,
        width: '100%'
    },
  });