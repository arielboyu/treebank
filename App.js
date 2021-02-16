import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
/* import dotenv from "react-native-dotenv"; */
import IP from './src/redux/actions/ip';
import axios from 'axios';


import store from './src/redux/Index';
import Index from './Index';

/* dotenv.config();
 */
axios.defaults.baseURL = `https://bank-tree.herokuapp.com` || `http://${IP}:3001`;

export default function App() {

	return (
	<Provider store={store}>
		<PaperProvider>
      		<Index/>
	  	</PaperProvider>
    </Provider>
	);
}
