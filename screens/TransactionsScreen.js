import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Portal,Text, Modal, Headline, Divider, Paragraph, Subheading, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../src/components/Header';
import { getAllMovements } from '../src/redux/actions/account';

const TransactionsScreen = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const account = useSelector(state => state.user.loggedUser.accounts)
  const movements = useSelector(state => state.user.loggedUser.movements )

  useEffect(() => {
    dispatch(getAllMovements(user.user.id.id))
  }, [])

  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(1)

	return (
		<View style={styles.container}>
			<Header title="Mis transacciones..."/>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.containerStyle}
          style={{display: 'flex', alignItems: 'center'}}
        >
          <Headline>Detalles de transaccion...</Headline>
          <Divider/>
          <View style={styles.row}>
            <Text style={styles.title}>Origen: </Text>
            <Text>{movements[selected] && movements[selected].name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Monto: </Text>
            <Text>${movements[selected] && movements[selected].amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Número de transacción: </Text>
            <Text>{movements[selected] && movements[selected].id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Tipo: </Text>
            <Text>{`${movements[selected] && movements[selected].movementType} en ${movements[selected] && movements[selected].currency}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Descripción: </Text>
            <Text>{movements[selected] && movements[selected].description}</Text>
          </View>
        </Modal>
      </Portal>
      {movements
        ? <ScrollView showsVerticalScrollIndicator={false}>
            {/* Detalles de la transaccion */}
            {
              movements.map((transaction, i) => (
                <View
                  style={styles.generalCont1}
                  key={i}
                >
                  <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() => {
                      setVisible(true)
                      setSelected(i)
                    }}
                  >
                    <View style={styles.section1}>
                      <Icon
                        name={
                          transaction.movementType === "Compra" ? "shopping-cart" :
                          transaction.movementType === "Transferencia" ? "exchange-alt" :
                          transaction.movementType === "Pago" ? "dollar-sign" :
                          transaction.movementType === "Carga" ? "donate" : null
                        }
                        size={30}
                        color="#F7F7F9"
                      />
                    </View>
                    <View style={styles.section2}>
                      <View style={styles.section3}>
                        <Text style={styles.text}>
                          {transaction.name.length > 15 ? transaction.name.slice(0, 13) + "..." : transaction.name}
                        </Text>
                        <Text style={styles.information}>
                          {`${transaction.createdAt.slice(0, 10)} | ${transaction.createdAt.slice(11, 13) - 3}${transaction.createdAt.slice(13, 16)}`}</Text>
                      </View>
                      <View style={styles.section4}>
                        <Text style={
                          transaction.type === "recibo"
                          ? styles.blueNumbers
                          : styles.redNumbers}
                        >
                          {`${transaction.type === "recibo" ? "+" : "-"}${transaction.currency === "pesos" ? "$" : "US$"} ${transaction.amount}`}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            }
          </ScrollView>
        : <Text>Aun no tienes transacciones</Text>
      }
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
 		padding: 20,

  },
  header: {
		display: "flex",
 		alignItems: "flex-start",
 		width: "100%",
    marginBottom: 10,
    marginTop: 10,
 		fontSize: 35
  },
  cardContainer: {
		display: "flex",
		flexDirection: "row",
    marginTop: 2,
    marginBottom: 2,
		borderRadius: 10,
		width: "98%",
    overflow: "hidden",
    shadowColor: "#000",
		shadowOffset: {
						width: 5,
						height: 6,
					},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,

		elevation: 2,
	},
  generalCont1: {
 		display: "flex",
 		flexDirection: "column",
 		justifyContent: "space-around",
 		width: "100%",
 		marginTop: 5,
    height: 100,
	},
	section1: {
		width: '25%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 7,
		borderRightWidth: 1,
    backgroundColor: '#097934',
	},
	section2: {
		width: '75%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
		padding: 5,
    backgroundColor: 'rgba(93, 177, 31,0.1)',
    marginRight: 5
  },
  section3: {
    width: '60%'
  },
  section4: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '40%'
  },
	blueNumbers: {
		color: "#097934",
		fontWeight: "100",
		fontSize: 20
  },
	redNumbers: {
		color: "#FF4242",
		fontWeight: "100",
		fontSize: 20
  },
  text: {
		color: "black",
		fontWeight: "400",
		fontSize: 18
  },
  information: {
    display: 'flex',
    color: "#2D3A3A",
    fontSize: 13,
    fontWeight: '300',
    marginTop: 20
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '85%',
    height: '50%',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10
  },
  title: {
    fontWeight: "600",
    color: '#097934'
  }
});

export default TransactionsScreen;
