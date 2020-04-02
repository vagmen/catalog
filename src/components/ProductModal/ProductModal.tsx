import React from "react";
import { Dialog, DialogTitle, TextField, DialogActions, Button } from "@material-ui/core";
import { observer } from "mobx-react";
import "./ProductModal.scss";
import { ProductModalStore } from "./ProductModalStore";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment, { Moment } from "moment";
import MomentUtils from "@date-io/moment";

interface IProductModal {
    visible: boolean;
    onClose: () => void;
    onSave: () => void;
    productModalStore: ProductModalStore;
}

const ProductModal = observer((props: IProductModal) => {
    const { visible, onClose, productModalStore, onSave } = props;
    const { errors, isValidated, selectedProduct, hasError } = productModalStore;

    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedProduct) selectedProduct.name = event.target.value;
    };

    const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedProduct) selectedProduct.price = event.target.value;
    };

    const dateChangeHandler = (date: Moment | null) => {
        if (selectedProduct) selectedProduct.expirationDate = date || moment().add(1, "day");
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
                    error={isValidated && errors.name.length > 0}
                    label="Название"
                    value={selectedProduct?.name}
                    helperText={isValidated ? errors.name[0] : ""}
                    variant="outlined"
                    fullWidth
                    onChange={nameChangeHandler}
                />
                <TextField
                    error={isValidated && errors.price.length > 0}
                    label="Цена"
                    value={selectedProduct?.price || ""}
                    helperText={isValidated ? errors.price[0] : ""}
                    variant="outlined"
                    fullWidth
                    onChange={priceChangeHandler}
                />
                {/* <TextField
                    error={isValidated && errors.expirationDate.length > 0}
                    label="Срок годности"
                    value={selectedProduct?.expirationDate || ""}
                    helperText={isValidated ? errors.expirationDate[0] : ""}
                    variant="outlined"
                    fullWidth
                    onChange={dateChangeHandler}
                /> */}
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="ru">
                    <DatePicker
                        value={selectedProduct?.expirationDate || moment()}
                        onChange={(date) => dateChangeHandler(date)}
                        helperText={isValidated ? errors.expirationDate[0] : ""}
                        label="Срок годности"
                        inputVariant="outlined"
                        format="DD.MM.YYYY"
                        placeholder="Срок годности"
                        minDate={moment().add(1, "day")}
                        fullWidth
                        error={isValidated && errors.expirationDate.length > 0}
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    error={isValidated && errors.category.length > 0}
                    label="Категория"
                    value={selectedProduct?.category || ""}
                    helperText={isValidated ? errors.category[0] : ""}
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
                    disabled={hasError && isValidated}
                    size="large"
                >
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default ProductModal;
