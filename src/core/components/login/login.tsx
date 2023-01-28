// import { async } from "@firebase/util";
// import { getAuth } from "firebase/auth";
import { useState, SyntheticEvent } from "react";
// import { login, loginWithGoogle } from "../../../config";
import './login.scss'
export function Login() {
    
    const initialFormData = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        // const userCredentials = await login(formData.email, formData.password)
        // handleUser(userCredentials.user.uid);
        // console.log(userCredentials.user.uid);
        // console.log(process.env.REACT_APP_FIREBASE_MARINA_UID);
    };
    
    return (
        <>
            <section className="login">
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onInput={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div className="div__btn">
                        <button type="submit">Submit</button>
                        <span>or</span>
                        <button>Sign in with Google</button>
                    </div>
                </form>
            </section>
        </>
    );
}

