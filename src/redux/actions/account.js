import axios from 'axios';

import { 
	GET_ALL_MOVEMENTS,
	GET_ACCOUNT_BY_ID,
	GET_ALL_ACCOUNTS
} from '../constants/index'

import IP from './ip';

const getAccount = (account) => {
	return {
		type: GET_ACCOUNT_BY_ID,
		account
	};
};

const getMovements = (movement) => {
	return {
		type: GET_ALL_MOVEMENTS,
		movement
	};
};

const getAccounts = (account) => {
	return {
		type: GET_ALL_ACCOUNTS,
		account
	};
};

export const getOneAccount = (email) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(`/account/${email}`);
			dispatch(getAccount(res.data));
		} catch (err) {
			console.log(err);
		}
	};
};

export const getAllAccounts = (email) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(`/account/all/${email}`);
			dispatch(getAccounts(res.data));
		} catch (err) {
			console.log(err);
		}
	};
}

export const getAllMovements = (id) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(`/movement/${id}`);
			dispatch(getMovements(res.data));
		} catch (err) {
			console.log(err);
		}
	};
};

export const changeMoney = (data) => { //type: venta o compra
	const { amount, email, type } = data
	return async () => {
		try {
			const res = await axios.get(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`);
			const cotizacion = res.data[0].casa[type].replace(',', '.') //Valor del cambio actual para venta o compra
			axios.put(`/account/cambio/${cotizacion}/${type}/${amount}/${email}`);
		} catch (err) {
			console.log(err);
		}
	};
};
