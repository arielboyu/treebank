import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Drawer, Text, DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import PureChart from 'react-native-pure-chart';
import Svg from 'react-native-svg';
import { useSelector } from 'react-redux';
import { VictoryPie, VictoryAnimation, VictoryLabel, VictoryLegend } from 'victory-native';
import Header from '../src/components/Header'; // Para ver desde el mobil >> victory-native
import { getUserByID } from '../src/redux/actions/user';

const WIDTH = 400;
const HEIGHT = 250;
const WIDTHRING = 250;
const HEIGHTRING = 400;

//admin@admin.com

const StatisticsScreen = () => {
	const user = useSelector((state) => state.user);
	const [ data, setData ] = useState([ { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 } ]);
	const movements = useSelector((state) => state.user.loggedUser.movements);
	const account = useSelector((state) => state.user.loggedUser.accounts);

/*   const transferencias = movements */

	useEffect(() => {
		changeData();

	},[movements]);

	const changeData = () => {
		const movementBuy = movements
			.filter((res) => res.movementType === 'Compra')
			.reduce((acc, item) => acc + parseFloat(item.amount), 0);

		const movementTrans = movements
			.filter((res) => res.movementType === 'Transferencia')
			.reduce((acc, item) => acc + parseFloat(item.amount), 0);

		const movementCharge = movements
			.filter((res) => res.movementType === 'Carga')
			.reduce((acc, item) => acc + parseFloat(item.amount), 0);

		const movementPay = movements
			.filter((res) => res.movementType === 'Pago')
			.reduce((acc, item) => acc + parseFloat(item.amount), 0);

		setData([
			{ x: 1, y: movementBuy },
			{ x: 2, y: movementTrans },
			{ x: 3, y: movementCharge },
			{ x: 4, y: movementPay }
		]);
	};

	return (
		<View style={styles.container}>
			<Header title="Mis Estadisticas..." />

				<View style={styles.chart}>
					<Svg>
						<VictoryPie
							animate={{ duration: 500 }}
							origin={{ x: WIDTH / 2 - 40, y: 100 }}
							data={data}
							height={WIDTHRING}
							width={HEIGHTRING}
							padAngle={2}
							innerRadius={WIDTHRING / 2 - 30}
							startAngle={130}
							endAngle={-130}
							colorScale={[ '#FFEA00', 'orange', 'green', 'red' ]}
							style={{ labels: { fill: 'white', fontSize: 0 } }}
						/>
						<VictoryAnimation duration={1000} data={{ left: account[0].balance }}>
							{(props) => {
								return (
									<React.Fragment>
										<VictoryLabel
											textAnchor="middle"
											verticalAnchor="middle"
											x={WIDTH / 2 - 33}
											y={WIDTHRING / 2 - 40}
											text="Saldo: "
											style={{ fontSize: 25 }}
										/>
										<VictoryLabel
											textAnchor="middle"
											verticalAnchor="middle"
											x={WIDTH / 2 - 40}
											y={WIDTHRING / 2 - 15}
											text={`$${Math.round(props.left)}`}
											style={{ fontSize: 25 }}
										/>
									</React.Fragment>
								);
							}}
						</VictoryAnimation>
						<VictoryLegend
							orientation="horizontal"
							x={WIDTH / 10}
							y={WIDTHRING / 2 + 50}
							gutter={20}
							style={{ border: { stroke: 'black' }, labels: { fontSize: 10 } }}
							colorScale={[ '#FFEA00', 'orange', 'green', 'red' ]}
							data={[ { name: 'Compra' }, { name: 'Transf' }, { name: 'Carga' }, { name: 'Pago' } ]}
						/>
					</Svg>
				</View>

			<View style={styles.generalCont1}>
				<TouchableOpacity style={styles.cardContainer}>
					<View style={styles.section1}>
						<Icon name={'shopping-cart'} size={30} color="white" />
					</View>
					<View style={styles.section2}>
						<View style={styles.section3}>
							<Text style={styles.text}>Tus Compras</Text>
						</View>
						<View style={styles.section4}>
							<Text style={styles.text}>{`$${data[0].y}`}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>

			<View style={styles.generalCont1}>
				<TouchableOpacity style={styles.cardContainer}>
					<View style={styles.section1}>
						<Icon name={'exchange-alt'} size={30} color="white" />
					</View>
					<View style={styles.section2}>
						<View style={styles.section3}>
							<Text style={styles.text}>Tus Transferencias</Text>
						</View>
						<View style={styles.section4}>
							<Text style={styles.text}>{`$${data[1].y}`}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>

			<View style={styles.generalCont1}>
				<TouchableOpacity style={styles.cardContainer}>
					<View style={styles.section1}>
						<Icon name={'donate'} size={30} color="white" />
					</View>
					<View style={styles.section2}>
						<View style={styles.section3}>
							<Text style={styles.text}>Tus Cargas de Dinero</Text>
						</View>
						<View style={styles.section4}>
							<Text style={styles.text}>{`$${data[2].y}`}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>

			<View style={styles.generalCont1}>
				<TouchableOpacity style={styles.cardContainer}>
					<View style={styles.section1}>
						<Icon name={'dollar-sign'} size={30} color="white" />
					</View>
					<View style={styles.section2}>
						<View style={styles.section3}>
							<Text style={styles.text}>Tus Pagos</Text>
						</View>
						<View style={styles.section4}>
							<Text style={styles.text}>{`$${data[3].y}`}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>

			{/* <DataTable>
				<DataTable.Header>
					<DataTable.Title>Tipo de Movimiento</DataTable.Title>
					<DataTable.Title numeric>Monto</DataTable.Title>
				</DataTable.Header>

				<DataTable.Row>
					<DataTable.Cell>
						<Icon name={'shopping-cart'} size={10} color="tomato" /> Tus Compras
					</DataTable.Cell>
					<DataTable.Cell numeric>{`$${data[0].y}`}</DataTable.Cell>
				</DataTable.Row>

				<DataTable.Row>
					<DataTable.Cell>
						<Icon name={'exchange-alt'} size={10} color="orange" /> Tus Transferencias
					</DataTable.Cell>
					<DataTable.Cell numeric>{`$${data[1].y}`}</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell>
						<Icon name={'dollar-sign'} size={10} color="navy" /> Tus Cargas de Dinero
					</DataTable.Cell>
					<DataTable.Cell numeric>{`$${data[2].y}`}</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell>
						<Icon name={'donate'} size={10} color="cyan" /> Tus Pagos
					</DataTable.Cell>
					<DataTable.Cell numeric>{`$${data[3].y}`}</DataTable.Cell>
				</DataTable.Row>
			</DataTable> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container     : {
		flex            : 1,
		padding         : 20,

	},
	chart         : {
		height     : HEIGHT,
		width      : WIDTH,
		alignItems : 'center',
		marginTop  : 10,
		marginLeft: "6%"

	},
	cardContainer : {
		display       : 'flex',
		flexDirection : 'row',
		marginTop     : 2,
		marginBottom  : 2,
		borderRadius  : 10,
		width         : '98%',
		overflow      : 'hidden',
		shadowColor: "#000",
		shadowOffset: {
						width: 5,
						height: 6,
					},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,

		elevation: 2,

	},
	generalCont1  : {
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'space-around',
		width          : '100%',
		marginTop      : 5,
		height         : 80
	},
	section1      : {
		width            : '25%',
		display          : 'flex',
		justifyContent   : 'center',
		alignItems       : 'center',
		padding          : 7,
		borderRightWidth : 1,
		backgroundColor  : '#097934',
		height:"100%"
	},
	section2      : {
		width           : '75%',
		display         : 'flex',
		flexDirection   : 'row',
		alignItems      : 'center',
		padding         : 5,
		backgroundColor : 'rgba(93, 177, 31,0.1)',
		marginRight     : 5,


	},
	section3      : {
		width : '60%'
	},
	section4      : {
		display    : 'flex',
		alignItems : 'flex-end',
		width      : '40%'
	},
	text          : {
		color      : 'black',
		fontWeight : '400',
		fontSize   : 18
	},
	lightGreen    : {
		backgroundColor : '#5DB11F'
	},
	btnCard       : {
		width         : '98%',
		height        : '41%',
		padding       : 20,
		borderRadius  : 20,
		marginTop     : 10,
		marginBottom  : 10,
		marginRight   : 10,
		shadowColor   : '#000',
		shadowOffset  : {
			width  : 0,
			height : 5
		},
		shadowOpacity : 0.5,
		shadowRadius  : 10,
		elevation     : 15
	}
});

export default StatisticsScreen;
