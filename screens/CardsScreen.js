import React from 'react';
import { ImageBackground,Image, StyleSheet, Text, View } from 'react-native';
import { Divider, Headline, Paragraph,TextInput, Button, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import logo from '../assets/logo.png'
import Transfer from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CardsScreen({changeScreen}) {
	return (
    <View style={styles.container}>
    <View style={styles.heading}>
    <Icon.Button
		name="arrow-left"
		size={25}
		color="black"
		backgroundColor="transparent"
		onPress={() => changeScreen('prod')}
		/>
    <Headline>Mis tarjetas</Headline>
    </View>
    <View style={styles.logo}>
    <ImageBackground
    style={{width:80,height:80}}
    source={require('../assets/LogoVector.png')}
    >
    </ImageBackground>
    </View>
		<View>
		<ImageBackground
		source={require('../assets/backgroundCard2.jpeg')}
		style={styles.mainCard}
		imageStyle={{ borderRadius: 15 }}>
		</ImageBackground>
		</View>
			<View style={{alignItems:'center',
      width:320,
      marginTop:-166,
			marginLeft:-80,
      height:36,
      }}>
		  </View>
			<View style={{alignItems:'center',
      width:250,
      marginTop:10,
      height:36,
			marginLeft:10,
      }}>
			<Headline style={{color:'white',fontSize:20}}>4322 3663 5456 2234</Headline>
		  </View>
      <View style={{alignItems:'center',
      width:220,
			marginTop:16,
      height:26,
      }}>
      <Headline style={{color:'white'}}>Valentín</Headline>
      </View>
      <View style={{marginTop:26,
      }}>
      <View>
      <View style={{marginTop:106,}} >
      <Divider/>
      <Divider/>
      </View>
      </View>
      </View>
      <View style={styles.botonRecargar}>
      <View>
      <Button style={styles.iconButtons}>
      <Icon name="donate" size={30} color="#fff" />
      </Button>
      <Paragraph style={{fontWeight: '700',marginLeft:14}}>Recargar</Paragraph>
      </View>
      </View>
			<View style={styles.botonMandar}>
			<View>
			<Button style={styles.iconButtons}>
			<Transfer name="arrow-right-bold-hexagon-outline" size={30} color="#fff" />
			</Button>
			<Paragraph style={{fontWeight: '700',marginLeft:18}}>Mandar</Paragraph>
			</View>
			</View>
      <View style={styles.botonestadísticas}>
			<View>
			<Button style={styles.iconButtons}>
			<Transfer name="chart-line" size={30} color="#fff" />
			</Button>
			<Paragraph style={{fontWeight: '700',marginLeft:4}}>Estadísticas</Paragraph>
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
logo: {
   alignItems:'center',
   marginTop:20,
},
mainCard: {
	width: 310,
	height: 190,
	padding: 10,
	borderRadius: 20,
	marginTop: 40,
	marginBottom: 10,
	marginLeft: 30
	},
botonRecargar: {
   alignItems:'center',
   marginTop:45,
   marginLeft:-260
},
botonMandar: {
   alignItems:'center',
   marginTop:-110,
   marginLeft:-20
},
botonestadísticas: {
   alignItems:'center',
   marginTop:-110,
   marginLeft:230
},
iconButtons: {
  backgroundColor: '#006A34',
  marginBottom: 10,
  borderRadius: 20,
  marginTop: 25,
  width:15,
  marginLeft:12
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
