import React from 'react';
import IncomeCategory from "../../components/incomeCategory/incomeCategory";
import {incomeTabStyle} from "./incomeTabStyles";

export default function IncomeTab() {
    const amountOfCategories = 10;
    const classes = incomeTabStyle();
    return (
        <div className={classes.root}>
            {[...Array(amountOfCategories)].map((e, i) => <IncomeCategory key={i}/>)}
        </div>
    );
}