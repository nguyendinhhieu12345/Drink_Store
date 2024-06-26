import BannerHome from "@/components/PageComponents/Home/BannerHome";
// import ListCategory from "@/components/PageComponents/Home/ListCategory";
// import ListProductTop from "@/components/PageComponents/Home/ListProductTop";
import ShowBlog from "@/components/PageComponents/Home/ShowBlog";
import { requestPermissions } from "@/firebase/firebaseConfig";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import * as userApi from "@/api/PageApi/userApi"
import PopularProducts from "@/components/PageComponents/Home/PopularProducts";


function Home() {
    const currentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const getProfileUser = async (userId: string) => {
        // if (!localStorage.getItem('profile')) {
        const data = await userApi.getProfileUser(userId)
        if (data?.success) {
            localStorage.setItem("profile", JSON.stringify(data?.data))
        }
        // }
    }

    useEffect(() => {
        if (!localStorage.getItem("fcmTokenId")) {
            requestPermissions((currentUser?.success && currentUser?.data?.userId !== "") ? currentUser?.data?.userId : null)
        }
        if (currentUser?.success) {
            getProfileUser(currentUser?.data?.userId)
        }
    }, [])

    return (
        <div className="h-auto mt-20 px-5 sm:px-5 xl:px-20 bg-white rounded-md pb-5">
            {/* <BannerHome />
            <ListCategory />
            <ListProductTop title="Rating" />
            <ListProductTop title="Sales" />
            <ShowBlog title="Blogs Post" /> */}
            <BannerHome />
            <PopularProducts />
            <ShowBlog title="Blogs Post" />
        </div>
    );
}

export default Home;
