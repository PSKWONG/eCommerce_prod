/*
Progress Guide is a effective when a path is changed 
Logic
1) Get the index of the selected path 
2) Get the latest progress checking from server 
3) Check the progress status of previous page of selected path
    a) If the status is true. The path is ready to navigate  
    b) If the status is false. The path is not ready to navigate. 
    Redirect to the last page with false. 
*/




/***************Import external Modules****************** */
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

/***************Import Internal Modules****************** */
import { OrderPortalDataSharing } from '../orderPortal/orderPortalContainer';
import cancellingHandler from '../middlewares/cancelOrder';
import progressHandler from '../middlewares/progressHandler';

const useProgressGuide = () => {

    //Hook Actions
    //const navigate = useNavigate();
    const dispatch = useDispatch();

    /*************** Get selected Index ****************** */
    const { data, actions } = useContext(OrderPortalDataSharing).portalProgressData ?? {};
    const { currentIndex, progressGuide, section } = data ?? {};
    const { setCurrentIndex } = actions;

    /***************Button Actions****************** */
    const handleCancellation = async (event) => {

        event.preventDefault();

        try {

            const result = await dispatch(cancellingHandler()).unwrap();

            if (result === true) {
                setCurrentIndex(0);
            }

            return;

        } catch (err) {

            setCurrentIndex((prev) => prev);
            return;

        }



    };

    const handleForward = async (event) => {

        if (event) {
            event.preventDefault();
        }

        const result = await dispatch(progressHandler({ currentIndex, progressGuide })).unwrap();


        if (result === true) {
            setCurrentIndex((prev) => {
                return prev + 1;
            })

            return;
        }

        setCurrentIndex((prev) => prev);

        return;

    };

    const handleBackward = (event) => {
        event.preventDefault();

        if (section === 'delivery') {
            setCurrentIndex((prev) => {
                    return prev - 2;
            })
        }

        setCurrentIndex((prev) => {
            if (prev > 0) {
                return prev - 1;
            }
            return prev
        })
        return;
    };


    return {
        handleCancellation,
        handleForward,
        handleBackward
    }

};

export default useProgressGuide; 