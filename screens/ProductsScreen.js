import React,{useState} from 'react';
import { View, ImageBackground, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { Headline } from 'react-native-paper';
import Header from '../src/components/Header';
import CvuScreen from './CvuScreen'
import CardsScreen from './CardsScreen'



const ProductsScreen = () => {
	const [screen,setScreen] = useState('prod')
	const changeScreen = (data) => {
			setScreen(data)
	}
	return (
		 <>

		 {
				 screen === "card" && <CardsScreen
						 changeScreen={changeScreen}
				 />
		 }
		 {
				 screen === "cvu" && <CvuScreen
						 changeScreen={changeScreen}
				 />
		 }
		{
			screen === 'prod' &&
		<View style={styles.container}>
			<Header title="Mis productos..."/>
      <View style={{height: '100%'}}>
        <TouchableOpacity
				onPress={() => changeScreen('card')}
				style={[styles.btnCard, styles.darkGreen]}>
          <Text style={styles.cardText}>
            Mis tarjetas
          </Text>
          <ImageBackground
            style={styles.images}
            source={require('../assets/MyCards.png')}
          />
        	</TouchableOpacity>
        <TouchableOpacity
			   onPress={() => changeScreen('cvu')}
				 style={[styles.btnCard, styles.lightGreen]}>
          <Text style={styles.cardText}>
            Mis cuentas
          </Text>
          <ImageBackground
            style={styles.images}
            source={require('../assets/MyAccounts.png')}
          />
        </TouchableOpacity>
      </View>
		</View>
  	}
	</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
 		padding: 20,

  },
  container2: {
    height: '90%',
    justifyContent: 'space-evenly'
  },
  header: {
		display: "flex",
 		alignItems: "flex-start",
 		width: "100%",
    marginBottom: 10,
    marginTop: 10,
 		fontSize: 35
  },
  btnCard: {
    width: '100%',
    height: '42%',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.50,
    shadowRadius: 10,
    elevation: 15,
  },
  cardText: {
     fontWeight: '500',
     fontSize: 25,
     color: '#ffbf34'
  },
  images: {
    width: 196,
    height: 136,
    position: 'relative',
    bottom: -6,
    right: -95
  },
  lightGreen: {
    backgroundColor: '#5DB11F'
  },
  darkGreen: {
    backgroundColor: '#097934'
  }
});

export default ProductsScreen;
