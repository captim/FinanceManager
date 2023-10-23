import React from 'react';
import {Button, useRestoreFocusTarget} from "@fluentui/react-components";
import {Add24Regular} from "@fluentui/react-icons";
import AddNewEntityDialog from "../../dialogs/addNewEntityDialog";

export default function AccountsTab() {
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const restoreFocusTargetAttribute = useRestoreFocusTarget();
    const onClickAddAccount = () => {
        setAddDialogOpen(true);
    }
    const entityAccount = {
        name: "Account",
        properties: [
            {
                displayedName: "Name",
                name: "name",
                type: "string",
                required: true,
                defaultValue: "",
            },
            {
                displayedName: "Currency",
                name: "currency",
                type: "options",
                required: true,
                defaultValue: "",
                options: ["EUR", "USD", "HRN"]
            },
            {
                displayedName: "Personal money",
                name: "personalMoney",
                type: "float",
                required: true,
                defaultValue: "",
            },
            {
                displayedName: "Credit limit",
                name: "creditLimit",
                type: "float",
                required: false,
                defaultValue: "",
            }
        ]
    };
    return (
        <>
            <Button appearance={"primary"} icon={<Add24Regular/>} {...restoreFocusTargetAttribute} onClick={onClickAddAccount}>
                Add account
            </Button>
            <AddNewEntityDialog open={addDialogOpen} onOpenChange={(event, data) => {
                setAddDialogOpen(data.open);
            }} entity={entityAccount}/>
        </>
    );
}