import React from "react";
import "./Products.scss";
import ProductsStore from "./ProductsStore";
import { observer } from "mobx-react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { DeleteOutlined, AddOutlined } from "@material-ui/icons";
import { IProduct } from "../../models/Product";
import CircleButton from "../../components/CircleButton/CircleButton";

interface Column {
    id: keyof IProduct | "action";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "name", label: "Название", minWidth: 170 },
    { id: "category", label: "Категория", minWidth: 100 },
    {
        id: "price",
        label: "Цена",
        minWidth: 170,
    },
    {
        id: "expirationDate",
        label: "Срок годности",
    },
];

const Products = observer(() => {
    const productsStore = ProductsStore;
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
                            <TableCell align="right">
                                <CircleButton title="Добавить товар" icon={AddOutlined} color="primary" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsStore.list.map((row) => (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={row.id}
                                onClick={() => console.log("sdf")}
                                className="row"
                            >
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.price} &#8381;</TableCell>
                                <TableCell>{row.expirationDate.format("LL")}</TableCell>
                                <TableCell align="right">
                                    <CircleButton title="Удалить товар" icon={DeleteOutlined} color="secondary" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <List className="list">
                {productsStore.list.map((product) => (
                    <ListItem key={product.id} button>
                        <ListItemText
                            primary={
                                <div className="list__text">
                                    <span>{product.name}</span>
                                    <span>{product.price} &#8381;</span>
                                </div>
                            }
                            secondary={product.expirationDate.format("LL")}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" color="secondary">
                                <DeleteOutlined />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List> */}
        </div>
    );
});

export default Products;
