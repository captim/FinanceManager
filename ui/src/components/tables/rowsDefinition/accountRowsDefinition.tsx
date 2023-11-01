import {Account} from "../../../entityDescriptions/accountEntityDescription";


export const accountRowsDefinition = [
    {
        displayedName: "Name",
        name: "name",
        type: "string",
        getValue: (account: Account) => account.name,
    },
    {
        displayedName: "Currency",
        name: "currency",
        type: "string",
        getValue: (account: Account) => account.currency,
    },
    {
        displayedName: "Personal money",
        name: "personalMoney",
        type: "number",
        getValue: (account: Account) => account.personalMoney,
    },
    {
        displayedName: "Credit limit",
        name: "creditLimit",
        type: "number",
        getValue: (account: Account) => account.creditLimit === 0 ? "-" : account.creditLimit,
    },
    {
        displayedName: "Total balance",
        name: "totalBalance",
        type: "number",
        getValue: (account: Account) => getTotalBalance(account),
    },
];
export const getTotalBalance = (account: Account) => {
    return account.personalMoney + (account.creditLimit || 0);
}