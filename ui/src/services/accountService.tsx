import {Account} from "../tabs/accountsTab/accountsTab";

export const getAllAccounts = async (): Promise<Account[]> => {
    return await fetch("/api/accounts").then((response) => {
        return response.json() as Promise<Account[]>;
    });
}