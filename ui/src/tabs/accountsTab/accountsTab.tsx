import React from 'react';
import {Button, useRestoreFocusTarget,} from "@fluentui/react-components";
import {Add24Regular, Edit24Filled, ArrowDownload24Filled, ArrowExportUp24Filled, Delete24Filled} from "@fluentui/react-icons";
import AddNewEntityDialog from "../../components/dialogs/addNewEntityDialog/addNewEntityDialog";
import {accountTabStyles} from "./accountTabStyles";
import {deleteAccount, getAllAccounts} from "../../services/accountService";
import {Account, entityAccountDefinition} from "../../entityDescriptions/accountEntityDescription";
import {CustomTable, CustomTableAction} from "../../components/tables/customTable";
import {accountRowsDefinition} from "../../components/tables/rowsDefinition/accountRowsDefinition";
import EditEntityDialog from "../../components/dialogs/editEntityDialog/editEntityDialog";

interface AccountsTabProps {
    sendGlobalToast: (message: string, intent: string) => void;
}

export default function AccountsTab({sendGlobalToast}: AccountsTabProps) {
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [accountForEdit, setAccountForEdit] = React.useState<Account>();
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const restoreFocusTargetAttribute = useRestoreFocusTarget();

    const onClickAddAccount = () => {
        setAddDialogOpen(true);
    }

    const onOpenAddDialogChange = (event: React.MouseEvent | React.KeyboardEvent | MouseEvent, data: { open: boolean }) => {
        setAddDialogOpen(data.open);
    }

    const onOpenEditDialogChange = (event: React.MouseEvent | React.KeyboardEvent | MouseEvent, data: { open: boolean }) => {
        setEditDialogOpen(data.open);
    }

    const classes = accountTabStyles();

    const editAccount: CustomTableAction<Account> = {
        name: "Edit",
        icon: <Edit24Filled/>,
        onClick: (account: Account) => {
            setAccountForEdit(account);
            setEditDialogOpen(true);
            console.log(account);
        }
    }
    const menuActions: CustomTableAction<Account>[] = [
        {
            name: "Refill",
            icon: <ArrowDownload24Filled/>,
            onClick: (account: Account) => {
                console.log(account);
            }
        },
        {
            name: "Withdraw",
            icon: <ArrowExportUp24Filled/>,
            onClick: (account: Account) => {
                console.log(account);
            }
        },
        {
            name: "Delete",
            icon: <Delete24Filled/>,
            onClick: (account: Account) => {
                deleteAccount(account.id.toString()).then(() => {
                    loadAccounts();
                });
                sendGlobalToast("Account deleted", "success");
            }
        }
        ];

    function onCreateSuccess() {
        setAddDialogOpen(false);
        sendGlobalToast("Account created", "success");
        loadAccounts();
    }
    function onEditSuccess() {
        setEditDialogOpen(false);
        sendGlobalToast("Account edited", "success");
        loadAccounts();
    }

    async function loadAccounts() {
        const accounts = await getAllAccounts();
        setAccounts(accounts);
    }

    React.useEffect(() => {
            loadAccounts();
    }, []);

    const showAccountTable = () => {
        return accounts?.length !== 0 && accounts?.length !== undefined;
    }


    return (
        <>
            <Button appearance={"primary"} icon={<Add24Regular/>} {...restoreFocusTargetAttribute} onClick={onClickAddAccount}>
                Add account
            </Button>
            <div className={classes.tableWrapper}>
                {showAccountTable() &&
                    <CustomTable entities={accounts} rowsDefinition={accountRowsDefinition} action={editAccount} actionsOnMenu={menuActions}/>
                }
            </div>
            <AddNewEntityDialog open={addDialogOpen} onOpenChange={onOpenAddDialogChange} entityDefinition={entityAccountDefinition} onSuccess={onCreateSuccess}/>
            <EditEntityDialog open={editDialogOpen} onOpenChange={onOpenEditDialogChange} entityDefinition={entityAccountDefinition} onSuccess={onEditSuccess} entity={accountForEdit}/>
        </>
    );
}