import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, Linking  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, RadioButton, Headline, Paragraph, Portal, Dialog, Divider, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Transfer from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../src/components/Header';


export default function CvuScreen({changeScreen}) {

  	const dispatch = useDispatch();
  	const user = useSelector(state => state.user)
  	const { firstName, lastName } = user.loggedUser
    const cvu = user.loggedUser.accounts[0].cvu
  	const cvuUS = user.loggedUser.accounts[1].cvuUS

  const handldeWhatsAppPress = async() => {
    await Linking.openURL(`https://wa.me/?text=Este es mi CVU:${cvu} / Cuenta en pesos, -Mensaje Enviado desde TreeBankAPP`)
  }

  const handldeWhatsAppPressUS = async() => {
    await Linking.openURL(`https://wa.me/?text=Este es mi CVU:${cvuUS} / Cuenta en Dolares, -Mensaje Enviado desde TreeBankAPP`)
  }

	return (
		<View style={styles.container}>
			{
				<>
        <View style={styles.heading}>
        <Icon.Button
        name="arrow-left"
        size={25}
        color="black"
        backgroundColor="transparent"
        onPress={() => changeScreen('prod')}
        />
        <Headline>Mis cuentas...</Headline>
        </View>
        <View style={styles.logo}>
        <ImageBackground
        style={{width:140,height:140}}
        source={require('../assets/LogoVector.png')}
        >
        </ImageBackground>
        </View>
					<View style={styles.balance}>
						<ScrollView
							horizontal={true}
							pagingEnabled={true}
							showsHorizontalScrollIndicator={false}
							decelerationRate='fast'
							style={styles.scroll}
						>
							<View>
								<ImageBackground
									source={require('../assets/backgroundCard1.jpeg')}
									style={styles.mainCard}
									imageStyle={{ borderRadius: 15 }}>
                  <View style={styles.cont}>
                    <View>
                      <Text style={{
                        color:'white',
                        fontSize:24
                        }}>
                          Cuenta en pesos
                      </Text>
                    </View>
                  <View>
                      <Text style={{alignItems:'center',
                      width:254,
                      margin:6,
                      height:48,
                      color:'white',
                      fontSize:20,
                      backgroundColor: '#006A34',
                      borderRadius: 12,
                      opacity:0.8,
                      }}>{` ${cvu}`}</Text>
                  </View>
                  <View style={styles.row}>
                      <Paragraph style={styles.cardText}>{`${firstName} ${lastName}`}</Paragraph>
                      <View style={styles.botonCompartir}>
                      <Button
                      onPress={handldeWhatsAppPress}
                      style={styles.iconButtons}>
                      <Icon name="whatsapp" size={28} color="#fff" />
                      </Button>
                      <Paragraph style={{fontWeight: '700'}}>Compartir</Paragraph>
                      </View>
                      
                    </View>
                  </View>
								</ImageBackground>
				 	   		</View>
                  
			      		<View>
								<ImageBackground
									source={require('../assets/backgroundCard2.jpeg')}
									style={styles.mainCard}
									imageStyle={{ borderRadius: 15 }}
                  >
                  <View style={styles.cont}>
                    <View>
                      <Text style={{
                        color:'white',
                        fontSize:24
                        }}>
                          Cuenta en dólares
                      </Text>
                    </View>
                  <View>
                      <Text style={{alignItems:'center',
                      width:254,
                      margin:6,
                      height:48,
                      color:'white',
                      fontSize:20,
                      backgroundColor: '#006A34',
                      borderRadius: 12,
                      opacity:0.8,
                      }}>{` ${cvuUS}`}</Text>
                  </View>
                  <View style={styles.row}>
                      <Paragraph style={styles.cardText}>{`${firstName} ${lastName}`}</Paragraph>
                      <View style={styles.botonCompartir}>
                      <Button
                      onPress={handldeWhatsAppPressUS}
                      style={styles.iconButtons}>
                      <Icon name="whatsapp" size={28} color="#fff" />
                      </Button>
                      <Paragraph style={{fontWeight: '700'}}>Compartir</Paragraph>
                      </View>
                      
                    </View>
                  </View>
								</ImageBackground>
							</View>
						</ScrollView>
					</View>
				</>
			}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
 		padding: 20,

  	},
    logo: {
       alignItems:'center',
       marginTop:30,
       marginBottom:'10%'
    },
    cont: {
      height: '100%',
      display: 'flex',
      justifyContent: 'space-around'
    },
    heading: {
      marginBottom: '2%',
    marginTop: '2%',
 		fontSize: 35,
		alignItems : 'center',
		display: 'flex',
		flexDirection: 'row'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  botonCompartir: {
    display: 'flex',
		alignItems: 'center',

  },
  iconButtons: {
    backgroundColor: '#006A34',
    marginBottom: 5,
    borderRadius: 16,
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    width:50,
    height:42,
  },
 	mainCard: {
 		width: 320,
 		height: 200,
 		padding: 10,
 		borderRadius: 20,
 		marginTop: 10,
 		marginBottom: 10,
 		marginRight: 10
  	},
  	white: {
 		color: "white"
  	},
  	cardInfo: {
		marginTop: 15,
		marginLeft: 15
  	},
  	scroll: {
		height: 215,
		width: "100%"
  	},
	sideBar: {
		backgroundColor: '#FFFF',
		width: '60%',
		height: '100%',
		padding: 10
	},
  cardText: {
		fontSize: 17,
		color: '#F7F7F9',
		letterSpacing: 1,
		fontWeight: '300'
	},
});
