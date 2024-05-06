import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as productService from "../../service/productService";
import {Flip, toast} from "react-toastify";


export function Logout() {

    const navigation = useNavigate();

    const [isClearLocal, setIsClearLocal] = useState(false);

    const [isBackHome, setIsBackHome] = useState(false);

    useEffect(() => {
        doLogOut();
    }, []);

    useEffect(() => {
        if (isClearLocal) {
            localStorage.removeItem("token");
            localStorage.removeItem("id");

            toast.success('Đăng xuất thành công', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        }
    }, [isClearLocal]);

    const doLogOut = async () => {
        try {
            const resLogout = await productService.logout();
            if (resLogout) {
                setIsClearLocal(true);
                setIsBackHome(true);
            } else {
                setIsBackHome(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (isBackHome) {
            navigation("/")
        }
    }, [isBackHome]);

    return (
        <>
            <div>Loading...</div>
        </>
    )
}