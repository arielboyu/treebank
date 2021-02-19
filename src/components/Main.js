import React, { useState } from 'react';

import SendMoney from '../../screens/SendMoney';
import ChargeMoney from '../../screens/ChargeMoneyScreen';
import ChangeMoney from '../../screens/ChangeMoneyScreen';
import MainScreen from '../../screens/MainScreen';
import ContactsScreen from '../../screens/Contacts';
import UserDataScreen from '../../screens/userDataScreen'
import SettingsScreen from '../../screens/settingsScreen'
import SendCvu from '../../screens/SendCvu';
const Main = ({darkTheme}) => {
    const [screen, setScreen] = useState("main")
    const [selected, setSelected] = useState(0)

    const changeScreen = (data) => {
        setScreen(data)
    }

    const updateSelected = (selected) => {
        setSelected(selected);
        selected === 1 ? setScreen('sendcvu') : setScreen('send');
    }

    return(
        <>
            {
                screen === "contacts" && <ContactsScreen
                    changeScreen={changeScreen}
                />
            }
            {
                screen === "main" && <MainScreen
                    changeScreen={changeScreen}
                    darkTheme={darkTheme}
                />
            }
            {
                screen === "charge" && <ChargeMoney
                    changeScreen={changeScreen}
                />
            }
            {
                screen === "send" && <SendMoney
                    changeScreen={changeScreen}
                    updateSelected={updateSelected}
                    selected={selected}
                />
            }
            {
                screen === "change" && <ChangeMoney
                    changeScreen={changeScreen}
                />
            }
            {
                screen === "misdatos" && <UserDataScreen
                    changeScreen={changeScreen}
                />
            }
            {
                screen === "config" && <SettingsScreen
                    changeScreen={changeScreen}
                />
            }
            {
                screen === "sendcvu" && <SendCvu
                    changeScreen={changeScreen}
                    updateSelected={updateSelected}
                    selected={selected}
                />
            }
        </>
    )
}

export default Main;
