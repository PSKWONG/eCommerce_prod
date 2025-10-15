


/***************Import Internal Modules****************** */
import './orderProcessControlButtons.css';
import basic from '../../../../components/pageTemplate/styles/page.module.css';
import './orderProcessControlButtons.css';

const ButtonsComponent = (props) => {

    /***************Import controller data****************** */
    const { data, actions } = props?.controller ?? {};
    const { forward, backward } = data ?? {};
    const { handleCancellation, handleForward, handleBackward } = actions ?? {};

    return (
        <div className={`orderControlButtonsWrapper`}>


            {
                backward && (
                    <>
                        <button className={`${basic.yellowStyles}`} onClick={handleCancellation}>Cancel</button>

                        <button onClick={handleBackward}>{backward}</button>
                    </>
                )
            }
            {
                forward && <button onClick={handleForward} >{forward}</button>
            }
        </div>
    )

};

export default ButtonsComponent; 