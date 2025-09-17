

/*
Extentable function on controlling the background of the app. 
In initial stage, the background is set as the default one. 
*/

/***************Import Internal Modules****************** */
import basicBackground from '../../../components/masterPage/images/background01.jpg';


const useBackgroundController = () => {

    const appBackground = basicBackground

    document.documentElement.style.setProperty('--backgroundForApp', `url(${appBackground})`);

}

export default useBackgroundController; 