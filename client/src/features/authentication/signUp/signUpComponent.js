/***************Import external Modules****************** */
import { Form } from 'react-router-dom';
import { useSelector } from 'react-redux';

/***************Import Internal Modules****************** */
import pageStyles from '../../../components/pageTemplate/styles/page.module.css';
import boxStyles from '../../../components/pageTemplate/styles/shaddowContainer.module.css';
import formStyles from '../../../components/pageTemplate/styles/form.module.css';
import IconItem from '../../../components/app/iconSet/IconComponents'; 
import { selectErrorMsg, selectErrorState } from '../authenticationSlice';



const SignUpComponent = (props) => {

    //Import Control from Container
    const { data, actions } = props?.control ?? {};

    //Retrieve Error Message 
    const errorMsg = useSelector(selectErrorMsg);
    const errorStatus = useSelector(selectErrorState);

    let errorContent = (errorMsg ?? []).map((msg, index) => {
        return <span key={index}>{msg}</span>
    })

    return (
        <div>

            <h1>Sign Up</h1>

            {
                errorStatus &&
                (
                    <div className={` ${boxStyles.section} ${pageStyles.orangeStyles} ${pageStyles.errorMessageWrapper}`}>
                        {errorContent}
                    </div>
                )
            }

            <Form method="post" className={formStyles.formWrapper} onChange={actions.handleResetErrorMsg}>

                <div>
                    <label>Email: </label>
                    <input name="email" type="text" />
                </div>
                <div>
                    <label>Password: </label>
                    <input name="password" type='password' />
                </div>
                <div>
                    <label>Confirm password: </label>
                    <input name="passwordCheck" type='password' />
                </div>

                <button type="submit">
                    {!(data?.status?.isSubmitting ?? false) &&
                        <>SIGN UP by Email </>
                    }
                    
                    { (data?.status?.isSubmitting ?? false) &&
                        <IconItem data={'loading'} />
                    }

                </button>

            </Form>

            <div className={` ${boxStyles.section} ${pageStyles.greenStyles}`}>
                <span><strong>Or</strong> sign up through: </span>
            </div>

            <div className={`${boxStyles.section} ${pageStyles.yellowStyles}`}>
                Already member? Login here: <button > LOGIN </button>
            </div>

        </div>
    )
}

export default SignUpComponent; 