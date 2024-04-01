import BannerHome from "@/components/PageComponents/Home/BannerHome";
import ListCategory from "@/components/PageComponents/Home/ListCategory";
import ListProductTop from "@/components/PageComponents/Home/ListProductTop";

function Home() {
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
