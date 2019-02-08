import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class Content extends Component {
    render() {
        return (
            <View style={ styles.container }>
                {
                    this.props.data.employe && 
                    <View style={ styles.containerInformation }>
                        <FontAwesome name="birthday-cake" size={20} color={"#333"}/>
                        <Text style={ styles.textCard }>{ this.props.data.employe }</Text>
                    </View>
                }
                <View style={ styles.containerInformation }>
                    <FontAwesome name="birthday-cake" size={20} color={"#333"}/>
                    <Text style={ styles.textCard }>{ this.props.data.age }</Text>
                </View>
                <View style={ styles.containerInformation }>
                    <FontAwesome name="envelope" size={20} color={"#333"}/>
                    <Text style={ styles.textCard }>{ this.props.data.mail }</Text>
                </View>

                {
                    this.props.data.relation && 
                    <View style={ styles.containerInformation }>
                        <FontAwesome name="birthday-cake" size={20} color={"#333"}/>
                        <Text style={ styles.textCard }>{ this.props.data.relation }</Text>
                    </View>
                }

                <View style={ styles.containerInformation }>
                    <FontAwesome name="phone" size={20} color={"#333"}/>
                    <Text style={ styles.textCard }>{ this.props.data.tel }</Text>
                </View>
                <View style={ styles.containerInformation }>
                    <FontAwesome name="star" size={20} color={"#333"}/>
                    <Text style={ styles.textCard }>{ this.props.data.hobbies }</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    textCard: {
        fontSize: 16,
        color: '#333',
        marginLeft: 16,
        maxWidth: '80%',
        fontFamily: 'roboto-regular'
    },
    containerInformation: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    }
  });