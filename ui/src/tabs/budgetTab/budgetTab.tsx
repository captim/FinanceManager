import React from 'react';
import {
    Avatar,
    createTableColumn,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell, TableCellLayout,
    TableColumnDefinition,
    DataGridRow,
    DataGridBody,
    DataGridCell,
    Text, PresenceBadgeStatus, makeStyles, Button
} from "@fluentui/react-components";
import {ArrowExportUp24Filled} from "@fluentui/react-icons";
type FileCell = {
    label: string;
    icon: JSX.Element;
};

type LastUpdatedCell = {
    label: string;
    timestamp: number;
};

type LastUpdateCell = {
    label: string;
    icon: JSX.Element;
};

type AuthorCell = {
    label: string;
    status: PresenceBadgeStatus;
};

type Item = {
    file: FileCell;
    author: AuthorCell;
    lastUpdated: LastUpdatedCell;
    lastUpdate: LastUpdateCell;
};

const startItems: Item[] = [
    {
        file: { label: "Meeting notes", icon: <ArrowExportUp24Filled /> },
        author: { label: "Max Mustermann", status: "available" },
        lastUpdated: { label: "7h ago", timestamp: 1 },
        lastUpdate: {
            label: "You edited this",
            icon: <ArrowExportUp24Filled />,
        },
    },
    {
        file: { label: "Thursday presentation", icon: <ArrowExportUp24Filled /> },
        author: { label: "Erika Mustermann", status: "busy" },
        lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
        lastUpdate: {
            label: "You recently opened this",
            icon: <ArrowExportUp24Filled />,
        },
    },
    {
        file: { label: "Training recording", icon: <ArrowExportUp24Filled /> },
        author: { label: "John Doe", status: "away" },
        lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
        lastUpdate: {
            label: "You recently opened this",
            icon: <ArrowExportUp24Filled />,
        },
    },
    {
        file: { label: "Purchase order", icon: <ArrowExportUp24Filled /> },
        author: { label: "Jane Doe", status: "offline" },
        lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
        lastUpdate: {
            label: "You shared this in a Teams chat",
            icon: <ArrowExportUp24Filled />,
        },
    }
];

const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
        columnId: "file",
        compare: (a, b) => {
            return a.file.label.localeCompare(b.file.label);
        },
        renderHeaderCell: () => {
            return "File";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout media={item.file.icon}>
                    {item.file.label}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<Item>({
        columnId: "author",
        compare: (a, b) => {
            return a.author.label.localeCompare(b.author.label);
        },
        renderHeaderCell: () => {
            return "Author";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout
                    media={
                        <Avatar
                            aria-label={item.author.label}
                            name={item.author.label}
                            badge={{ status: item.author.status }}
                        />
                    }
                >
                    {item.author.label}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<Item>({
        columnId: "lastUpdated",
        compare: (a, b) => {
            return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
        },
        renderHeaderCell: () => {
            return "Last updated";
        },

        renderCell: (item) => {
            return item.lastUpdated.label;
        },
    }),
    createTableColumn<Item>({
        columnId: "lastUpdate",
        compare: (a, b) => {
            return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
        },
        renderHeaderCell: () => {
            return "Last update";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout media={item.lastUpdate.icon}>
                    {item.lastUpdate.label}
                </TableCellLayout>
            );
        },
    }),
];
const incomeCategoryStyle = makeStyles({
    container: {
        height: '200px',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            width: '0em'
        }
    }
});
export const BudgetTab = () => {
    const [items, setItems] = React.useState<Item[]>(startItems);
    const classes = incomeCategoryStyle();
    const dataGridContainer = React.createRef();
    const onScrollDataGrid = (event: React.UIEvent<HTMLDivElement>) => {
        const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop - 2 < event.currentTarget.offsetHeight;
        if (bottom) {
            console.log("Bottom");
            setItems([...items, ...startItems])
        }
    }

    return (
        <>
            <div id={"data-grid-container"} className={classes.container} onScroll={onScrollDataGrid}>
                <DataGrid
                    items={items}
                    columns={columns}
                    sortable
                    selectionMode="multiselect"
                    getRowId={(item) => item.file.label}
                    onSelectionChange={(e, data) => console.log(data)}
                    focusMode="composite"
                >
                    <DataGridHeader>
                        <DataGridRow selectionCell={{ "aria-label": "Select all rows" }}>
                            {({ renderHeaderCell }) => (
                                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                            )}
                        </DataGridRow>
                    </DataGridHeader>
                    <DataGridBody<Item>>
                        {({ item, rowId }) => (
                            <DataGridRow<Item>
                                key={rowId + "-row"}
                                selectionCell={{ "aria-label": "Select row" }}
                            >
                                {({ renderCell }) => (
                                    <DataGridCell>{renderCell(item)}</DataGridCell>
                                )}
                            </DataGridRow>
                        )}
                    </DataGridBody>
                </DataGrid>
            </div>
        </>
    );
};
