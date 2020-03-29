import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import { observer } from "mobx-react";
import "./ProductModal.scss";

const ProductModal = observer((props: { visible: boolean; onClose: () => void }) => {
    // const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    //     // setValue(newValue);
    //     navBarStore.setTab(newValue);
    //     event.preventDefault();
    // };

    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.visible}>
            <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        </Dialog>
    );
});

export default ProductModal;
