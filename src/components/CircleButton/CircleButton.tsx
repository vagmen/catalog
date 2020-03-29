import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { observer } from "mobx-react";
import "./CircleButton.scss";

const CircleButton = observer(
    (props: {
        icon: any;
        title: string;
        color?: "inherit" | "primary" | "secondary" | "default" | undefined;
        className?: string;
        edge?: false | "start" | "end" | undefined;
    }) => {
        const Icon = props.icon;

        return (
            <Tooltip title={props.title}>
                <IconButton aria-label="delete" color={props.color} className={props.className} edge={props.edge}>
                    <Icon />
                </IconButton>
            </Tooltip>
        );
    }
);

export default CircleButton;
