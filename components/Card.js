import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';

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
                    <View style={ styles.wrapperName }>
                        <Text style={ styles.textName }>{ this.props.data.nom }</Text>
                        <Text style={ styles.textName }>{ this.props.data.prenom }</Text>
                    </View>

                    <Text style={ styles.textStatut }>{ this.props.data.statut }</Text>
                    
                    <Text style={ styles.textCard }>{ this.props.data.age }</Text>
                    <Text style={ styles.textCard }>{ this.props.data.mail }</Text>
                    <Text style={ styles.textCard }>{ this.props.data.tel }</Text>
                    <Text style={ styles.textCard }>{ this.props.data.hobbies }</Text>
                    
                    <View style={ styles.wrapperFooter }>
                        <TouchableOpacity onPress={()=>{ Linking.openURL('facebook://app')}}>
                            <IconFontAwesome name="facebook-square" size={30} color="#000"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{ Linking.openURL('instagram://app')}}>
                            <IconEntypo name="instagram" size={30} color="#000"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{ Linking.openURL('twitter://app')}}>
                            <IconFontAwesome name="twitter" size={30} color="#000"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{ Linking.openURL('mailto:' + this.props.data.mail)}}>
                            <IconFontAwesome name="envelope" size={30} color="#000"/>
                        </TouchableOpacity>
                    </View>
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
        // borderColor: '#2ab5b5',
        borderColor: '#333',
    },
    textCard: {
        fontSize: 20,
        color: '#000'
    },
    avatar: {
        width: '100%',
        height: 250,
    },
    wrapperClose: {
        padding: 12,
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 50
    },
    wrapperName: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#2ab5b5',
        width: "100%"
    },
    textName: {
        fontSize: 24,
        color: '#333',
        fontWeight: '600',
        marginRight: 8
    },
    textStatut: {
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 16
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
    }
  });