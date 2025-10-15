/***************Import external Modules****************** */
import React from 'react';

/***************Import Internal Modules****************** */
import styles from './itemController.module.css';
//import LoadingComponent from '../../../../components/page/loading/LoadingComponent';
import QuantityControl from '../hook/quantityControl/QuantityControl';
import IconSet from '../../../components/app/iconSet/IconComponents';


const ItemControlComponent = React.memo((props) => {

    //Hook actions

    //Extract information from props
    const { data, status, controllerStyle } = props.itemController;
    const { isLoading } = status;
    const { QTYController, buttonController } = data;


    return (
        <div className={controllerStyle.wrapperStyle}>

            <QuantityControl data={QTYController} />
            <button className={styles.submitWrapper} onClick={buttonController.action.handleSubmit}>
                <IconSet data={buttonController.data.submitWording} />
            </button>
            <button className={styles.submitWrapper} onClick={buttonController.action.handleDelete}>
                <IconSet data={buttonController.data.deleteWording} />
            </button>

        </div>
    )


})

export default ItemControlComponent

/*

            {isLoading && <LoadingComponent />}

            {(!isLoading && submitControl.wording === "Update") && (
                <div className={submitControl.wrapperStyle} onClick={submitControl.action(dispatch)} alt="Update Item">
                    <UpdateIcon className={submitControl.iconStyle} />
                </div>
            )}
            {(!isLoading && submitControl.wording === "Add") && (
                <div className={submitControl.wrapperStyle} onClick={submitControl.action(dispatch)} alt="Add Item">
                    <UploadIcon className={submitControl.iconStyle} />
                </div>
            )}

            */