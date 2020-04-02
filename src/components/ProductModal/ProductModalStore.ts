import { observable, decorate, action, computed } from "mobx";
import Product from "../../models/Product";
import moment from "moment";

export class ProductModalStore {
    selectedProduct: Product | null = null;
    isValidated = false;

    selectProduct = (product: Product | null) => {
        this.selectedProduct = product ? { ...product } : null;
        this.isValidated = false;
    };

    @computed
    get errors() {
        const err: { name: string[]; price: string[]; expirationDate: string[]; category: string[] } = {
            name: [],
            price: [],
            expirationDate: [],
            category: [],
        };
        if (this.selectedProduct) {
            const { name, price, expirationDate, category } = this.selectedProduct;
            if (name.length === 0) {
                err.name.push("Введите название, пожалуйста");
            }
            if (name.length < 5) {
                err.name.push("Слишком короткое название");
            }
            if (name.length > 40) {
                err.name.push("Слишком длинное название");
            }

            if (isNaN(Number(price))) {
                err.price.push("Цена должна быть числом");
            }
            if (price === null || (price !== null && price.length === 0)) {
                err.price.push("Введите цену, пожалуйста");
            }
            if (price !== null && Number(price) === 0) {
                err.price.push("Цена должна быть больше 0");
            }

            if (expirationDate < moment()) {
                err.price.push("Дата должна быть больше чем сегодня");
            }

            if (category === null) {
                err.category.push("Выберите категорию");
            }
        }
        return err;
    }

    @computed
    get hasError() {
        return (
            [...this.errors.name, ...this.errors.price, ...this.errors.expirationDate, ...this.errors.category]
                .length !== 0
        );
    }
}

export default decorate(ProductModalStore, {
    isValidated: observable,
    selectedProduct: observable,
    selectProduct: action,
});
