import React, { MouseEvent } from "react";
import "./Products.scss";
import ProductsStore from "./ProductsStore";
import { observer } from "mobx-react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Fab, Tooltip } from "@material-ui/core";
import { DeleteOutlined, Add } from "@material-ui/icons";
import Product, { IProduct } from "../../models/Product";
import CircleButton from "../../components/CircleButton/CircleButton";
import ProductModal from "../../components/ProductModal/ProductModal";
import { v4 as uuid } from "uuid";

interface Column {
    id: keyof IProduct | "action";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "name", label: "Название" },
    { id: "category", label: "Категория" },
    {
        id: "price",
        label: "Цена",
    },
    {
        id: "expirationDate",
        label: "Срок годности",
    },
];

const Products = observer(() => {
    const { saveProduct, deleteProduct, productModalStore, list } = ProductsStore;
    const { selectedProduct, selectProduct } = productModalStore;

    return (
        <div className="products">
            <TableContainer className="container">
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell align="right" style={{ width: 50 }}>
                                <Tooltip title="Добавить товар">
                                    <Fab
                                        color="primary"
                                        size="medium"
                                        onClick={() => selectProduct(new Product({ name: "" }))}
                                    >
                                        <Add />
                                    </Fab>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={row.id || uuid()}
                                onClick={() => selectProduct(row)}
                                className="row"
                            >
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.price} &#8381;</TableCell>
                                <TableCell>{row.expirationDate ? row.expirationDate.format("LL") : ""}</TableCell>
                                <TableCell align="right">
                                    <CircleButton
                                        title="Удалить товар"
                                        icon={DeleteOutlined}
                                        color="secondary"
                                        onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                            event.stopPropagation();
                                            event.preventDefault();
                                            deleteProduct(row.id);
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ProductModal
                visible={!!selectedProduct}
                onClose={() => selectProduct(null)}
                onSave={saveProduct}
                productModalStore={productModalStore}
            />
        </div>
    );
});

export default Products;
