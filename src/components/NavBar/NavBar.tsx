import React, { useEffect } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { observer } from "mobx-react";
import NavBarStore from "./NavBarStore";
import "./NavBar.scss";
import CircleButton from "../CircleButton/CircleButton";
import { ExitToApp } from "@material-ui/icons";
import { getLastLocationPart } from "../../utils/router";

const NavBar = observer((props: { logOut: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) => {
    const { currentTab, setTab } = NavBarStore;

    useEffect(() => {
        const lastLocationPart = "/" + getLastLocationPart();
        setTab(lastLocationPart);
    }, [currentTab, setTab]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setTab(newValue);
        event.preventDefault();
    };

    return (
        <nav className="nav">
            <Tabs value={currentTab} onChange={handleChange} aria-label="nav tabs" className="tabs">
                <Tab label="Товары" href="/" value="/" onClick={() => {}} className="tab" />
                <Tab label="Категории" href="/categories" value="/categories" onClick={() => {}} />
            </Tabs>
            <CircleButton title="Выход" icon={ExitToApp} edge="start" onClick={props.logOut} className="logout" />
        </nav>
    );
});

export default NavBar;
