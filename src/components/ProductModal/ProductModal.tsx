import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";
import { observer } from "mobx-react";
import "./ProductModal.scss";
import { ProductModalStore } from "./ProductModalStore";

interface IProductModal {
    visible: boolean;
    onClose: () => void;
    onSave: () => void;
    productModalStore: ProductModalStore;
}

const ProductModal = observer((props: IProductModal) => {
    const { visible, onClose, productModalStore, onSave } = props;
    const { errors, errorText, isValidated, selectedProduct } = productModalStore;

    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedProduct) selectedProduct.name = event.target.value;
    };

    const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("selectedProduct", selectedProduct);

        if (selectedProduct) selectedProduct.price = (event.target.value as unknown) as number;
    };

    const dateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // if (selectedProduct) selectedProduct.expirationDate = event.target.value;
    };

    const categoryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // if (selectedProduct) selectedProduct.category = (event.target.value as unknown) as number;
    };

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={visible} className="dialog">
            <DialogTitle id="simple-dialog-title">
                {selectedProduct?.id ? "Редактирование товара" : "Новый товар"}
            </DialogTitle>
            <div className="inputs">
                <TextField
                    error={isValidated && errors.length > 0}
                    label="Название"
                    value={selectedProduct?.name}
                    helperText={errorText}
                    variant="outlined"
                    fullWidth
                    onChange={nameChangeHandler}
                />
                <TextField
                    error={isValidated && errors.length > 0}
                    label="Цена"
                    value={selectedProduct?.price || ""}
                    helperText={errorText}
                    variant="outlined"
                    fullWidth
                    onChange={priceChangeHandler}
                />
                <TextField
                    error={isValidated && errors.length > 0}
                    label="Срок годности"
                    value={selectedProduct?.expirationDate || ""}
                    helperText={errorText}
                    variant="outlined"
                    fullWidth
                    onChange={dateChangeHandler}
                />
                <TextField
                    error={isValidated && errors.length > 0}
                    label="Категория"
                    value={selectedProduct?.category || ""}
                    helperText={errorText}
                    variant="outlined"
                    fullWidth
                    onChange={categoryChangeHandler}
                />
            </div>
            <DialogActions>
                <Button
                    fullWidth
                    onClick={onSave}
                    color="primary"
                    variant="contained"
                    disabled={errors.length > 0 && isValidated}
                    size="large"
                >
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default ProductModal;
