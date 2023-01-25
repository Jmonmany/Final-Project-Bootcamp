// import { loginWithGoogle } from "../../../config";
export function Header({ children }: { children: JSX.Element }) {
    const title = 'Marina Labella';
    const subtitle = 'ILLUSTRATION';
    return (
        <header>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            {/* <button onClick={loginWithGoogle}>Login</button> */}
            {children}
        </header>
    );
}

