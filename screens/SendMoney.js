import React, {useState} from 'react';
import { ImageBackground,Image, StyleSheet, Text, View,CheckBox, ScrollView } from 'react-native';
import { Divider, Headline, Paragraph,TextInput, Button, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import logo from '../assets/logo.png'
import { ButtonGroup } from 'react-native-elements'
import Transfer from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import IP from '../src/redux/actions/ip';


export default function SendMoney({ changeScreen, selected, updateSelected }) {
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
          backgroundColor="transparent"
          onPress={() => changeScreen('main')}
        />
        <Headline>Enviar dinero...</Headline>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.logo}>
        <ImageBackground
          style={{ width: 140, height: 140}}
          source={require('../assets/LogoVector.png')}
        />
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
        <Picker
          style={{
            color: '#9C9C9C',
            width: 222,
            height: 40,
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 16,
            borderColor: '#9C9C9C',
            paddingLeft: 14
          }}
          selectedValue={contactState}
          onValueChange={(val) => (setContactState(val), handleChange({ value: val, type:'contactId' }))}
        >
          <Picker.Item label="Seleccione un contacto..." />

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
          label="Detalle de envío"
          autoCapitalize="none"
          mode="outlined"
          onChangeText={(val) => handleChange({ value: val, type: 'description' })}
          style={{
            height: 40,
            width: 222,
          }}
        />
      </View>
      <View style={styles.action}>
        <TextInput
          label="Ingrese CVU"
          autoCapitalize="none"
          mode="outlined"
          style={{
            height: 40,            
            width: 222,
          }}
        />
      </View>
      <View style={[{
        width: 222,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }, styles.action]} >
        <Picker
          onValueChange={(val) => handleChange({ value: val || "pesos", type: 'currency' })}
          style={{
            color: '#9C9C9C',
            width: 100,
            height: 40,
            marginTop: 8,
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 16,
            borderColor: '#9C9C9C',
            paddingLeft: 14
          }}
        >
          {/* <Picker.Item label="$" value="pesos" /> */}
          <Picker.Item label="$" value="pesos" />
          <Picker.Item label="U$D" value="dolares" />
        </Picker>
        <TextInput
          label="Monto"
          autoCapitalize="none"
          keyboardType="decimal-pad"
          mode="outlined"
          onChangeText={(val) => handleChange({ value: val, type: 'amount' })}
          style={{
            height: 40,
            paddingLeft: 5,
            width: 100,
          }}
        />
      </View>
      
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={{marginRight: 4}}
        />
        <Text>Acepto usar la sección amigos con fines personales {isSelected ? "👍" : "👎"}</Text>
      </View>
      </View>
          <View style={styles.center}>
            <Button style={styles.iconButtons}
              onPress={() => {
                handleSendMoney();
              }}>
              <Transfer name="send" size={30} color="#fff" />
            </Button>
            <Paragraph style={{ fontWeight: '700'}}>Enviar</Paragraph>
          </View>
        </ScrollView>
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
