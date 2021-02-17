import React, { useState } from 'react';

import SendMoney from '../../screens/SendMoney';
import ChargeMoney from '../../screens/ChargeMoneyScreen';
import ChangeMoney from '../../screens/ChangeMoneyScreen';
import MainScreen from '../../screens/MainScreen';
import ContactsScreen from '../../screens/Contacts';
import UserDataScreen from '../../screens/userDataScreen'
import SettingsScreen from '../../screens/settingsScreen'
const Main = () => {
    const [screen, setScreen] = useState("main")

    const changeScreen = (data) => {
        setScreen(data)
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
        </>
    )
}

export default Main;
