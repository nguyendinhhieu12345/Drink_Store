import assets from "@/assets";
import { configRouter } from "@/configs/router";
import { useNavigate } from "react-router-dom";

const ListCategory = () => {
  const nav = useNavigate()

  const handleRedirectAllCategory = () => {
    nav(configRouter.searchProduct)
  }

  return (
    <div className="flex flex-col items-start justify-center my-10 py-6 w-full h-auto bg-white rounded-lg">
      <div className="mb-2 font-semibold text-start px-3 text-2xl">
        Category
      </div>
      <div className="flex overflow-auto items-center justify-betweenx px-3 w-full">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center max-h-40 w-1/6 my-2 mx-3 py-2 border hover:border-gray-300 cursor-pointer rounded-md"
          >
            <div className="h-20 w-20 rounded-full p-0.5">
              <img
                className="h-full w-full rounded-full border-2 border-white object-cover hover:ease-in-out hover:duration-300 hover:delay-100 hover:scale-[1.2]"
                src={assets.images.imageLogin}
                alt="avatar"
              />
            </div>
            <p className="mt-1 w-14 break-words text-center text-sm text-slate-600 line-clamp-1">
              Coffe
            </p>
          </button>
        ))}
        <button
          onClick={handleRedirectAllCategory}
          className="flex flex-col items-center justify-center max-h-40 w-1/6 my-2 mx-3 py-2 border hover:border-gray-300 cursor-pointer rounded-md"
        >
          <div className="h-20 w-20 rounded-full p-0.5">
            <img
              className="h-full w-full rounded-full border-2 border-white object-cover hover:ease-in-out hover:duration-300 hover:delay-100 hover:scale-[1.2]"
              src={assets.images.imageLogin}
              alt="avatar"
            />
          </div>
          <p className="mt-1 w-14 break-words text-center text-sm text-slate-600 line-clamp-1">
            Order
          </p>
        </button>
      </div>
    </div>
  );
};

export default ListCategory;
