import { observable, decorate, action } from "mobx";
import Product from "../../models/Product";
import { v4 as uuid } from "uuid";
import moment from "moment";
import "moment/locale/ru";

const data = [
    { id: uuid(), name: "Продукт1", price: 123, expirationDate: moment().add(1, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт2", price: 123, expirationDate: moment().add(2, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
    { id: uuid(), name: "Продукт3", price: 123, expirationDate: moment().add(3, "day"), category: "Категория" },
];

export class ProductsStore {
    list: Product[] = [];

    constructor() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        const list = data.map((item) => new Product(item));
        this.list = list;
    };
}

export default decorate(new ProductsStore(), { list: observable, fetchProducts: action });
