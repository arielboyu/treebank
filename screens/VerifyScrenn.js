import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/logo.png'
import { getUsers, verifyNewUser } from '../src/redux/actions/user'
import { Divider, Headline, Paragraph, TextInput, Button, } from 'react-native-paper';
import axios from 'axios'
import IP from '../src/redux/actions/ip';



export default function VerifyScrenn({ navigation }) {

  const userId = useSelector(state => state.user.user.id);

  const [data, setData] = useState({
    validationNumber: '',
  })

  const handleCodeChange = (code) => {
    setData({
      ...data,
      validationNumber: code
    })
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onSubmit = async (code, userId) => {
    try {
    const res = await axios.put(`/validation/${userId}`, code);
    //console.log("RES:DATA  ", res.data)
        return navigation.navigate('DischargeScreen')

    } catch (err) {


     if (err) alert('Código de verificación incorrecto');
    }
  };



  return (
    <View style={styles.container}>
    <View style={styles.logo}>
    <ImageBackground
    style={{width:140,height:140}}
    source={require('../assets/LogoVector.png')}
    >
    </ImageBackground>
    </View>
      <View style={{position:'relative',
      top:50
      }}>
      <View style={{position:'relative',
      top:80,
      }}>
      <View style={styles.icon_pw}>
      <FontAwesome
      name='lock'
      color='black'
      size={30}
      />
      </View>
      <View>
      <TextInput
      label="Código de verificación"
      onChangeText={code => handleCodeChange(code)}
      keyboardType="decimal-pad"
      style={{height:48,
        paddingLeft:5,
        width:210,
        position: 'relative',
        left:110,
        backgroundColor:'transparent',
        top:-80}}
      />
      </View>
      <View style={{
      position: 'relative',
      top:-30}} >
      <Divider/>
      <Divider/>
      </View>
      </View>
      </View>
      <View style={styles.boton}>
      <View>
      <Button
     mode="contained"
     onPress={()=>(onSubmit(data, userId))}
     style={{
     backgroundColor: '#006A34',
     width:150
   }}>
   CONFIRMAR</Button>
  </View>
  </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#FFFF"
  },
  icon_pw: {
    position: 'relative',
    top: -45,
    left: 62,
  },
  logo: {
    alignItems: 'center',
    marginTop: 30,
  },
  boton: {
    alignItems: 'center',
    marginTop: 135,
    marginLeft: 10
  },
  iconButtons: {
    marginBottom: 10,
    borderRadius: 20,
    marginTop: 25,
    width: 15,
    marginLeft: -12
  },
  heading: {
    fontSize: 35,
    position: 'relative',
    top: 20,
    left: -100,
    alignItems: 'center'
  },
});
