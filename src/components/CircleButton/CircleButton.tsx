import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { observer } from "mobx-react";
import "./CircleButton.scss";

interface ICircleButton {
    icon: any;
    title: string;
    color?: "inherit" | "primary" | "secondary" | "default" | undefined;
    className?: string;
    edge?: false | "start" | "end" | undefined;
    onClick: () => void;
}

const CircleButton = observer(({ onClick, title, color, className, edge, icon }: ICircleButton) => {
    const Icon = icon;

    return (
        <Tooltip title={title}>
            <IconButton aria-label="delete" color={color} className={className} edge={edge} onClick={onClick}>
                <Icon />
            </IconButton>
        </Tooltip>
    );
});

export default CircleButton;
