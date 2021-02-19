import React, {useState} from 'react';
import { ImageBackground,Image, StyleSheet, Text, View,CheckBox, ScrollView } from 'react-native';
import { Divider, Headline, Paragraph,TextInput, Button, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import logo from '../assets/logo.png'
import Transfer from 'react-native-vector-icons/MaterialCommunityIcons';
import { ButtonGroup } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import IP from '../src/redux/actions/ip';


export default function SendCvu({ changeScreen, navigation, selected, updateSelected }) {
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

{/* camio de input cvu:  2222226194980634363704  */}





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
        <Headline>Enviar dinero...</Headline>
      </View>
      <View style={styles.logo}>
        <ImageBackground
          style={{ width: 140, height: 140 }}
          source={require('../assets/LogoVector.png')}
        >
        </ImageBackground>
      </View>
      <View style={styles.center}>
      <View style={styles.action}>
        <ButtonGroup
          onPress={updateSelected}
          selectedIndex={selected}
          buttons={["Cliente TreeBank", "Otros bancos"]}
          containerStyle={{height: 40, width: 222}}
          selectedButtonStyle={{backgroundColor: '#006A34'}}
        />
      </View>
      <View style={styles.action}>
        <TextInput
          label="Ingrese CVU"
          onChangeText={(val) => handleChange({ value: val, type: 'cvu_receiver' })}
          autoCapitalize="none"
          mode="outlined"
          style={{
            height: 40,
            width: 222,
          }}
        />
      </View>
      <View style={styles.action}>
        <TextInput
          label="Monto"
          autoCapitalize="none"
          onChangeText={(val) => handleChange({ value: val, type: 'amount' })}
          mode="outlined"
          style={{
            height: 40,
            width: 222,
          }}
        />
        </View>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={{marginRight: 4}}
        />
        <Text>Acepto usar la sección amigos con fines personales {isSelected ? "👍" : "👎"}</Text>
      </View>

      <View
        style={{
          marginTop: 60
        }}>
          <View style={styles.boton}>
            <Button style={styles.iconButtons}
              onPress={() => {
                handleSendMoney();
              }}>
              <Transfer name="send" size={30} color="#fff" />
            </Button>
            <Paragraph style={{ fontWeight: '700' }}>Enviar</Paragraph>
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
    marginTop: '5%',
  },
  logo: {
    alignItems: 'center',
    marginTop: 30,
  },
  center: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column'
	},
  boton: {
    alignItems: 'center',
  },
  iconButtons: {
    backgroundColor: '#097934',
		marginBottom: 12,
		borderRadius: 20,
		marginTop: 25
  },
  heading: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 35,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%'
  }
});
