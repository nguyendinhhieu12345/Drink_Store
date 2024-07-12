import CheckoutDetail from "@/components/PageComponents/Checkout/CheckoutDetail"
import { configRouter } from "@/configs/router";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import { Money } from "@phosphor-icons/react"
import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
    const nav = useNavigate()
    const currentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    useEffect(() => {
        if (!currentUser?.success && !currentUser?.data?.userId || !currentUser) {
            nav(configRouter.login)
            toast.warning("Please login to continue using website services!")
        }

        const clearLocalStorage = () => {
            localStorage.removeItem("discountValue");
        };

        window.addEventListener('beforeunload', clearLocalStorage);

        return () => {
            window.removeEventListener('beforeunload', clearLocalStorage);
            clearLocalStorage();
        };
    }, [])

    return (
        <div className="h-auto mt-25 px-5 sm:px-5 xl:px-20">
            <div className="flex items-center justify-center my-5">
                <div className="mr-2 p-1 rounded-full bg-yellow-300 text-white"><Money /></div>
                <h1 className="font-medium">Shopfee Checkout</h1>
            </div>
            <CheckoutDetail />
        </div>
    )
}

export default Checkout