import {makeStyles, shorthands} from "@fluentui/react-components";
import { tokens } from '@fluentui/react-theme';

export const incomeCategoryStyle = makeStyles({
    root: {
        width: '200px',
        ...shorthands.borderRadius(tokens.borderRadiusLarge),
        boxShadow: tokens.shadow4,
    },
    rootHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...shorthands.padding('10px', '20px', '10px', '10px'),
    },
    rootFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...shorthands.padding('10px', '20px', '10px', '10px'),
    }
});