import { Carousel } from "@material-tailwind/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
interface BannerLinks {
  banner1: string;
  banner2: string;
  banner3: string;
}

export default function CustomPage() {
  const [bannerLinks, setBannerLinks] = useState<BannerLinks>({
    banner1: "",
    banner2: "",
    banner3: "",
  });

  useEffect(() => {
    setBannerLinks({
      banner1:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
      banner2:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      banner3:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    });
  }, []);

  const handleBannerLinkChange = useCallback(
    (
      type: string,
      bannerNumber: keyof BannerLinks,
      newLink?: EventTarget & HTMLInputElement
    ) => {
      if (type === "edit") {
        if (newLink && newLink.files && newLink.files.length > 0)
          setBannerLinks((prevState) => ({
            ...prevState,
            [bannerNumber]: URL.createObjectURL(newLink?.files![0]),
          }));
      } else {
        if (bannerNumber === "banner1") {
          setBannerLinks((prevState) => ({
            ...prevState,
            [bannerNumber]:
              "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
          }));
        } else if (bannerNumber === "banner2") {
          setBannerLinks((prevState) => ({
            ...prevState,
            [bannerNumber]:
              "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
          }));
        } else {
          setBannerLinks((prevState) => ({
            ...prevState,
            [bannerNumber]:
              "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
          }));
        }
      }
    },
    [bannerLinks]
  );

  const handleSaveBanner = () => {
    toast.success("Update banner success");
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="flex items-center my-3 justify-between">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Banner</h1>
        {bannerLinks && (
          <button
            className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            onClick={handleSaveBanner}
          >
            Save
          </button>
        )}
      </div>
      <div className="w-full h-80">
        <Carousel placeholder="" className="rounded-xl">
          <img
            src={bannerLinks.banner1}
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src={bannerLinks.banner2}
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src={bannerLinks.banner3}
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>
      <div className="rounded-lg h-auto min-w-0 shadow-xs bg-white my-5 p-4">
        <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold mb-3">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-1 mr-2"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>{" "}
          Edit your banner
        </div>
        <hr className="md:mb-4 mb-3"></hr>
        <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
          <div className="h-auto transition-all duration-500 ease-in-out visibility-visible opacity-100">
            <CustomBanner
              title="Banner 1"
              linkBanner={bannerLinks.banner1}
              handleBannerLinkChange={handleBannerLinkChange}
            />
            <CustomBanner
              title="Banner 2"
              linkBanner={bannerLinks.banner2}
              handleBannerLinkChange={handleBannerLinkChange}
            />
            <CustomBanner
              title="Banner 3"
              linkBanner={bannerLinks.banner3}
              handleBannerLinkChange={handleBannerLinkChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ICustomBanner {
  title: string;
  linkBanner: string;
  handleBannerLinkChange: (
    type: string,
    bannerNumber: keyof BannerLinks,
    newLink?: EventTarget & HTMLInputElement
  ) => void;
}

const CustomBanner: FC<ICustomBanner> = memo((props) => {
  return (
    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600  mb-1">
        {props.title}
      </label>
      <div className="sm:col-span-4">
        <div className="w-full text-center">
          <div
            className="border-2 border-gray-300  border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
            role="presentation"
          >
            <input
              accept="image/*,.jpeg,.jpg,.png,.webp"
              className="block"
              type="file"
              onChange={(e) =>
                props.handleBannerLinkChange(
                  "edit",
                  props.title
                    .toLowerCase()
                    .replace(/\s/g, "") as keyof BannerLinks,
                  e.target
                )
              }
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
          <div className="text-green-500"></div>
          <aside className="flex flex-row flex-wrap mt-4">
            <div className="relative">
              {" "}
              <img
                className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-48 max-h-48 p-2"
                src={props.linkBanner}
                alt="product"
              />
              <button
                type="button"
                className="absolute top-0 right-0 text-red-500 focus:outline-none"
                onClick={() =>
                  props.handleBannerLinkChange(
                    "remove",
                    props.title
                      .toLowerCase()
                      .replace(/\s/g, "") as keyof BannerLinks
                  )
                }
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
});
