import React from 'react';
import {Button, makeStyles, Text} from "@fluentui/react-components";
import { ArrowForwardDownPerson24Regular } from "@fluentui/react-icons";
import {performLogout} from "../../services/logoutService";
import {getCurrentUser} from "../../storage/storage";
const settingsTabStyles = makeStyles({
    settingsTab: {
        display: 'flex',
        flexDirection: 'column',
    },
    logoutButton: {
        width: '100px'
    }
})

export default function SettingsTab() {

    const logout = () => {
        performLogout();
    }

    const user = getCurrentUser();
    const classes = settingsTabStyles();
    return (
        <div className={classes.settingsTab}>
            <Text size={500} as={"p"}>
                User: {user?.login}<br/>
                {user?.source !== null ? "Source: " + user?.source.toLowerCase() : ""}
            </Text>
            <Button icon={<ArrowForwardDownPerson24Regular/>} iconPosition={"after"} className={classes.logoutButton} onClick={logout}>
                Logout
            </Button>
        </div>
    );
}