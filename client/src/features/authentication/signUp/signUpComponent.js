/***************Import external Modules****************** */
import { Form } from 'react-router-dom';

/***************Import Internal Modules****************** */
import pageStyles from '../../../components/pageTemplate/styles/page.module.css';
import boxStyles from '../../../components/pageTemplate/styles/shaddowContainer.module.css';
import formStyles from '../../../components/pageTemplate/styles/form.module.css';


const SignUpComponent = () => {

    return (
        <div>

            

            <h1>Sign Up</h1>

            <Form method="post" className={formStyles.formWrapper} >

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


                <button type="submit">SIGN UP by Email </button>

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