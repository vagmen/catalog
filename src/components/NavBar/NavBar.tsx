import React from "react";
import { Tab, Tabs } from "@material-ui/core";
import { observer } from "mobx-react";
import NavBarStore from "./NavBarStore";
import "./NavBar.scss";

const NavBar = observer(() => {
    const navBarStore = NavBarStore;

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        // setValue(newValue);
        navBarStore.setTab(newValue);
        event.preventDefault();
    };

    return (
        <nav className="ta">
            <Tabs value={navBarStore.currentTab} onChange={handleChange} aria-label="nav tabs" className="tabs">
                <Tab label="Товары" href="/" value="/" onClick={() => {}} className="tab" />
                <Tab label="Категории" href="/categories" value="/categories" onClick={() => {}} />
            </Tabs>
        </nav>
    );
});

export default NavBar;
