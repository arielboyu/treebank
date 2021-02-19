import React, { useState,  useEffect } from 'react';
import {
  StyleSheet, View, TouchableOpacity, SafeAreaView, FlatList,
  ActivityIndicator, StatusBar, Text,
  Dimensions,Alert
} from 'react-native';
import {useSelector} from 'react-redux';

import * as Contacts from 'expo-contacts';
import { Headline, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

//crear get para comparar usuarios cargados en el db
//crear put para editar usuario de db



export default function PhoneBook({changeScreen}) {
  
  const contactos = useSelector(state => state.user.loggedUser.contacts)
  const [info, setInfo] = useState({
       isLoading: true,
       contacts: [],
  })
  console.log("contactos-", contactos)
  
  
   const comparar = () => {
  //   // acceder a los telefonos  de la db- contactos[i].mobile
  //   // acceder a los telefonos de los contactos- contacts.phoneNumbers[0].number
    const arg1 = contactos
    const arg2 = info.contacts
    console.log("contacto de db-",arg1[0].mobile)
    if(info.contacts[0]) console.log("contacto del movil-", arg2[0].phoneNumbers[0].number)
    
    
  //   return finalarray;
 }
 comparar()

  useEffect(() => {
      loadContacts();
      setInfo({
          ...info,
          isLoading: true
      });
      
      return () => {

      }
    }, []);

    const createButtonAlert = (item) =>
    Alert.alert(
      "Editar este contacto?",
      `${item.firstName + ' '}${item.lastName}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );


   let renderItem = ({item})=>(
    <View style={{minHeight:70,padding:5}}>
      <TouchableOpacity onPress={()=>createButtonAlert(item)}>
      <Text style={{color: 'black', fontSize:26}}>
        {item.firstName + ' '}{item.lastName}
      </Text>
      </TouchableOpacity>
      <Text style={{color: 'black', fontWeight:'bold'}}>
        {item.phoneNumbers[0].number}
      </Text>
    </View>
  )

  const loadContacts = async () => {
         const { status } = await Contacts.requestPermissionsAsync();
         if (status === 'granted') {
         const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
          });
    
          if (data.length > 0) {
               const contact = data[0];
               console.log("contacts-",contact);
          }
          console.log("data-",data);
          setInfo({
                ...info,
                contacts: data,
                inMemoryContacts: data,
                isLoading: false
              });
         }
       };
      
        
  const searchContacts = value => {
    const filsteredContacts = info.inMemoryContacts.filter(
      contact => {
        let contactLowercase = (contact.firstName+ ' ' + contact.lastName).toLowerCase()

        let searchTermLowercase = value.toLowerCase()

        return contactLowercase.indexOf(searchTermLowercase) > -1
      }
    )
    setInfo({ ...info, contacts: filsteredContacts });
  }

  return (
    <View style={styles.container2}>
      <View style={styles.heading}>
        <Icon.Button
          name="arrow-left" 
          size={25}
          color="black"
          backgroundColor="#FFFF"
          onPress={() => changeScreen('main')}
        />
        <Headline>Mis contactos...</Headline>
      </View>
      <View style={{flex:1}}>
        <TextInput
              label="Buscar contactos"
              mode="outlined"
              style={{
                    height: 40,
                    marginBottom: '5%'
              }}
              onChangeText={(value) => searchContacts(value)}
          />
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            {info.isLoading ? (
              <View
                style={{
                        ...StyleSheet.absoluteFill,
                        alignItems: 'center',
                        justifyContent: 'center'
                }}
                >
                <ActivityIndicator size="large" color="#bad555" />
               </View>
              ) : null}
              <FlatList
                data={info.contacts}
                
                onPress={() => {alert}}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                <View
                  style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50
                  }}
                >
                <Text style={{ color: "#bad555" }}>No hay contactos</Text>
                </View>
              )}
            />
          </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  },
  container2: {
		flex: 1,
 		padding: 20,
 		backgroundColor: "#FFFF"
  	},
    heading: {
      marginBottom: 10,
      marginTop: 10,
      fontSize: 35,
      alignItems : 'center',
      display: 'flex',
      flexDirection: 'row'
  }
});

