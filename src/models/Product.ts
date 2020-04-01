import { observable } from "mobx";
import { Moment } from "moment";

export interface IProduct {
    id?: string | null;
    name: string;
    price?: number | null;
    expirationDate?: Moment | null;
    category?: string | null;
}

export default class Product {
    @observable id: string | null;
    @observable name: string;
    @observable price: number | null;
    @observable expirationDate: Moment | null;
    @observable category: string | null;

    constructor(props: IProduct) {
        this.id = props.id || null;
        this.name = props.name;
        this.price = props.price || null;
        this.expirationDate = props.expirationDate || null;
        this.category = props.category || null;
    }
}
