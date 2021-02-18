import React, {useState} from 'react';
import { ImageBackground,Image, StyleSheet, Text, View,CheckBox, ScrollView } from 'react-native';
import { Divider, Headline, Paragraph,TextInput, Button, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import logo from '../assets/logo.png'
import Transfer from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import IP from '../src/redux/actions/ip';


export default function SendCvu({ changeScreen, navigation }) {
  const [isSelected, setSelection] = useState(false);
  const contacts = useSelector(state => state.user.loggedUser.contacts)
  const userId = useSelector(state => state.user.loggedUser.id)
  const cvuUser = useSelector(state => state.user.loggedUser.accounts[1].cvuUS)
  const nameUser = useSelector(state => state.user.loggedUser.firstName)

  const [contactState, setContactState] =useState(false);

  const [data, setData] = useState({
    form: {
      amount: '',
      cvu_receiver: '',
      cvu_sender: cvuUser,
      name_sender: nameUser

    }
  })

  const handleChange = (val) => {

    setData({
      ...data,
      form: {
        ...data.form,
        [val.type]: val.value,

      }
    });
  }
  //console.log('Data', data);

  const handleSendMoney =  async () => {

    console.log("DATA 2 >>>", data.form)
        return  await axios.post(`https://intermoba.herokuapp.com/`, data.form )
        .then(  await axios.put(`/account/envio/1`, data.form)
        .catch((err) => alert(`No posee los fondos suficientes`)))
        .then( navigation.navigate('Inicio'))
      };

{/*cvu:  2222226194980634363704  */}



  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Icon.Button
          name="arrow-left"
          size={25}
          color="black"
          backgroundColor="transparent"
          onPress={() => changeScreen('main')}
        />
        <Headline>Enviar Dinero</Headline>
      </View>
      <View style={styles.logo}>
        <ImageBackground
          style={{ width: 60, height: 60 }}
          source={require('../assets/LogoVector.png')}
        >
        </ImageBackground>
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Ingrese Cvu"
          onChangeText={(val) => handleChange({ value: val, type: 'cvu_receiver' })}
          autoCapitalize="none"
          style={{
            height: 48,
            paddingLeft: 5,
            width: 180,
          }}
        />
      </View>
      <View style={{
        marginTop: 15,
        marginLeft: 80
      }} >

      </View>
      <View style={styles.monto}>
        <TextInput
          placeholder="$ monto"
          autoCapitalize="none"
          keyboardType="decimal-pad"
          onChangeText={(val) => handleChange({ value: val, type: 'amount' })}
          style={{
            marginTop:20,
            height: 40,
            paddingLeft: 5,
            width: 80,
            fontSize: 12
          }}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
      </View>
      <Text>Acepto usar la sección amigo  con fines personales  {isSelected ? "👍" : "👎"}</Text>
      <View
        style={{
          marginTop: 60
        }}>
        <View style={styles.botones}>
          <View style={styles.boton}>
            <Button style={styles.iconButtons}
              onPress={() => {
                handleSendMoney();
              }}>
              <Transfer name="send" size={30} color="#fff" />
            </Button>
            <Paragraph style={{ fontWeight: '700', marginLeft: -36 }}>Enviar</Paragraph>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  action: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 90,
    paddingBottom: 5
  },
  monto: {
    flexDirection: 'row',
    marginTop: -40,
    marginLeft: 190,
    paddingBottom: 5
  },
  logo: {
    alignItems: 'center',
    marginTop: 30,
  },
  boton: {
    alignItems: 'center',
    marginTop: 60,
    marginLeft: 20
  },
  iconButtons: {
    backgroundColor: '#006A34',
    marginBottom: 10,
    borderRadius: 20,
    marginTop: -65,
    width: 15,
    marginLeft: -32
  },
  heading: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 35,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },

});
