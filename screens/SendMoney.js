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


export default function SendMoney({ changeScreen, navigation }) {
  const [isSelected, setSelection] = useState(false);
  const contacts = useSelector(state => state.user.loggedUser.contacts)
  const userId = useSelector(state => state.user.loggedUser.id)

  const [contactState, setContactState] =useState(false);

  const [data, setData] = useState({
    form: {
     
      contactId: '',
      description: '',
      currency: '',
      amount: '',
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
      return  await axios.post(`/movement/transferencia/${userId}`, data.form )
      .then(  await axios.put(`/account/${userId}`, data.form ).catch((err) => alert(`No posee los fondos suficientes`)))    
      .then( changeScreen('main'))          
      
           
    };
	



  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Icon.Button
          name="arrow-left"
          size={25}
          color="black"
          backgroundColor="#FFFF"
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
        <Picker
          style={{
            color: 'black',
            width: 200,
          }}
          selectedValue={contactState}
          onValueChange={(val) => (setContactState(val), handleChange({ value: val, type:'contactId' }))}
        >
          <Picker.Item label="seleccione contacto.." />
         
          <Picker.Item label={contacts[0].alias} value={contacts[0].contactId} />
          <Picker.Item label={contacts[1].alias} value={contacts[1].contactId} />
          <Picker.Item label={contacts[2].alias} value={contacts[2].contactId} />
          <Picker.Item label={contacts[3].alias} value={contacts[3].contactId} />
          <Picker.Item label={contacts[4].alias} value={contacts[4].contactId} />
          <Picker.Item label={contacts[5].alias} value={contacts[5].contactId} />
        </Picker>
        {/* <TextInput
		 placeholder="Nombre o E-mail"
		 autoCapitalize="none"
		 mode="outlined"
		 style={{
		 height:40,
		 paddingLeft:5,
		 width:222,
		 }}
		 /> */}
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Detalle de envio"
          autoCapitalize="none"
          onChangeText={(val) => handleChange({ value: val, type: 'description' })}
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
        <Picker
          onValueChange={(val) => handleChange({ value: val || "pesos", type: 'currency' })}
          style={{
            color: 'black',
            width: 100,
          }}
        >
          <Picker.Item label="$" value="pesos" />
          <Picker.Item label="$" value="pesos" />
          <Picker.Item label="U$D" value="dolares" />
        </Picker>
      </View>
      <View style={styles.monto}>
        <TextInput
          placeholder="$ monto"
          autoCapitalize="none"
          keyboardType="decimal-pad"
          onChangeText={(val) => handleChange({ value: val, type: 'amount' })}
          style={{
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
    backgroundColor: "#FFFF"
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
    marginTop: 15,
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
