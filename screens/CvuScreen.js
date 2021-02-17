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
        <Headline>Mis cuentas</Headline>
        </View>
        <View style={styles.logo}>
        <ImageBackground
        style={{width:220,height:220}}
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
									<View>
                  <Text style={{alignItems:'center',
                  width:250,
                  marginTop:26,
                  height:36,
                  marginLeft:10,
                  color:'white',fontSize:24
                }}>CVU - Cuenta Pesos</Text>
										<Text style={{alignItems:'center',
                    width:254,
              			marginTop:6,
                    height:48,
              			marginLeft:10,
                    color:'white',
                    fontSize:20,
                    backgroundColor: '#006A34',
                    borderRadius: 12,
                    opacity:0.8,
                    }}>{` ${cvu}`}</Text>
                    <View style={styles.botonCompartir}>
                    <View>
                    <Button
                     onPress={handldeWhatsAppPress}
                     style={styles.iconButtons}>
                    <Icon name="whatsapp" size={28} color="#fff" />
                    </Button>
                    <Paragraph style={{fontWeight: '700',marginLeft:14,marginTop:-10,fontSize:12}}>Compartir</Paragraph>
                    </View>
                    </View>
									</View>
									<View style={styles.cardInfo}>
										<Paragraph style={{alignItems:'center',
                    width:220,
              			marginTop:-60,
                    height:36,
              			marginLeft:-10,
                    fontSize:20,
                    color:'white'
                    }}>{`${firstName} ${lastName}`}</Paragraph>
									</View>
								</ImageBackground>
				 	   		</View>
			      		<View>
								<ImageBackground
									source={require('../assets/backgroundCard2.jpeg')}
									style={styles.mainCard}
									imageStyle={{ borderRadius: 15 }}
                  >
                  <View>
                  <Text style={{alignItems:'center',
                  width:250,
                  marginTop:26,
                  height:36,
                  marginLeft:10,
                  color:'white',fontSize:24
                }}>CVU - Cuenta Dolares</Text>
                    <Text style={{alignItems:'center',
                    width:254,
                    marginTop:6,
                    height:48,
                    marginLeft:10,
                    color:'white',
                    fontSize:20,
                    backgroundColor: '#006A34',
                    borderRadius: 12,
                    opacity:0.8,
                  }}>{` ${cvuUS}`}</Text>
                  <View style={styles.botonCompartir}>
                  <View>
                  <Button
                   onPress={handldeWhatsAppPressUS}
                   style={styles.iconButtons}>
                  <Icon name="whatsapp" size={28} color="#fff" />
                  </Button>
                  <Paragraph style={{fontWeight: '700',marginLeft:14,marginTop:-10,fontSize:12}}>Compartir</Paragraph>
                  </View>
                  </View>
                  </View>
                  <View style={styles.cardInfo}>
                    <Paragraph style={{alignItems:'center',
                    width:220,
                    marginTop:-60,
                    height:36,
                    marginLeft:-10,
                    fontSize:20,
                    color:'white'
                    }}>{`${firstName} ${lastName}`}</Paragraph>
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
       marginTop:40,
       marginBottom:10
    },
    heading: {
      marginBottom: 10,
      marginTop: 10,
      fontSize: 35,
      alignItems : 'center',
      display: 'flex',
      flexDirection: 'row',
      marginLeft:10
  },
  botonCompartir: {
     alignItems:'center',
     marginTop:-6,
     marginLeft:200

  },
  iconButtons: {
    backgroundColor: '#006A34',
    marginBottom: 10,
    borderRadius: 16,
    marginTop: 25,
    width:50,
    height:42,
    marginLeft:12
  },
 	mainCard: {
 		width: 310,
 		height: 190,
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
		height: 200,
		width: "100%"
  	},
	sideBar: {
		backgroundColor: '#FFFF',
		width: '60%',
		height: '100%',
		padding: 10
	}
});
