import React from 'react';
import {incomeCategoryStyle} from "./incomeCategoryStyle";
import {CustomIcon} from "../icon/customIcon";
import {Button, Text, Tooltip} from "@fluentui/react-components";
import {Add24Filled} from "@fluentui/react-icons";

export default function IncomeCategory() {
    const classes = incomeCategoryStyle();
    return (
        <div className={classes.root}>
            <div className={classes.rootHeader}>
                <CustomIcon/>
                <Text weight={"semibold"} size={600}>Home</Text>
            </div>
            <div className={classes.rootFooter}>
                <Text size={500}>2430.51 $</Text>
                <Tooltip content="Example tooltip" relationship="label">
                    <Button icon={<Add24Filled/>} appearance="primary" shape="circular"/>
                </Tooltip>
            </div>
        </div>
    );
}