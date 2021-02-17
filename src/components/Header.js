import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Avatar, Menu, Headline, Portal, Modal, Title, Caption } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getUserByID, logout } from '../redux/actions/user'

const Header = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const { changeScreen, menu, title } = props;

    const [visible, setVisible] = useState(false)

    useEffect(() => {
		dispatch(getUserByID(user.user.id.id));
	}, [])

	const { email, firstName, lastName, photoURL } = user.loggedUser;

    return(
        <>
            <View style={styles.greeting}>
                {
                    menu && <Icon.Button
                        name="bars"
                        size={25}
                        color="black"
                        backgroundColor="transparent"
                        onPress={() => setVisible(true)}
                    />
                }
                <Headline>{title}</Headline>
            </View>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    //dismissable={false}
                    contentContainerStyle={styles.content}
                    style={styles.sideBar}
                >
                    <View>
                        <View style={[styles.center, styles.section]}>
                            {photoURL ? <Avatar.Image size={100} source={uri(photoURL)} /> : <Avatar.Text size={100} label={[firstName && firstName.slice(0, 1), lastName && lastName.slice(0, 1)]}/>}
                            <Title>{`${firstName} ${lastName}`}</Title>
                            <Caption>{`${email}`}</Caption>
                        </View>

                        <View style={[styles.menu]}>
                            <Menu.Item icon="account" onPress={() => {changeScreen('misdatos')}} title="Mis datos" style={{width: '100%'}}/>
                            <Menu.Item icon="contacts" onPress={() => {changeScreen('contacts')}} title="Mis contactos" style={{width: '100%'}}/>
                            <Menu.Item icon="cog" onPress={() => {changeScreen('config')}} title="Configuración" style={{width: '100%'}}/>
                            <Menu.Item icon="help" onPress={() => {}} title="Ayuda" style={{width: '100%'}}/>
                        </View>
                    </View>

                    <View style={[styles.logout, styles.menu]}>
                        <Menu.Item icon="logout" onPress={() => {dispatch(logout())}} title="Cerrar sesión" style={{width: '100%'}}/>
                        <Caption>© TreeBank | {new Date().getFullYear()}</Caption>
                    </View>
                </Modal>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
	sideBar: {
		backgroundColor : 'rgba(93, 177, 31,0.9)',
		width: '60%',
		height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    },
    greeting: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
 		width: "100%",
		marginBottom: 10,
		marginTop: 10,
 		fontSize: 35,
      },
      content: {
        elevation: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
      },
      center: {
        display: 'flex',
        alignItems: 'center',
      },
      section: {
        margin: 20,
      },
      menu: {
        margin: 0,
        width: '100%',
      },
      logout: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30
      }
});

export default Header;
