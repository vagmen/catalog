import { observable, decorate, action, computed } from "mobx";
import Product from "../../models/Product";

export class ProductModalStore {
    selectedProduct: Product | null = null;
    isValidated = false;

    selectProduct = (product: Product | null) => {
        this.selectedProduct = product ? { ...product } : null;
        this.isValidated = false;
    };

    @computed
    get errors() {
        const err: string[] = [];
        if (this.selectedProduct?.name && this.selectedProduct?.name?.length < 5) {
            err.push("Слишком короткое название");
        }
        if (this.selectedProduct?.name && this.selectedProduct?.name?.length > 30) {
            err.push("Слишком длинное название");
        }

        return err;
    }

    @computed
    get errorText() {
        return this.isValidated ? this.errors[0] : "";
    }
}

export default decorate(ProductModalStore, {
    isValidated: observable,
    selectedProduct: observable,
    selectProduct: action,
});
