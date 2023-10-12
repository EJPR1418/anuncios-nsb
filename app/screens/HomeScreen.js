import React from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';

function HomeScreen(props) {
 return(
 <ImageBackground 
 source={require('../assets/cloud_background.jpg')}
 style={styles.background}>
    <Image style={styles.logo} source={'../assets/escudo_nsb.jpg'}/>
   <View style={styles.loginButton}></View>  
   <View style={styles.registerButton}></View>
 </ImageBackground>
 );
}
const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent:'flex-end',
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#fc5c65',
    },
    logo: {
        width: 220,
        height: 220,
        position: 'absolute',
        top: 50,
    },
    registerButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#4ecdc4',
    },
});
export default HomeScreen;