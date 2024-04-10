import BannerHome from "@/components/PageComponents/Home/BannerHome";
import ListCategory from "@/components/PageComponents/Home/ListCategory";
import ListProductTop from "@/components/PageComponents/Home/ListProductTop";
import { requestPermissions } from "@/firebase/firebaseConfig";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import * as userApi from "@/api/PageApi/userApi"

function Home() {
    const currentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const getProfileUser = async (userId: string) => {
        if (!localStorage.getItem('profile')) {
            const data = await userApi.getProfileUser(userId)
            if (data?.success) {
                localStorage.setItem("profile", JSON.stringify(data?.data))
            }
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("fcmTokenId")) {
            requestPermissions((currentUser?.success && currentUser?.data?.userId !== "") ? currentUser?.data?.userId : null)
        }
        if (currentUser?.success) {
            getProfileUser(currentUser?.data?.userId)
        }
    }, [currentUser])

    return (
        <div className="h-auto mt-20 mx-20">
            <BannerHome />
            <ListCategory />
            <ListProductTop title="Rating" />
            <ListProductTop title="Sales" />
        </div>
    );
}

export default Home;
