import { observable, decorate, action } from "mobx";
import Product, { IProduct } from "../../models/Product";
import "moment/locale/ru";
import { ProductModalStore } from "../../components/ProductModal/ProductModalStore";
import api from "../../utils/api";
import { getArray } from "../../utils/localStorage";

export class ProductsStore {
    list: Product[] = [];
    productModalStore = new ProductModalStore();

    constructor() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        this.list = [];
        const products: IProduct[] = getArray("products");
        const list = products.map((item) => new Product(item));
        this.list = list;
    };

    saveProduct = () => {
        const { selectedProduct, selectProduct, hasError } = this.productModalStore;
        this.productModalStore.isValidated = true;
        if (selectedProduct && !hasError) {
            if (selectedProduct?.id) {
                api.product.update(selectedProduct);
                this.fetchProducts();
            } else {
                const { name, price, expirationDate, category } = selectedProduct;
                api.product.create({
                    name,
                    price: price || "1",
                    expirationDate: expirationDate.format(),
                    category: category || "",
                });
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
