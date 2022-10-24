import React, {useEffect} from "react";
import styles from "./TotalPrice.module.css"

const TotalPrice = (props) => {
    const {resultValue} = props;

    useEffect(() => {
        console.log(resultValue)
    }, [resultValue])

    return (
        <div className={styles.Price}>
            <span>Total price:</span>
            {
                resultValue &&
                <div className={styles.Result}>
                    {
                        resultValue.products.reduce((accumulator, object) => accumulator + object.price, 0)} $
                </div>
            }

        </div>
    )
}
export default TotalPrice;