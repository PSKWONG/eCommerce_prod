/*
Container for processing data for buttons for Order Process
Logic: 
# Forward Action: 
    Be Avaliable, after: 
    1) Checking the position of selected page 
    2) Completeness of the current page  ( Calling the checking function )
    3) Determine the target page ( stay or forward )
#Backward Action : 
    Be Avaliable before comformation
# Cancel Action: 
    Be avaliable before confirmation 
# Extra Action: ( ??? )
    Avaliable for hook 
*/

/***************Import external Modules****************** */
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

/***************Import Internal Modules****************** */
import PageComponent from './buttonControlComponent';
import { OrderPortalDataSharing } from '../orderPortalContainer';
import useProgressGuide from '../../hook/progressGuide';





const ButtonControlContainer = () => {

    //Import button actions 
    const { handleCancellation, handleForward, handleBackward } = useProgressGuide();


    /*************** Get selected Index ****************** */
    const { data } = useContext(OrderPortalDataSharing).portalProgressData ?? {};
    const { currentIndex, progressGuide } = data ?? {};




    /***************Export data****************** */
    const exportedData = {
        data: {
            forward: progressGuide[currentIndex]?.instructions[1] ?? null,
            backward: progressGuide[currentIndex]?.instructions[0] ?? null,
            status: {

            }
        },
        actions: {
            handleCancellation,
            handleForward,
            handleBackward
        }

    }

    return <PageComponent controller={exportedData} />

};

export default ButtonControlContainer;
