import React from "react";
import "./App.scss";
import { Router, Switch, Route } from "react-router-dom";
import Сategories from "./pages/Categories/Сategories";
import Products from "./pages/Products/Products";
import { AppBar, Typography, Toolbar, StylesProvider } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";
import { history } from "./utils/router";
import { Provider } from "mobx-react";
import CategoriesStore from "./pages/Categories/СategoriesStore";

function App() {
    return (
        <Provider categoriesStore={CategoriesStore}>
            <StylesProvider injectFirst={true}>
                <Router history={history}>
                    <AppBar position="static" className="header">
                        <Toolbar className="appName">
                            <Typography variant="h6">Каталог товаров</Typography>
                        </Toolbar>
                        <NavBar />
                    </AppBar>
                    <div>
                        <Switch>
                            <Route path="/categories">
                                <Сategories />
                            </Route>
                            <Route path="/">
                                <Products />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </StylesProvider>
        </Provider>
    );
}

export default App;
