import BannerHome from "@/components/PageComponents/Home/BannerHome";
import ListCategory from "@/components/PageComponents/Home/ListCategory";
import ListProductTop from "@/components/PageComponents/Home/ListProductTop";
import { requestPermissions } from "@/firebase/firebaseConfig";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";

function Home() {
    const currentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );
    
    useEffect(() => {
        requestPermissions((currentUser?.status && currentUser?.data?.userId !== "") ? currentUser?.data?.userId : null)
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
