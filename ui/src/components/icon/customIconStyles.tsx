import {makeStyles, shorthands} from "@fluentui/react-components";
import {tokens} from "@fluentui/react-theme";

export const customIconStyle = makeStyles({
    root: {
        height: '48px',
        width: '48px',
        ...shorthands.borderRadius(tokens.borderRadiusCircular),
        boxShadow: tokens.shadow4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
