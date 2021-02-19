import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { Headline, Paragraph, Button, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux'
import Transfer from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CardsScreen({changeScreen}) {

  const user = useSelector(state => state.user);

  const { firstName, lastName } = user.loggedUser;

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
        <Headline>Mis tarjetas...</Headline>
      </View>
    <View style={styles.center}>
      <View style={styles.logo}>
        <ImageBackground
          style={{width:140, height:140}}
          source={require('../assets/LogoVector.png')}
        />
      </View>
      <ImageBackground
        source={require('../assets/backgroundCard2.jpeg')}
        style={styles.mainCard}
        imageStyle={{ borderRadius: 15 }}
      >
        <Paragraph style={styles.cardText}>{`${firstName} ${lastName}`}</Paragraph>
        <Paragraph style={styles.cardText}>4322 3663 5456 2234</Paragraph>
      </ImageBackground>
        <View style={styles.generalCont2}>
          <View style={styles.center}>
            <Button
              style={styles.iconButtons}
              
            >
              <Icon name="donate" size={30} color="#fff" />
            </Button>
            <Paragraph style={styles.buttonDesc}>Cargar</Paragraph>
          </View>
          <View style={styles.center}>
            <Button
              style={styles.iconButtons}
              
            >
              <Icon name="chart-line" size={30} color="#fff" />
            </Button>
            <Paragraph style={styles.buttonDesc}>Estadísticas</Paragraph>
          </View>
          <View style={styles.center}>
            <Button
              style={styles.iconButtons}
              
            >
              <Transfer name="send" size={30} color="#fff" />
            </Button>
            <Paragraph style={styles.buttonDesc}>Enviar</Paragraph>
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
logo: {
   alignItems: 'center',
   marginTop: '5%',
},
mainCard: {
	width: 310,
	height: 190,
	padding: 10,
  display: 'flex',
  justifyContent: 'flex-end',
	borderRadius: 20,
	margin: '5%'
	},
  generalCont2: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-around",
		width: "100%",
	 },
   cardText: {
		fontSize: 17,
		color: '#F7F7F9',
		letterSpacing: 1,
		fontWeight: '300'
	},
iconButtons: {
  backgroundColor: '#097934',
	marginBottom: 12,
	borderRadius: 20,
	marginTop: 25
},
center: {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
},
buttonDesc: {
  fontWeight: '700'
},
  heading: {
    marginBottom: '2%',
    marginTop: '2%',
 		fontSize: 35,
		alignItems : 'center',
		display: 'flex',
		flexDirection: 'row'
}
});
