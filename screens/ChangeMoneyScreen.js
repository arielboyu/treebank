import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Headline, Paragraph,TextInput, Button, Snackbar, Dialog, Portal, } from 'react-native-paper';
import { ButtonGroup } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { changeMoney, getAllMovements } from '../src/redux/actions/account';

export default function ChangeMoney ({changeScreen}) {

    const [selected, setSelected] = useState(0)
    const [amount, setAmount] = useState("")
    const [visible, setVisible] = useState()
    const [visible1, setVisible1] = useState()
    const [visible2, setVisible2] = useState()
    const [visible3, setVisible3] = useState()

    const dispatch = useDispatch()

    const user = useSelector(state => state.user);

    const updateSelected = (selected) => {
        setSelected(selected);
    }

    const data = {
        type: selected === 0 ? 'compra' :'venta',
        amount,
        email: user.user.id.email
    }

    const onSubmit = () => {
        if (amount === '') {
            setVisible1(true)
        }
        else if (user.loggedUser.accounts[selected].balance >= amount) {
            setVisible2(true)
        } else {
            setVisible2(true)
        }
    }

    const change = () => {
        dispatch(changeMoney(data))
        //setAmount('')
        setVisible2(false)
        setVisible3(true)
    }

	return (
        <View style={styles.container}>
            <Portal>
                <Dialog
                    visible={visible2}
                    onDismiss={() => {setVisible2(false)}}
                >
                    <Dialog.Content>
                        <Paragraph>{`¿Desea transferir ${selected === 0 ? '$' :'US$'}${data.amount} a su cuenta en ${selected === 0 ? 'dolares' : 'pesos'}?`}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {setVisible2(false)}}>No</Button>
                        <Button onPress={change}>Si</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Snackbar
                visible={visible}
                onDismiss={() => {
                    setVisible(false)
                }}
                action={{
                label: 'Ok',
                onPress: () => {
                    setVisible(false)
                },
                }}>
                    No tienes saldo suficiente
            </Snackbar>
            <Snackbar
                visible={visible1}
                onDismiss={() => {
                    setVisible1(false)
                }}
                action={{
                label: 'Ok',
                onPress: () => {
                    setVisible1(false)
                },
                }}>
                    Ingresa un monto
            </Snackbar>
            <Snackbar
                visible={visible3}
                onDismiss={() => {
                    setVisible3(false)
                }}>
                    Se ha realizado el cambio de moneda
            </Snackbar>
            <View style={styles.heading}>
                <Icon.Button
                    name="arrow-left"
                    size={25}
                    color="black"
                    backgroundColor="transparent"
                    onPress={() => changeScreen('main')}
                />
                <Headline>Cambiar Dinero</Headline>
            </View>
        <View style={styles.logo}>
            <ImageBackground
                style={{width:160,height:160}}
                source={require('../assets/LogoVector.png')}
            />
        </View>
        <View style={styles.mainCont}>
            <TextInput
                label="Monto a cambiar"
                placeholder={`Ingrese monto en ${selected === 0 ? "Pesos" : "Dolares"}`}
                keyboardType="numeric"
                mode="outlined"
                //value={amount}
                onChangeText={(text) => {setAmount(text)}}
                style={{height: 40, width: 222}}
            />
            <ButtonGroup
                onPress={updateSelected}
                selectedIndex={selected}
                buttons={["Pesos a Dolares", "Dolares a Pesos"]}
                containerStyle={{height: 40, width: 222}}
                selectedButtonStyle={{backgroundColor: '#006A34'}}
            />
        </View>
        <View style={styles.boton}>
            <Button
                style={styles.iconButtons}
                onPress={onSubmit}
            >
                <Icon
                    name="exchange-alt"
                    size={30}
                    color="#fff"
                />
            </Button>
            <Paragraph style={{fontWeight: '700'}}>
                Cambiar
            </Paragraph>
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
        marginTop:30,
    },
    mainCont: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    boton: {
        display: 'flex',
        alignItems:'center',
    },
    iconButtons: {
        backgroundColor: '#006A34',
        marginBottom: 10,
        borderRadius: 20,
        width:15,
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
