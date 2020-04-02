import { observable } from "mobx";
import moment, { Moment } from "moment";

export interface IProduct {
    id?: string | null;
    name: string;
    price?: string | null;
    expirationDate?: string;
    category?: string | null;
}

export default class Product {
    @observable id: string | null;
    @observable name: string;
    @observable price: string | null;
    @observable expirationDate: Moment;
    @observable category: string | null;

    constructor(props: IProduct) {
        this.id = props.id || null;
        this.name = props.name;
        this.price = props.price || null;
        this.expirationDate = props.expirationDate ? moment(props.expirationDate) : moment().add(1, "day");
        this.category = props.category || null;
    }
}
