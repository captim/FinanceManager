import React from 'react';
import {
    Button, createTableColumn,
    Table,
    TableBody,
    TableCell, TableColumnDefinition, TableColumnId,
    TableHeader, TableHeaderCell,
    TableRow,
    useRestoreFocusTarget, useTableFeatures, useTableSort
} from "@fluentui/react-components";
import {Add24Regular} from "@fluentui/react-icons";
import AddNewEntityDialog from "../../dialogs/addNewEntityDialog";
import {accountTabStyles} from "./accountTabStyles";
import {getAllAccounts} from "../../services/accountService";
export interface Account {
    id: number;
    name: string;
    currency: string;
    personalMoney: number;
    creditLimit: number | null;
}

export default function AccountsTab() {
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const restoreFocusTargetAttribute = useRestoreFocusTarget();
    const onClickAddAccount = () => {
        setAddDialogOpen(true);
    }
    const classes = accountTabStyles();
    const getTotalBalance = (account: Account) => {
        return account.personalMoney + (account.creditLimit || 0);
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
    const columnDefinitions: TableColumnDefinition<Account>[] = [
        createTableColumn<Account>({
            columnId: "name",
            compare: (a, b) => {
                return a.name.localeCompare(b.name);
            },
        }),
        createTableColumn<Account>({
            columnId: "currency",
            compare: (a, b) => {
                return a.currency.localeCompare(b.currency);
            },
        }),
        createTableColumn<Account>({
            columnId: "personalMoney",
            compare: (a, b) => {
                return a.personalMoney - b.personalMoney;
            },
        }),
        createTableColumn<Account>({
            columnId: "creditLimit",
            compare: (a, b) => {
                if (a.creditLimit === null) {
                    return -1;
                }
                if (b.creditLimit === null) {
                    return 1;
                }
                return a.creditLimit - b.creditLimit;
            },
        }),
        createTableColumn<Account>({
            columnId: "totalBalance",
            compare: (a, b) => {
                return getTotalBalance(a) - getTotalBalance(b);
            },
        }),
    ];

    const {getRows, sort: { getSortDirection, toggleColumnSort, sort },} = useTableFeatures<Account>({columns: columnDefinitions, items: accounts},
        [
            useTableSort({
                defaultSortState: { sortColumn: "name", sortDirection: "descending" },
            }),
        ]
    );

    const headerSortProps = (columnId: TableColumnId) => ({
        onClick: (e: React.MouseEvent) => {
            toggleColumnSort(e, columnId);
        },
        sortDirection: getSortDirection(columnId),
    });

    function onCreateSuccess() {
        setAddDialogOpen(false);
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

    const rows = sort(getRows());

    return (
        <>
            <Button appearance={"primary"} icon={<Add24Regular/>} {...restoreFocusTargetAttribute} onClick={onClickAddAccount}>
                Add account
            </Button>
            <div className={classes.tableWrapper}>
                {showAccountTable() &&
                    <Table sortable arial-label="Default table">
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell {...headerSortProps("name")} key="name">
                                    Name
                                </TableHeaderCell>
                                <TableHeaderCell {...headerSortProps("currency")} key="currency">
                                    Currency
                                </TableHeaderCell>
                                <TableHeaderCell {...headerSortProps("personalMoney")} key="personalMoney">
                                    Personal money
                                </TableHeaderCell>
                                <TableHeaderCell {...headerSortProps("creditLimit")} key="creditLimit">
                                    Credit limit
                                </TableHeaderCell>
                                <TableHeaderCell {...headerSortProps("totalBalance")} key="totalBalance">
                                    Total balance
                                </TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map(({item}) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.currency}
                                    </TableCell>
                                    <TableCell>
                                        {item.personalMoney}
                                    </TableCell>
                                    <TableCell>
                                        {item.creditLimit || "-"}
                                    </TableCell>
                                    <TableCell>
                                        {getTotalBalance(item)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </div>
            <AddNewEntityDialog open={addDialogOpen} onOpenChange={(event, data) => {
                setAddDialogOpen(data.open);
            }} entity={entityAccount} onSuccess={onCreateSuccess}/>
        </>
    );
}