import React from "react";
import "./App.scss";
import { Router, Switch, Route } from "react-router-dom";
import Сategories from "./pages/Categories/Сategories";
import Products from "./pages/Products/Products";
import { AppBar, Typography, Toolbar, StylesProvider } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";
import { history } from "./utils/router";
import { Provider, observer } from "mobx-react";
import CategoriesStore from "./pages/Categories/СategoriesStore";
import AppStore from "./AppStore";
import LoginForm from "./components/LoginForm/LoginForm";
import NotFound from "./components/NotFound/NotFound";

const App = observer(() => {
    const { isLogined, logIn, logOut } = AppStore;

    return (
        <Provider categoriesStore={CategoriesStore}>
            <StylesProvider injectFirst={true}>
                {isLogined ? (
                    <Router history={history}>
                        <AppBar position="static" className="header">
                            <Toolbar className="appName">
                                <Typography variant="h6">Каталог товаров</Typography>
                            </Toolbar>
                            <NavBar logOut={logOut} />
                        </AppBar>
                        <div>
                            <Switch>
                                <Route path="/" exact>
                                    <Products />
                                </Route>
                                <Route path="/categories" exact>
                                    <Сategories />
                                </Route>
                                <Route>
                                    <NotFound />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                ) : (
                    <LoginForm logIn={logIn} />
                )}
            </StylesProvider>
        </Provider>
    );
});

export default App;
