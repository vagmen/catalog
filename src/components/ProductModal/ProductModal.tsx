import React from "react";
import { Dialog, DialogTitle, TextField, DialogActions, Button } from "@material-ui/core";
import { observer, inject } from "mobx-react";
import "./ProductModal.scss";
import { ProductModalStore } from "./ProductModalStore";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment, { Moment } from "moment";
import MomentUtils from "@date-io/moment";
import { Autocomplete } from "@material-ui/lab";
import { CategoriesStore } from "../../pages/Categories/СategoriesStore";

interface IProductModal {
    visible: boolean;
    onClose: () => void;
    onSave: () => void;
    productModalStore: ProductModalStore;
    categoriesStore?: CategoriesStore;
}

interface CategoryOptionType {
    id: string | null;
    name: string;
}

const ProductModal = inject("categoriesStore")(
    observer((props: IProductModal) => {
        const { visible, onClose, productModalStore, onSave, categoriesStore } = props;

        const { errors, isValidated, selectedProduct, hasError } = productModalStore;
        const categories = categoriesStore!.list;

        if (selectedProduct) {
            const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
                (selectedProduct.name = event.target.value);

            const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
                (selectedProduct.price = event.target.value);

            const dateChangeHandler = (date: Moment | null) =>
                (selectedProduct.expirationDate = date || moment().add(1, "day"));

            const categoryChangeHandler = (event: any, newValue: CategoryOptionType | null) =>
                (selectedProduct.category = newValue ? newValue.id : null);

            const currentCategory = categories.find((item) => item.id === selectedProduct.category) || null;

            if (!currentCategory) {
                selectedProduct.category = null;
            }

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
                        <Autocomplete
                            id="combo-box-demo"
                            options={categories}
                            getOptionLabel={(option) => option.name}
                            value={currentCategory}
                            onChange={categoryChangeHandler}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Категория"
                                    variant="outlined"
                                    fullWidth
                                    error={isValidated && errors.category.length > 0}
                                    helperText={isValidated ? errors.category[0] : ""}
                                />
                            )}
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
        } else {
            return <></>;
        }
    })
);

export default ProductModal;
