import {Account} from "../entityDescriptions/accountEntityDescription";


export const getAllAccounts = async (): Promise<Account[]> => {
    return await fetch("/api/accounts").then((response) => {
        return response.json() as Promise<Account[]>;
    });
}
export const deleteAccount = async (id: string): Promise<void> => {
    await fetch(`/api/account/${id}`, {
        method: "DELETE"
    });
}