import { observable, decorate, action } from "mobx";
import { history } from "../../utils";

export class NavBarStore {
    currentTab = "/";

    setTab = (newValue: string) => {
        history.push(newValue);

        this.currentTab = newValue;
    };
}

export default decorate(new NavBarStore(), {
    currentTab: observable,
    setTab: action,
});
