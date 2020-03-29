import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { observer } from "mobx-react";
import "./CircleButton.scss";

const CircleButton = observer(
    (props: { icon: any; title: string; color?: "inherit" | "primary" | "secondary" | "default" | undefined }) => {
        const Icon = props.icon;

        return (
            <Tooltip title={props.title}>
                <IconButton edge="end" aria-label="delete" color={props.color}>
                    <Icon />
                </IconButton>
            </Tooltip>
        );
    }
);

export default CircleButton;
