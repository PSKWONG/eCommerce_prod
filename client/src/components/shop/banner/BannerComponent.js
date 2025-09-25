

/***************Import Internal Modules****************** */
import styles from './banner.module.css'; 

const BannerComponent = () => {

    return (
        <div className={`${styles.sloganWrapper}`}>
            <h1>
                Bring Plant to <strong>HOME</strong>
            </h1>
        </div>
    )
}

export default BannerComponent; 