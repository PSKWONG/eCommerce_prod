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
import { useNavigate } from 'react-router';

/***************Import Internal Modules****************** */
import process from '../../data/menuItems.json';
import PageComponent from './buttonControlComponent';
import { OrderPortalDataSharing } from '../orderPortalContainer';
import useDataChecker from '../../hook/dataChecker';
import { resetOrder } from '../../orderSlice';



const ButtonControlContainer = () => {

    //Hook Actions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /*************** Get selected Index ****************** */
    const { data } = useContext(OrderPortalDataSharing).portalProgressData ?? {};
    const currentIndex = data?.currentIndex ?? 0;

    /*************** Initiate Data Checker ****************** */
    const dataChecker = useDataChecker(currentIndex);

    /***************Button Actions****************** */
    const handleCancellation = (event) => {
        event.preventDefault();
        dispatch(resetOrder());
        navigate('/order');
        return;
    };

    const handleForward = async (event) => {

        event.preventDefault();

        dataChecker();

    };

    const handleBackward = (event) => {
        event.preventDefault();
        navigate(process[((currentIndex - 1) ?? 0)].path);
    };


    /***************Export data****************** */
    const exportedData = {
        data: {
            forward: process[currentIndex]?.instructions[1] ?? null,
            backward: process[currentIndex]?.instructions[0] ?? null,
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
