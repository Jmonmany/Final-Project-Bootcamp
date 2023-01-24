import { loginWithGoogle } from "../../../config";
// import { Uploader } from "../uploader/uploader";

import { Uploader } from "../uploader/uploader";

export function Header({ children }: { children: JSX.Element }) {
    const title = 'Marina Labella';
    const subtitle = 'ILLUSTRATION';
    return (
        <header>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <button onClick={loginWithGoogle}>Login</button>
            {children}
            <Uploader></Uploader>
        </header>
    );
}

