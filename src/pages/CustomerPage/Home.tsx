import BannerHome from "@/components/PageComponents/Home/BannerHome";
import ListCategory from "@/components/PageComponents/Home/ListCategory";
import ListProductTop from "@/components/PageComponents/Home/ListProductTop";

function Home() {
  return (
    <div className="h-auto mt-20">
      <BannerHome />
      <ListCategory />
      <div className="flex flex-col gap-2 px-2 w-full space-y-4 bg-white rounded-lg py-6 my-2">
        <div className="w-full flex items-center justify-between px-1">
          <h5 className="text-lg font-bold uppercase">Top Rating Products</h5>
        </div>
        <div className="grid gap-5 grid-cols-5 w-full px-3">
          {Array.from({ length: 5 }, (_, index) => (
            <ListProductTop key={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 px-2 w-full space-y-4 bg-white rounded-lg py-6 my-4">
        <div className="w-full flex items-center justify-between px-1">
          <h5 className="text-lg font-bold uppercase">Top Sales</h5>
        </div>
        <div className="grid gap-5 grid-cols-5 w-full px-3">
          {Array.from({ length: 5 }, (_, index) => (
            <ListProductTop key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
