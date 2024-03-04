import { configRouter } from "@/configs/router";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

function AddCampaign() {
  const nav = useNavigate();
  const handleRedirectMarketings = () => {
    nav(configRouter.marketing);
  };

  return (
    <div className="w-full h-auto min-h-full overflow-auto py-3 px-8 ">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 cursor-pointer p-2 hover:bg-gray-300 rounded-full"
            onClick={handleRedirectMarketings}
          >
            <ArrowLeft />
          </div>
          <p className="text-lg font-semibold">Add Campaign</p>
        </div>
        <div>
          <button className="px-4 py-2 bg-green-400 rounded-full text-white">
            Save
          </button>
        </div>
      </div>
      <div className="w-full h-auto flex">
        <div className="w-[50%] flex flex-col">
          <div className="w-full h-auto bg-white rounded-xl p-3">
            <div className="mb-3">
              <p className="mb-3 font-semibold text-sm">Option</p>
              <select className="w-full rounded-xl text-base">
                <option>Discount</option>
                <option>New product</option>
              </select>
            </div>
            <div>
              <p className="mb-3 font-semibold text-sm">Logo</p>
              <div className="w-full">
                <div className="w-full text-center">
                  <div className="border-2 border-gray-300 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6">
                    <input
                      accept="image/*,.jpeg,.jpg,.png,.webp"
                      type="file"
                      className="hidden"
                    />
                    <span className="mx-auto flex justify-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-3xl text-green-500"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="16 16 12 12 8 16"></polyline>
                        <line x1="12" y1="12" x2="12" y2="21"></line>
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                        <polyline points="16 16 12 12 8 16"></polyline>
                      </svg>
                    </span>
                    <p className="text-sm mt-2">Drag your images here</p>
                    <em className="text-xs text-gray-400">
                      (Only *.jpeg, *.webp and *.png images will be accepted)
                    </em>
                  </div>
                  <div className="text-emerald-500"></div>
                  <aside className="flex flex-row flex-wrap mt-4"></aside>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto bg-white rounded-xl p-3 my-3">
            <div className="mb-3">
              <p className="mb-3 font-normal text-sm">Title</p>
              <input
                className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="mb-2">
              <p className="mb-3 font-normal text-sm">Description</p>
              <textarea
                className="block w-full border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2 min-h-20 h-40 max-h-60"
                placeholder="Desciption"
              />
            </div>
          </div>
        </div>
        <div className="w-[50%] flex flex-col ml-4">
          <div className="w-full h-auto bg-white rounded-xl p-3">Overview</div>
        </div>
      </div>
    </div>
  );
}

export default AddCampaign;
