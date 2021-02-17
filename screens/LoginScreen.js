import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Platform, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logo from '../assets/logo.png';
import * as Animatable from 'react-native-animatable';
import { createNewUser, getUsers, login } from '../src/redux/actions/user';
import { Divider, Headline, Paragraph, TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownAlert from 'react-native-dropdownalert';
import * as LocalAuthentication from 'expo-local-authentication'

export default function Login({ navigation }) {
	const dispatch = useDispatch();
  	useEffect(() => {
		dispatch(getUsers());
    getStoredUser()
    checkDeviceForHardware();
	},[]);

  let storageUser= "";
   // Trae el usuario guardado en asyncStorage, en forma de objeto.
   const getStoredUser = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('USER')
      storageUser = jsonData;
      setState({ compatible: true, loggedUser: JSON.parse(jsonData) })

    } catch(e) {
      // error reading value
    }
  }


  const [state, setState] = useState({
    compatible: false,
    loggedUser: {}
  });

	const [ data, setData ] = useState({
		email                 : '',
		password              : '',
		check_TextImputChange : false,
		secureTextEntry       : true,
		isValidUser           : true,
		isValidPassword       : true
	});

	function handlePasswordChange(val) {
	  if (/^[a-zA-Z0-9]{8,20}$/i.test(val)){
			setData({
					...data,
					password: val,
					isValidPassword: true
			});
	  } else {
			setData({
					...data,
					password: val,
					isValidPassword: false
			});
	  }
	}


			function textInputChange(val) {
			  if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(val)){
					setData({
							...data,
							email: val,
							check_textInputChange: true,
							isValidUser: true
					});
			  } else {
					setData({
							...data,
							email: val,
							check_textInputChange: false,
							isValidUser: false
					});
			  }
			}


	const updateSecureTextEntry = () => {
			setData({
					...data,
					secureTextEntry: !data.secureTextEntry
			});
	}

	const handleLogin = () => {
		if (data.isValidUser && data.isValidPassword) {
			dispatch(login(data));
      storeUser(data)
		}
	};

  //Guarda el user que se loguea en asyncStorage.
   const storeUser = async (data) => {
        try {
      const jsonData = JSON.stringify(data)
      await AsyncStorage.setItem('USER', jsonData);
    } catch(e){
      console.log(e);
    }
  }

  var loggedUser = state.loggedUser;

  //Checkea si el telefono es compatible
  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    setState({ compatible });
    getStoredUser();
    if (!compatible) {
      showIncompatibleAlert();
    }
  };

  //Error si no es compatible.
  const showIncompatibleAlert = () => {
    dropdown.alertWithType(
      'error',
      'Dispositivo no compatible',
      'Su dispositivo no es compatible con escaneo de huella dactilar.'
    );
  };

  //Busca que haya huellas guardadas.
  const checkForBiometrics = async () => {
    let biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (!biometricRecords) {
      dropdown.alertWithType(
        'Atención',
        'No tiene huellas guardadas',
        'Asegurese que su dispositivo tenga huellas guardadas'
      );
    } else {
      handleLoginPress();
    }
  };

  const handleLoginPress = () => {
    if (Platform.OS === 'android') {
      showAndroidAlert();
    } else {
      scanBiometrics();
    }
  };

  const showAndroidAlert = () => {
    /*   Alert.alert('Fingerprint Scan', 'Coloque su huella sobre el sensor.'); */
    scanBiometrics();
  };

  const scanBiometrics = async () => {
    let result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      dropdown.alertWithType(
        'success',
        'You are you!',
        'Bio-Authentication succeeded.'
      );
      handleLogin2();
    } else {
      dropdown.alertWithType(
        'error',
        'Uh oh!',
        'Bio-Authentication failed or canceled.'
      );
    }
  };

  const handleLogin2 = () => {
    /*     console.log("loggedUSER >>", loggedUser)
        if (loggedUser.isValidUser && loggedUser.isValidPassword) { */
    dispatch(login(loggedUser));
    /*  } */
  };



	return (
		<View style={styles.container}>
		<View style={styles.logo}>
    <DropdownAlert
        ref={ref => (dropdown = ref)}
        closeInterval={5000}
      />
		<ImageBackground style={{ width: 140, height: 140 }}
		source={require('../assets/LogoVector.png')} />
		</View>
		<View style={styles.action}>
		<FontAwesome
		 name="user-o"
		 size={20}
		 style={{marginRight:5,marginTop:15}}
		 />
		 <TextInput
		 placeholder="Correo Electrónico"
		 autoCapitalize="none"
		 onChangeText={(val) => textInputChange(val)}
		 // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
		 style={{
		 height:48,
		 paddingLeft:5,
		 width:210,
		 backgroundColor:"transparent",
		 }}
		 />
		 {data.check_textInputChange ?
		 <Animatable.View animation="bounceIn">
		 <Feather
		 name="check-circle"
		 color="green"
		 size={20}
		 style={{marginTop:15}}
		 />
		 </Animatable.View>
		 : null}
		 </View>
		 { data.isValidUser ? null :
		 <Animatable.View animation="fadeInLeft" duration={500}>
		 <Text style={styles.errorMsg}>Ingresar e-mail</Text>
		 </Animatable.View>
		 }
		 <View style={styles.action}>
		 <Feather
		 name="lock"
		 size={20}
		 style={{marginRight:5,marginTop:15}}
		 />
		 <TextInput
		 placeholder="Contraseña"
		 secureTextEntry={data.secureTextEntry ? true : false}
		 autoCapitalize="none"
		 onChangeText={(val) => handlePasswordChange(val)}
		 style={{
		 height:48,
		 paddingLeft:5,
		 width:210,
		 backgroundColor:"transparent",

		 }}
		 />
		 <TouchableOpacity
		 onPress={updateSecureTextEntry}
		 >
		 {data.secureTextEntry ?
		 <Feather
		 name="eye-off"
		 color="grey"
		 size={20}
		 style={{marginTop:15}}
		 />
		 :
		 <Feather
		 name="eye"
		 color="grey"
		 size={20}
		 style={{marginTop:15}}
		 />
		 }
		 </TouchableOpacity>
		 </View>
		 <View
		 style={{marginTop:60
		 }}>
		 <View>
		 <View style={styles.boton}>
		 <Button
		 mode="contained"
		 onPress={handleLogin}
		 style={{
		 backgroundColor : '#006A34',
		 }}>
		 INICIAR SESIóN
		 </Button>
		 </View>
		 </View>
			 <Button
			 mode="contained"
			 onPress={
          state.compatible
            ? checkForBiometrics
            : showIncompatibleAlert
        }
			 style={{
				 borderRadius:5,
				 marginTop: 25,
				 marginLeft:'32%',
				 width: 150,
			 backgroundColor : '#006A34',
			 }}>
			 Usar Huella
			 </Button>
	 </View>
	</View>
	);
};


const styles = StyleSheet.create({
container: {
	backgroundColor:'#FFF',
	height:'100%',
	paddingTop:30
},
boton: {
	alignItems: 'center',
	marginTop:50,
	marginLeft:5
},
iconButtons: {
	marginBottom: 10,
	borderRadius: 20,
	marginTop: 25,
	width: 15,
	marginLeft: -12
},
logo: {
	alignItems:'center',
	marginTop:30
},
	action: {
			flexDirection:'row',

			marginTop:20,
			marginLeft:"20%",
			paddingBottom:5
	},
	errorMsg: {
			color: '#FF0000',
			fontSize: 14,
			marginLeft:100
	},
});
