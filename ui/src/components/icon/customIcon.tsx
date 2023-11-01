import React from "react";
import { customIconStyle } from "./customIconStyles";

export function CustomIcon() {

    const classes = customIconStyle();
    return(
        <div className={classes.root}>
            <img width="42px" src={"../../icons/home.svg"} alt={"home"}/>
        </div>
    )
}