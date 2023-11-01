import {makeStyles, shorthands} from "@fluentui/react-components";
import { tokens } from '@fluentui/react-theme';
import {TABS_WIDTH} from "../../mainLayout/mainLayoutStyles";

export const incomeTabStyle = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...shorthands.padding('10px', '20px', '10px', '10px'),
        width: TABS_WIDTH,
        overflowX: 'auto'
    }
});