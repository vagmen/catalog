import React from "react";
import { Tab, Tabs, Dialog, DialogTitle } from "@material-ui/core";
import { observer } from "mobx-react";
import "./ProductModal.scss";

const ProductModal = observer(() => {
    // const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    //     // setValue(newValue);
    //     navBarStore.setTab(newValue);
    //     event.preventDefault();
    // };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        </Dialog>
    );
});

export default ProductModal;
