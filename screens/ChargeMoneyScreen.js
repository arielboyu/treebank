import React, { useState, useEffect } from 'react';
import {
	ImageBackground,
	Image,
	StyleSheet,
	Text,
	View,
	Modal,
	ActivityIndicator,
	Platform,
	Alert,
	ScrollView
} from 'react-native';
import { Button, Divider, Headline, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logo from '../assets/logo.png';
import { getUserByID, getUsers } from '../src/redux/actions/user';
import axios from 'axios';
import IP from '../src/redux/actions/ip';

export default function ChargeMoneyScreen({ changeScreen, navigation}) {
	
	const userAccount = '88333 44526';

	const dispatch = useDispatch();
  const user = useSelector(state => state.user)
	useEffect(() => {
		dispatch(getUsers());
    dispatch(getUserByID(user.user.id.id));
	}, []);




  const chargeMoney = () => {
    return async () => {
      try {
        const res = await axios.post(`/movement/carga/1`);
        const res1 = await axios.put(`/account/recarga/2`)
        transfer();

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  };

	const [ visible, setVisible ] = useState(false);
	const [ visibleButton, setVisibleButton ] = useState(false);
	const [ animation, setAnimation ] = useState(true);
	const [ movement, setMovement ] = useState('Procesando Recarga....');
	const [ account, setAccount ] = useState(userAccount);

	const transfer = () => {
    
		setVisible(true);
		setVisibleButton(false);
		setMovement('Procesando Recarga....');
		setTimeout(() => {
      
			setMovement('Recarga Exitosa');
			setAnimation(false);
			setVisibleButton(true);
		}, 3000);
		/* setTimeout(() => {
			setVisible('false');
		}, 4000) */
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
				<Headline>Cargar Dinero</Headline>
			</View>
			<ScrollView>
				<View style={styles.logo}>
					<ImageBackground style={{ width: 160, height: 160 }} source={require('../assets/LogoVector.png')} />
				</View>
				<View>
					<Text style={{ width: 120, position: 'relative', top: 5, left: 120 }}>
						Puedes usar este código para cargar dinero a tu cuenta
					</Text>
				</View>
				<View
					style={{
						alignItems      : 'center',
						backgroundColor : '#006A34',
						width           : 150,
						position        : 'relative',
						top             : 20,
						left            : 100,
						height          : 36
					}}>
					<Divider />
					<Divider />
					<Headline style={{ color: 'white' }}>{account}</Headline>
				</View>
				<View style={{ position: 'relative', top: 50, left: 20 }}>
					<ImageBackground
						style={{ width: 30, height: 30, position: 'relative', left: 135, top: -20 }}
						source={require('../assets/pagofacil.png')}
					/>
					<ImageBackground
						style={{ width: 120, height: 30, position: 'relative', left: 90, top: -20 }}
						source={require('../assets/rapi.png')}
					/>
					<Text style={{ width: 150, position: 'relative', left: 90, top: -20 }}>
						Para cargar presenta este código al cajero{' '}
					</Text>
				</View>
				<View style={{ position: 'relative', top: 50 }}>
					<Divider />
					<Divider />
				</View>
				<View style={styles.boton}>
					<View>
						<Button style={styles.iconButtons} onPress={ chargeMoney()}>
							<Icon name="donate" size={30} color="#fff" />
						</Button>
						<Paragraph style={{ fontWeight: '700' }}>Confirmar Recarga</Paragraph>
					</View>
				</View>
				{Platform.OS !== 'web' ? (
					<Modal
						visible={visible}
						onRequestClose={() => {
							Alert.alert('Debes esperar a Finalizar el proceso');
						}}>
						<View style={styles.centeredView}>
							<View style={styles.logo}>
								<ImageBackground
									style={{ width: 160, height: 160 }}
									source={require('../assets/LogoVector.png')}
								/>
							</View>
							<Paragraph style={{ fontWeight: '700', marginBottom: 15, textAlign: 'center' }}>
								{movement}
							</Paragraph>
							{visibleButton ? (
								<Button
									mode="contained"
									onPress={() => changeScreen("main") }
									style={{
										backgroundColor : '#006A34',
										width           : 150
									}}>
									Ver Saldo
								</Button>
							) : null}
							<ActivityIndicator animating={animation} size="large" color="#097934" />
						</View>
					</Modal>
				) : (
					<h1>En Construccion</h1>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container    : {
		flex            : 1,
		padding         : 20,
		backgroundColor : '#FFFF'
	},
	logo         : {
		alignItems : 'center',
		marginTop  : 30
	},
	boton        : {
		alignItems : 'center',
		marginTop  : 40
	},
	iconButtons  : {
		backgroundColor : '#006A34',
		marginBottom    : 10,
		borderRadius    : 20,
		marginTop       : 25,
		width           : 15,
		marginLeft      : 25
	},
	heading      : {
		marginBottom  : 10,
		marginTop     : 10,
		fontSize      : 35,
		alignItems    : 'center',
		display       : 'flex',
		flexDirection : 'row'
	},
	centeredView : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center',
		marginTop      : 22
	},
	modalView    : {
		margin       : 20,
		//backgroundColor : 'white',
		borderRadius : 20,
		padding      : 35,
		alignItems   : 'center',
		/* shadowColor   : '#000',
		shadowOffset  : {
			width  : 0,
			height : 2
		},
		shadowOpacity : 0.25,
		shadowRadius  : 3.84, */
		elevation    : 5
	}
});
