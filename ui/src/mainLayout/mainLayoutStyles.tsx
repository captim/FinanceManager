import {makeStyles, shorthands} from "@fluentui/react-components";
import { tokens } from '@fluentui/react-theme';

export const TABS_HEIGHT = '800px';
export const TABS_WIDTH = '1050px';
const FULL_WIDGET_WIDTH = '1400px';

export const mainLayoutStyles = makeStyles({
    rootBackground: {
        backgroundImage: 'url("../../background/background.jpg")',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh'
    },
    rootWidget: {
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow16,
        ...shorthands.borderRadius(tokens.borderRadiusXLarge),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: FULL_WIDGET_WIDTH,
        height: TABS_HEIGHT,
        ...shorthands.overflow('hidden'),
        display: 'flex'
    },
    rootNavigation: {
        width: '250px',
        height: '100%',
        ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralForeground3Hover)
    },
    rootNavigationLogo: {
        ...shorthands.padding('20px', '10px', '10px', '20px'),
        ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralForeground3Hover),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
            cursor: 'pointer'
        }
    },
    rootNavigationTabList: {
        ...shorthands.padding('15px', '0', '0', '15px')
    },
    rootNavigationTabItem: {
        ...shorthands.padding('30px', '30px', '30px', '30px'),
    },
    rootTabs: {
        transitionProperty: 'top',
        transitionDuration: '0.8s',
        transitionTimingFunction: tokens.curveDecelerateMin
    }
});