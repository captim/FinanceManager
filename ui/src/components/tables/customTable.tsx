import React, {ReactNode, useState} from "react";
import {
    Button,
    createTableColumn, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger,
    Table,
    TableBody,
    TableCell, TableCellActions, TableColumnDefinition,
    TableColumnId, TableColumnSizingOptions, TableHeader,
    TableHeaderCell,
    TableRow, useTableColumnSizing_unstable, useTableFeatures, useTableSort
} from "@fluentui/react-components";
import {MoreHorizontal24Filled} from "@fluentui/react-icons";

export interface CustomTableRowsDefinition<Entity> {
    displayedName: string;
    name: string;
    type: string;
    getValue: (entity: Entity) => any;
}

export interface CustomTableAction<Entity> {
    name: string;
    icon: ReactNode;
    onClick: (entity: Entity) => void;
}

export interface CustomTableProps<Entity> {
    entities: Entity[];
    rowsDefinition: CustomTableRowsDefinition<Entity>[];
    action?: CustomTableAction<Entity>;
    actionsOnMenu?: CustomTableAction<Entity>[];
}

export function CustomTable<Entity>({entities, rowsDefinition, action, actionsOnMenu}: CustomTableProps<Entity>) {
    const columnDefinitions: TableColumnDefinition<Entity>[] = [];
    for (let i = 0; i < rowsDefinition.length; i++) {
        columnDefinitions.push(createTableColumn<Entity>({
            columnId: rowsDefinition[i].name,
            compare: (a, b) => {
                switch (rowsDefinition[i].type) {
                    case "string":
                        return rowsDefinition[i].getValue(a).localeCompare(rowsDefinition[i].getValue(b));
                    case "number":
                        return rowsDefinition[i].getValue(a) - rowsDefinition[i].getValue(b);
                    case "date":
                        return new Date(rowsDefinition[i].getValue(a)).getTime() - new Date(rowsDefinition[i].getValue(b)).getTime();
                    case "boolean":
                        return rowsDefinition[i].getValue(a) === rowsDefinition[i].getValue(b) ? 0 : rowsDefinition[i].getValue(a) ? 1 : -1;
                    default:
                        return 0;
                }
            }
        }));
    }
    const {getRows, sort: { getSortDirection, toggleColumnSort, sort },} = useTableFeatures<Entity>({columns: columnDefinitions, items: entities},
        [
            useTableSort({
                defaultSortState: { sortColumn: "name", sortDirection: "descending" },
            })
        ]
    );

    const headerSortProps = (columnId: TableColumnId) => ({
        onClick: (e: React.MouseEvent) => {
            toggleColumnSort(e, columnId);
        },
        sortDirection: getSortDirection(columnId),
    });

    const onClickCellActions = (e: React.MouseEvent<HTMLDivElement>) =>
        e.preventDefault();
    const onKeyDownCellActions = (e: React.KeyboardEvent<HTMLDivElement>) =>
        e.key === " " && e.preventDefault();

    const rows: any[] = sort(getRows());
    return (
        <Table sortable>
            <TableHeader>
                <TableRow>
                    {rowsDefinition.map((propertyDescription) => (
                        <TableHeaderCell {...headerSortProps(propertyDescription.name)} key={propertyDescription.name}>
                            {propertyDescription.displayedName}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map(({item}) => (
                    <TableRow key={item.id}>
                        {rowsDefinition.map((propertyDescription, index) => (
                            <TableCell key={propertyDescription.name}>
                                {propertyDescription.getValue(item)}
                                {action && index === 0 &&
                                    <TableCellActions
                                        onClick={onClickCellActions}
                                        onKeyDown={onKeyDownCellActions}
                                    >
                                        <Button
                                            icon={action.icon as any}
                                            appearance="subtle"
                                            aria-label={action.name}
                                            onClick={() => action.onClick(item)}
                                        />
                                        {actionsOnMenu && index === 0 &&
                                            <Menu>
                                                <MenuTrigger disableButtonEnhancement>
                                                    <Button icon={<MoreHorizontal24Filled/>}
                                                            appearance="subtle"
                                                            aria-label={"More"}
                                                    />
                                                </MenuTrigger>

                                                <MenuPopover>
                                                    <MenuList>
                                                        {actionsOnMenu.map((actionOnMenu) => (
                                                            <MenuItem key={actionOnMenu.name} onClick={() => actionOnMenu.onClick(item)} icon={actionOnMenu.icon as any}>
                                                                {actionOnMenu.name}
                                                            </MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </MenuPopover>
                                            </Menu>
                                        }
                                    </TableCellActions>
                                }
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        )
}