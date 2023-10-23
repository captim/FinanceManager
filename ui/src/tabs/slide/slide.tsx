import React from 'react';
import {slideStyles} from "../slideStyles";
import {Text} from "@fluentui/react-components";

interface SlideProps {
    title?: string;
    children?: React.ReactNode;
}

export default function Slide({title, children}: SlideProps) {
    const classes = slideStyles();
    return (
        <div className={classes.slide}>
            <div className={classes.slideNameWrapper}>
                <Text size={800}>
                    {title}
                </Text>
            </div>
            {children}
        </div>
    );
}