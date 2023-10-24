import {makeStyles, shorthands} from "@fluentui/react-components";

export const slideStyles = makeStyles({
    slide: {
        height: '800px',
        ...shorthands.padding('20px'),
    },
    slideNameWrapper: {
        ...shorthands.padding('0px', '0px', '20px', '0px'),
    },
    slideContent: {
        ...shorthands.padding('10px', '10px', '20px', '10px'),
    }
});