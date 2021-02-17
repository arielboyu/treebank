import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground,Headline, TouchableOpacity, Platform,Divider } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import logo from '../assets/LogoVector.png';
import { createAccount, dischargeNewUser, getUsers } from '../src/redux/actions/user';
import { TextInput, Button,Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function userDataScreen({changeScreen}) {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const { firstName, lastName,mobile,email } = user.loggedUser
	const cvu = user.loggedUser.accounts[0].cvu
	const cvuUS = user.loggedUser.accounts[1].cvuUS
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
		<Text style={{fontSize:20}} >	<Entypo
			name="user"
			size={20}
			color="black"
			backgroundColor="#FFFF"
			/>  Mis Datos</Text>
		</View>
			<View style={styles.imagenview} />
			<View style={styles.imageaction}>
				<TouchableOpacity style={styles.button_image} onPress={openImgPictureAsync}>
					<Image
						source={{
							uri : selectedImage !== null ? selectedImage.localUri : 'https://picsum.photos/200/200'
						}}
						style={styles.image}
					/>
				</TouchableOpacity>
				<FontAwesome
					name="camera-retro"
					color="black"
					size={20}
					style={{
						position:'relative',
						top:40,
						left:20
					}}
				/>
				<Button	Size={10}	style={{marginTop:60,marginLeft:-38,
				}}>cambiar</Button>
			</View>
			<View style={styles.label} >
			<FontAwesome
			 name="user-o"
			 size={28}
			 />
			 <Text style={{paddingLeft:40,fontSize:20}}>{"  "}{`${firstName} ${lastName}`}</Text>
			 </View>
			 <View style={styles.label}>
			 <FontAwesome
				name="phone"
				size={28}
				/>
				<Text style={{paddingLeft:40,fontSize:20}}>{"  "}{`${mobile}`}</Text>
				</View>
				<View style={styles.label} >
				<Entypo
				 name="email"
				 size={28}
				 />
				 <Text style={{paddingLeft:40,fontSize:18}}>{"  "}{`${email}`}</Text>
				 </View>
				<View style={styles.label} >
				<FontAwesome
				 name="id-card"
				 size={28}
				 />
				 <Text style={{paddingLeft:20,fontSize:18}}>{"  "}{cvu}</Text>
				 </View>
				 <View style={styles.label} >
				 <FontAwesome5
					name="file-invoice-dollar"
					size={28}
					/>
					<Text style={{paddingLeft:20,fontSize:18}}>{"  "}{cvuUS}</Text>
					</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container    : {
		flex            : 1,
	},

	imageaction  : {
		flexDirection : 'row',
		position      : 'relative',
		top           : 40,
		left          : 145,
		width         : 120
	},
	image        : {
		height       : 100,
		width        : 100,
		borderRadius : 100,
		resizeMode   : 'contain'
	},
	label: {
		flexDirection : 'row',
		marginTop:130,
		marginBottom:-80,
		marginLeft:40
	}
});
