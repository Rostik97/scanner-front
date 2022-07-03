import React, {useEffect} from "react";
import styles from "./TotalPrice.module.css"

const TotalPrice = (props) => {
    const {resultValue} = props;

    useEffect(() => {
        console.log(resultValue)
    })
    return (
        <div className={styles.Price}>
            <h1>Total price:</h1>
            {resultValue && <div className={styles.Result}>{resultValue.reduce((accumulator, object) => accumulator + object.price, 0)} $</div>}

        </div>
    )
}
export default TotalPrice;