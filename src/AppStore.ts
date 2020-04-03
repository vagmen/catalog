import { decorate, observable, action } from "mobx";

export class AppStore {
    isLogined = localStorage.getItem("isLogined") === "true";

    logIn = () => {
        this.isLogined = true;
        localStorage.setItem("isLogined", "true");
    };

    logOut = () => {
        this.isLogined = false;
        localStorage.setItem("isLogined", "false");
    };
}

export default decorate(new AppStore(), {
    isLogined: observable,
    logIn: action,
    logOut: action,
});
