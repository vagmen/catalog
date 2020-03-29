import { observable } from "mobx";

export interface ICategory {
    id: string | null;
    name: string;
}

export default class Category {
    @observable id: string | null;
    @observable name: string;

    constructor(props: ICategory) {
        this.id = props.id;
        this.name = props.name;
    }
}
