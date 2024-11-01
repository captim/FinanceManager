import {makeStyles, shorthands} from "@fluentui/react-components";

export const dialogStyles = makeStyles({
    dialog: {
        width: '600px',
    },
    tableRow: {
        height: '50px',
    },
    paramName: {
        width: '100px',
        ...shorthands.padding('10px'),
    }
});