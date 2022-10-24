import React from "react";
import styles from "./ResultPersonalPhoto.module.css"

const ResultPersonalPhoto = ({imgs}) => {

    const photos = imgs.map((img, index) => {
        return (
            <img key={index} className={styles.Photo} src={img} alt="screenshot"/>
        )
    })

    return (
        <div className={styles.Photos}>
            {photos}
        </div>

    )
}

export default ResultPersonalPhoto;