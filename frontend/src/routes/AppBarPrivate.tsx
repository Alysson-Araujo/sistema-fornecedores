import { useContext } from "react";
import AppBarMain from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";


export function AppBarPrivate() {
    const authContext = useContext(AuthContext);
    const signed = authContext?.signed;

    return signed ? <AppBarMain /> : <></>;
}