import React, {useLayoutEffect, useState} from 'react';
import {Tab, TabList, Text, Toast, Toaster, ToastTitle, useId, useToastController} from "@fluentui/react-components";
import StartTab from "../tabs/startTab/startTab";
import IncomeTab from "../tabs/incomeTab/incomeTab";
import OutcomeTab from "../tabs/outcomeTab/outcomeTab";
import BudgetTab from "../tabs/budgetTab/budgetTab";
import SettingsTab from "../tabs/settingsTab/settingsTab";
import AccountsTab from "../tabs/accountsTab/accountsTab";
import AnalysisTab from "../tabs/analysisTab/analysisTab";
import {SelectTabEventHandler} from "@fluentui/react-tabs";
import {mainLayoutStyles} from './mainLayoutStyles';
import Slide from "../tabs/slide/slide";
import {fillStorage, getCurrentUser} from "../storage/storage";


export default function MainLayout() {
    const classes = mainLayoutStyles();
    const tabHeight = 800;
    const tabs = [
        {name: "Start", value: "start", component: <Slide title={"Welcome to the Finance Manager!"}><StartTab/></Slide>, showInNavigation: false},
        {name: "Accounts", value: "accounts", component: <Slide title={"Accounts"}><AccountsTab/></Slide>, showInNavigation: true},
        {name: "Income", value: "income", component: <Slide title={"Income"}><IncomeTab/></Slide>, showInNavigation: true},
        {name: "Outcome", value: "outcome", component: <Slide title={"Outcome"}><OutcomeTab/></Slide>, showInNavigation: true},
        {name: "Budget", value: "budget", component: <Slide title={"Budget"}><BudgetTab/></Slide>, showInNavigation: true},
        {name: "Analysis", value: "analysis", component: <Slide title={"Analysis"}><AnalysisTab/></Slide>, showInNavigation: true},
        {name: "Settings", value: "settings", component: <Slide title={"Settings"}><SettingsTab/></Slide>, showInNavigation: true}
        ];
    const [activeTab, setActiveTab] = useState("start");
    const [lastActiveTab, setLastActiveTab] = useState("start");
    const [contextIsLoaded, setContextIsLoaded] = useState(false);
    const onTabSelect: SelectTabEventHandler = (e, data) => {
        const tab = data?.value?.toString() || "start";
        goToActiveTab(tab);
    }
    const onLogoClick = () => {
        goToActiveTab("start");
    }

    const goToActiveTab = (tab: string) => {
        const lastActiveTab = activeTab;
        setActiveTab(tab);
        setLastActiveTab(lastActiveTab);
    }

    const getIndexOfActiveTab = () => {
        return tabs.findIndex((tab) => tab.value === activeTab);
    }

    const getTabPosition = (index: number) => {
        if (index > getIndexOfActiveTab()) {
            return tabHeight;
        } else if (index < getIndexOfActiveTab()) {
            return -tabHeight;
        } else {
            return 0;
        }
    }
    useLayoutEffect(() => {
        fillStorage().then(r => setContextIsLoaded(true));
    }, []);
    if (!contextIsLoaded) {
        return (<>Loading...</>);
    } else {
    return (
        <div className={classes.rootBackground}>
            <div className={classes.rootWidget}>
                <div className={classes.rootNavigation}>
                    <div className={classes.rootNavigationLogo} onClick={onLogoClick}>
                        <img src={"financeManager.svg"} alt={"logo"} width="25" height="25"/>
                        <Text size={600} weight={activeTab === "start" ? 'semibold' : 'regular'}>
                            Finance Manager
                        </Text>
                    </div>
                    <TabList className={classes.rootNavigationTabList} as="div" vertical={true} size="large" onTabSelect={onTabSelect} selectedValue={activeTab}>
                        {tabs.filter(tab => tab.showInNavigation).map((tab) => (
                            <Tab key={tab.value} id={tab.value} value={tab.value}>
                                {tab.name}
                            </Tab>
                        ))}
                    </TabList>
                </div>
                <div>
                    {tabs.map((tab, index) => (
                        <div className={classes.rootTabs} key={tab.value} style={{"position": "absolute", "top": getTabPosition(index), "visibility": activeTab === tab.value || lastActiveTab === tab.value ? "visible" : "hidden"}}>
                            {tab.component}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    }
}