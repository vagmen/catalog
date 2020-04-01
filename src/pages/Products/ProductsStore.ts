import { observable, decorate, action } from "mobx";
import Product from "../../models/Product";
import { v4 as uuid } from "uuid";
import moment from "moment";
import "moment/locale/ru";
import { ProductModalStore } from "../../components/ProductModal/ProductModalStore";
import api from "../../utils/api";
import { getArray } from "../../utils/localStorage";

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
    productModalStore = new ProductModalStore();

    constructor() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        // const list = data.map((item) => new Product(item));
        // this.list = list;

        this.list = [];
        const products: Product[] = getArray("products");
        const list = products.map((item) => new Product(item));
        this.list = list;
    };

    saveProduct = () => {
        const { selectedProduct, selectProduct, errors } = this.productModalStore;
        this.productModalStore.isValidated = true;
        if (selectedProduct && errors.length === 0) {
            if (selectedProduct?.id) {
                api.product.update(selectedProduct);
                this.fetchProducts();
            } else {
                api.product.create(selectedProduct.name);
                this.fetchProducts();
            }
            selectProduct(null);
        }
    };

    deleteProduct = (id: string | null) => {
        if (id) {
            api.product.delete(id);
            this.fetchProducts();
        }
    };
}

export default decorate(new ProductsStore(), {
    list: observable,
    fetchProducts: action,
    saveProduct: action,
    deleteProduct: action,
});
