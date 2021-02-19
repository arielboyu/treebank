import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import logo from '../assets/LogoVector.png';
import { createAccount, dischargeNewUser, getUsers } from '../src/redux/actions/user';
import { TextInput, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function dischargeScreen({ navigation, user }) {
	const userId = useSelector((state) => state.user.user.id);
	//const userId = 1;
	let today = new Date();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	},[]);

	const [ data, setData ] = useState({
		form : {
			id              : userId,
			typeID          : 'DNI',
			document_number : '',
			first_name      : '',
			last_name       : '',
			prefix_code     : '+54',
			country         : 'Argentina',
			phone_number    : '',
			birthday_date   : ''
		}
		/* check_TextInputChange : {
			typeID          : false,
			document_number : false,
			first_name      : false,
			last_name       : false,
			prefix_code     : false,
			number          : false,
			birthday_date            : false
		},
		secureTextEntry       : true,
		isValidUser           : true,
		isValidPassword       : true */
	});

	const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);
	const [ selectedImage, setSelectedImage ] = useState(null);

	/* Selección Imagen*/
	let openImgPictureAsync = async () => {
		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert('Los permisos de Acceso a us archivos son requeridos');
			return;
		}

		const pickerResult = await ImagePicker.launchImageLibraryAsync();

		if (pickerResult.cancelled === true) return;

		setSelectedImage({ localUri: pickerResult.uri });
	};

	const handleChange = (val) => {
		let newCountry;
		if (val.type === 'prefix_code') {
			if (val.value === '+54') newCountry = 'Argentina';
			if (val.value === '+57') newCountry = 'Colombia';
			setData({
				...data,
				form : {
					...data.form,
					[val.type]: val.value,
					['country'] : newCountry
				}
			});
		} else {
			setData({
				...data,
				form : {
					...data.form,
					[val.type]: val.value
				}
			});
		}
		//console.log('Data', data);
	};

	const onChangeDate = (e) => {
		setData({
			...data,
			form : {
				...data.form,
				['birthday_date'] : e.target.value
			}
		});
	};

	const setUpdateUser = (updateUser) => {
		let today = new Date();
		var fechaNace = new Date(data.form.birthday_date);
		let age = Math.floor((today - fechaNace) / (1000 * 60 * 60 * 24) / 365);
		if (age >= 16) {
			//console.log('Screen', updateUser);
			dispatch(dischargeNewUser(updateUser));
      dispatch(createAccount(updateUser));
			navigation.navigate('LoginScreen');
		} else {
			alert('Debes ser Mayor de 16 años para poder registrate');
		}
	};

	const showDatePicker = () => {
		setDatePickerVisibility(!isDatePickerVisible);
	};

	const handleConfirm = (date) => {
		//console.warn('A date has been picked: ', date);
		let today = new Date();
		let age = Math.floor((today - date) / (1000 * 60 * 60 * 24) / 365);
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yy = date.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}
		const newDate = yy + '-' + mm + '-' + dd;
		if (age >= 16) {
			setData({
				...data,
				form : {
					...data.form,
					['birthday_date'] : newDate
				}
			});
			showDatePicker();
		} else {
			alert('Debes ser Mayor de 16 años, Selecciona otra fecha');
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				style={{width:380,
				height: 380,
				opacity:0.9,
				
				}}
				source=
					{require('../assets/LogoVector.png')}
			>
				
				<View style={styles.imageaction}>
					<TouchableOpacity style={styles.button_image} onPress={openImgPictureAsync}>
						<Image
							source={{
								uri : selectedImage !== null ? selectedImage.localUri : 'https://picsum.photos/200/200'
							}}
							style={styles.image}
						/>
					</TouchableOpacity>
				</View>
				<View style={{paddingLeft: '5%'}}>
					<View>
						<Picker
							style={{
								color:'black',
								width:60
							}}
							selectedValue={data.form.typeID}
							onValueChange={(val) => handleChange({ value: val, type: 'typeID' })}>
							<Picker.Item label="DNI" value="DNI" />
							<Picker.Item label="PAS" value="PASAPORTE" />
						</Picker>
						<Picker
							selectedValue={data.form.prefix_code}
							style={{
								color:'black',
								marginTop:'28%',
								width:60,
							}}
							onValueChange={(val) => handleChange({ value: val, type: 'prefix_code' })}>
							<Picker.Item label="+54" value="+54" />
							<Picker.Item label="+57" value="+57" />
						</Picker>
					</View>
					<View style={styles.form}>
					<View />

							<TextInput
								style={{
									height      : 45,
									color       : 'black',
									backgroundColor:'transparent'
								}}
								placeholder="Número "
								placeholderTextColor="black"
								keyboardType="decimal-pad"
								onChangeText={(val) => handleChange({ value: val, type: 'document_number' })}
							/>
						<TextInput
							style={{
								height      : 45,
								color       : 'black',
								paddingLeft : 5,
								marginTop   : 2,
								backgroundColor:'transparent'
							}}
							placeholder="Nombres"
							placeholderTextColor="black"
							autoCapitalize="none"
							onChangeText={(val) => handleChange({ value: val, type: 'first_name' })}
						/>
						<TextInput
							placeholder="Apellidos"
							placeholderTextColor="black"
							style={{
								height      : 45,
								paddingLeft : 5,
								backgroundColor:'transparent'
							}}
							autoCapitalize="none"
							onChangeText={(val) => handleChange({ value: val, type: 'last_name' })}
						/>
							<TextInput
								placeholder="Télefono"
								placeholderTextColor="black"
								style={{
									height:45,
									paddingLeft:5,
									backgroundColor:'transparent',
								}}
								keyboardType="decimal-pad"
								onChangeText={(val) => handleChange({ value: val, type: 'phone_number' })}
							/>
						{Platform.OS === 'web' ? (
							<input
								type="date"
								placeholder="Fecha de nacimiento"
								style={{
									height      : 45,
									paddingLeft : 5,
									marginTop   : 2,
									fontSize    : 11,
									width: 219,
									backgroundColor: 'transparent',
									borderWidth: 0,
									borderBottomWidth: 1
								}}
								onChange={onChangeDate}
							/>
						) : (
							<TextInput
								placeholder="Fecha de nacimiento"
								placeholderTextColor="black"
								style={{
									height      : 45,
								paddingLeft : 5,
								marginTop   : 2,
								backgroundColor:'transparent',
								
								}}
								autoCapitalize="none"
								//onSubmitEditing={showDatePicker}
								onFocus={showDatePicker}
								value={data.form.birthday_date}
								onChangeText={(val) => handleChange({ value: val, type: 'birthday_date' })}
							/>
						)}
						{/* <FontAwesome name="user-o" color="#05375a" size={20} /> */}
						<View>
							<DateTimePickerModal
								isVisible={isDatePickerVisible}
								mode="date"
								onConfirm={handleConfirm}
								onCancel={showDatePicker}
							/>
						</View>
					<Animatable.View animation="fadeInLeft">
						<Text style={styles.errorMsg}>Para registrarte debes ser mayor a 16 años</Text>
					</Animatable.View>
				</View>
			</View>
			<View style={styles.logo}>
				<FontAwesome
					name="camera"
					color="black"
					size={25}
				/>
			</View>
			</ImageBackground>
			<View style={styles.guardar}>
				<Button
					mode="outlined"
					style={{
						backgroundColor : '#006A34'
					}}
					color="white"
					onPress={() => {
						setUpdateUser(data.form);
					}}>
					GUARDAR
				</Button>
			</View>
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex            : 1,
		backgroundColor : '#FFFF',
		alignItems:'center'
	},
	formCont: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: '10%',
		marginLeft: '5%'
	},

	imageaction  : {
		display:  'flex',
		marginTop: '10%',
		marginBottom: '10%'

	},
	logo: {
		alignItems:'center',
		marginTop:'-160%'
	},
	image        : {
		height       : 100,
		width        : 100,
		borderRadius : 100,
		resizeMode   : 'contain'
	},
	pickers: {
		
	},
	button_image : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	},
	errorMsg     : {
		fontSize : 10,
		color    : 'red',
		marginTop:'2%'
	},
	guardar      : {
		display:  'flex',
		marginTop: '10%'
	},

	form         : {
  alignItems:'center',
	marginTop:'-46%'

},
	nro          : {
		borderRadius : 60,
		width        : 200,
	},
	nombres      : {
		borderRadius : 60,
		width        : 200,
		marginTop    : 5
	},
	apellidos    : {
		borderRadius : 60,
		width        : 200,
		marginTop    : 5
	},
	telefono     : {
		borderRadius : 60,
		width        : 200,
	},
	fecha        : {
		borderRadius : 60,
		width        : 203,
		height       : 40,
		marginTop    : 5
	}
});
