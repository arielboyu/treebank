import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AuthContext } from './src/components/context';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';


import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
//Navigation
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { LogBox } from "react-native"

//Componentes/Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Main from './src/components/Main';
import ProductsScreen from './screens/ProductsScreen'
import TransactionsScreen from './screens/TransactionsScreen'
import StatisticsScreen from './screens/StatisticsScreen'
import Contacts from './screens/Contacts'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import DischargeScreen from './screens/DischargeScreen';
import Icon from 'react-native-vector-icons/AntDesign'
import VerifyScrenn from './screens/VerifyScrenn'
import { cos } from 'react-native-reanimated';
import CvuScreen from './screens/CvuScreen'
import CardsScreen from './screens/CardsScreen'
import FingerPrint from './screens/FingerPrintScreen';


LogBox.ignoreAllLogs(true)




const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Index = () => {
    const user = useSelector(state => state.user);
    const logged = user.user.logged;

    useEffect(() => {
      getStoredUser()
    }, []);


const [isDarkTheme, setIsDarkTheme] = React.useState(false);


     // Trae el usuario guardado en asyncStorage, en forma de objeto.
     const getStoredUser = async () => {
      try {
        const jsonData = await AsyncStorage.getItem('USER')
        console.log("JSON DATA ", jsonData)
        return jsonData != null ? JSON.parse(jsonData) : null;

      } catch(e) {
        // error reading value
      }
    }

    const CustomDefaultTheme = {
      ...NavigationDefaultTheme,
      ...PaperDefaultTheme,
      colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        background: '#ffffff',
          text: '#333333'
      }
    }

    const CustomDarkTheme = {
      ...NavigationDarkTheme,
      ...PaperDarkTheme,
      colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        background: '#333333',
        text: '#ffffff'
      }
    }

    const authContext = React.useMemo(() => ({
      toggleTheme: () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme );
      }
    }), []);


const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

	return (
        <>
            {logged
            //Si esta logueado
            ?
            <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={theme} >
                <Tab.Navigator
                initialRouteName="Inicio"
                activeColor="#fff"
                tabBarOptions={{
                    style: {backgroundColor: '#fff'},
                    keyboardHidesTabBar: true
                }}
                >
                    <Tab.Screen
                        name="Inicio"
                        component={Main}

                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon
                                    name="home"
                                    color={color}
                                    size={23}
                                />
                            ),
                            tabBarColor: "#5FA743"
                        }}
                    />
                    <Tab.Screen
                        name="Transacciones"
                        component={TransactionsScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon
                                    name="swap"
                                    color={color}
                                    size={23}
                                />
                            ),
                            tabBarColor: "#006A34"
                        }}
                    />
                    <Tab.Screen
                        name="Estadísticas"
                        component={StatisticsScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon
                                    name="linechart"
                                    color={color}
                                    size={23}
                                />
                            ),
                            tabBarColor: "#007f5f"
                        }}
                    />

                <Tab.Screen
                    name="Productos"
                    component={ProductsScreen}

                    options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                        name="wallet"
                        color={color}
                        size={23}
                        />
                    ),
                    tabBarColor: "#279152"
                    }}

                />
                </Tab.Navigator>

            </NavigationContainer>
            </AuthContext.Provider>
            </PaperProvider>

            //Si no esta logueado
            : <NavigationContainer>
                <Stack.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor: '#FFFF',
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                    }}>
                    <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title:'Inicio'}}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{title:'Iniciar Sesión'}}
                    />
                    <Stack.Screen
                        name="DischargeScreen"
                        component={DischargeScreen}
                        options={{title:'Cargar Datos'}}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{title:'Registrarse'}}
                    />
                    <Stack.Screen
                        name="VerifyScrenn"
                        component={VerifyScrenn}
                        options={{title:'Verificacion'}}
                    />
                         <Stack.Screen
                        name="FingerPrint"
                        component={FingerPrint}
                        options={{title:'FingerPrint'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            }

        </>
    );
};

export default Index;
