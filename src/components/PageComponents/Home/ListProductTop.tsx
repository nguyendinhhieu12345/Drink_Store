import { configRouter } from "@/configs/router";
import { Basket } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function ListProductTop() {
  return (
    <Link to={configRouter.home} className="flex items-center justify-center">
      <div
        className={`rounded-md flex flex-col gap-3 justify-between items-center min-h-[100px] min-w-[70%] max-w-[80%] border border-gray-200 shadow-xl`}
      >
        <div className="h-40 w-40 bg-gray-300 rounded-lg mt-3">
          <img
            src="https://minio.thecoffeehouse.com/image/admin/1699287050_tra-xanh-latte-nong_400x400.jpg"
            alt="image product"
            className="h-40 w-40 rounded-lg"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col space-y-2 justify-start p-2.5">
          <h5 className="text-base font-medium break-all">
            Trà Xanh Latte (Nóng)
          </h5>
        </div>
        <div className="flex flex-row items-center justify-around w-full mb-2">
          <p className="text-sm font-light text-gray-600">45.000đ</p>
          <button className="focus:outline-none z-10 text-white hover:bg-btnActive hover:text-white bg-btnDisable p-2.5 rounded-lg">
            <Basket />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ListProductTop;
