import assets from "@/assets";
import { configRouter } from "@/configs/router";
import { formatVND } from "@/utils/hepler";
import { Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageWithError from "../ImageError/ImageWithError";

const CartHeader = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRedirectCart = () => {
    navigate(configRouter.home);
  };
  return (
    <div
      className="relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageWithError
        src={assets.images?.imgCart}
        fallbackSrc={assets.images.noAvatar}
        alt="avatar"
        className="rounded-full h-10 w-10 bg-btnDisable cursor-pointer"
      />
      {isHovered && (
        <div className="absolute w-[415px] h-[350px] right-0 z-1 bg-white p-3 border border-[#ccc] rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-y-auto">
          <div className="pb-2 font-semibold opacity-70 text-[14px]">
            New products added
          </div>
          <ItemCart />
          <ItemCart />
          <ItemCart />
          <div className="absolute right-3 py-3">
            <button
              onClick={handleRedirectCart}
              className="bg-blue-600 text-white px-3 py-2 rounded-md"
            >
              See All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartHeader;

function ItemCart() {
  return (
    <div className="w-full py-[10px] border-b border-solid border-gray-300">
      <div className="flex-1 h-10 grid grid-cols-[60px_auto_50px] justify-stretch items-center">
        <div className="mr-1 cursor-pointer">
          <img
            className="w-10 h-10 object-cover rounded-md"
            src={assets.images.facebookLogo}
            alt="course image"
            loading="lazy"
          />
        </div>
        <div className="w-[90%] flex flex-col items-start justify-center text-ellipsis overflow-hidden mr-1">
          <div className="text-[14px] text-ellipsis overflow-hidden">
            <p className="font-semibold text-ellipsis overflow-hidden cursor-pointer">
              Coffe
            </p>
          </div>
          <div className="flex">
            <p className="text-[14px] text-blue-600 font-semibold">
              {formatVND(0)}
            </p>
          </div>
        </div>
        <div className="w-full text-center">
          <button className="hover:text-blue-500 py-1 px-3 transition-all rounded-md">
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
