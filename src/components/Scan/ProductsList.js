import React from "react";
import styles from "./ProductsList.module.css"

const ProductsList = ({products}) => {
    return (
        <div className={styles.Products}>
            <table className={styles.ProductsTable}>
                <thead>
                <tr>
                    <th>
                        Product
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Quantity
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map((product, index) => {
                        return (
                            <tr key={index}>
                                <td className={styles.ProductName}>{product.name}</td>
                                <td className={styles.ProductPrice}>{product.price + "$"}</td>
                                <td className={styles.ProductCount}>1</td>
                            </tr>
                        )
                    })

                }
                </tbody>
            </table>
        </div>


    );
};

export default ProductsList;