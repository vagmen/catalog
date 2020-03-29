import { observable } from "mobx";
import { Moment } from "moment";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    expirationDate: Moment;
    category: string;
}

export default class Product {
    @observable id: string;
    @observable name: string;
    @observable price: number;
    @observable expirationDate: Moment;
    @observable category: string;

    constructor(props: IProduct) {
        this.id = props.id;
        this.name = props.name;
        this.price = props.price;
        this.expirationDate = props.expirationDate;
        this.category = props.category;
    }
}
