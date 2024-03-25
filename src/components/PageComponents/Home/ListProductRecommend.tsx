import { configRouter } from "@/configs/router";
import { useNavigate } from "react-router-dom";

function ListProductRecommend() {
  const nav = useNavigate();

  const handleRedirectProductDetail = (productId: string) => {
    nav(configRouter.productDetail.slice(0, -3) + productId);
  };

  return (
    <button
      className="flex items-center justify-start"
      onClick={() => handleRedirectProductDetail("id")}
    >
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
          <p className="text-sm font-light text-gray-600">45.000đ</p>
        </div>
      </div>
    </button>
  );
}

export default ListProductRecommend;
