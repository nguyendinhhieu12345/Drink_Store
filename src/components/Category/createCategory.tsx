import * as categoryApi from "@/api/adminApi/categoryApi/categoryApi";
import useLoading from "@/hooks/useLoading";
import { ICategory } from "@/types/type";
import { checkTypeImage, imageUrlToFile } from "@/utils/const";
import { Spinner, Switch } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ICreateCategory {
  setOpenCreateCategory: React.Dispatch<React.SetStateAction<boolean>>;
  currentCategory?: ICategory | null;
  categorys?: ICategory[];
  type?: string;
}

function CreateCategory(props: ICreateCategory) {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File[]>([]);
  const [status, setStatus] = useState<boolean>(true);
  const { isLoading, startLoading, stopLoading } = useLoading();

  let newCategory = new FormData();

  const handleImageAdd = async (imageUrl: string) => {
    const file = await imageUrlToFile(imageUrl);
    if (file) {
      setImage([...image, file]);
    } else {
      console.log("Failed to convert image URL to file");
    }
  };

  useEffect(() => {
    if (props.type === "edit" && props.currentCategory) {
      setName(props?.currentCategory?.name);
      setStatus(props?.currentCategory?.status === "HIDDEN" ? false : true);
      handleImageAdd(props.currentCategory?.imageUrl);
    }
  }, []);

  const handleClose = () => {
    props.setOpenCreateCategory(false);
  };

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (checkTypeImage(e.target.files)) {
        setImage([...e.target.files]);
      } else {
        toast.error("Only *.jpeg, *.jpg and *.png images will be accepted!", {
          position: "bottom-left",
        });
      }
    }
  };

  const handleAddCategory = async () => {
    startLoading();
    if (image.length > 0 && name.trim() !== "") {
      image.forEach((img) => {
        newCategory.append("image", img);
      });
      newCategory.append("name", name);
      newCategory.append("status", status ? "VISIBLE" : "HIDDEN");
      if (props?.type === "create") {
        const data = await categoryApi.addCategory(newCategory);
        if (data?.success) {
          toast.success(data?.message, {
            position: "bottom-left",
          });
          props.setOpenCreateCategory(false);
          setName("");
          setImage([]);
          stopLoading();
        } else {
          stopLoading();
          console.log(data);
        }
      } else {
        const data = await categoryApi.updateCategory(
          newCategory,
          props?.currentCategory?.id as string
        );
        if (data?.success) {
          toast.success(data?.message, {
            position: "bottom-left",
          });
          props.setOpenCreateCategory(false);
          setName("");
          setImage([]);
          stopLoading();
        } else {
          stopLoading();
          console.log(data);
        }
      }
    } else {
      stopLoading();
      toast.error("Please fill out all fields completely!", {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50">
        <div className="flex md:flex-row flex-col justify-between mr-20">
          <div>
            <h4 className="text-xl font-medium">
              {props?.type === "edit" ? "Edit" : "Add"} Category
            </h4>
            <p className="mb-0 text-sm">
              {props?.type === "edit" ? "Edit" : "Add"} your Product category
              and necessary information from here
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow overflow-y-hidden w-full max-h-full pb-40">
        {/* Input Name */}
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
            Name
          </label>
          <div className="col-span-8 sm:col-span-4">
            <input
              className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
              type="text"
              placeholder="Category title"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>

        {/* Input Image */}
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
            Category Image
          </label>

          <div className="col-span-8 sm:col-span-4">
            <div className="w-full text-center">
              <div className="border-2 border-gray-300 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6">
                <input
                  accept="image/.jpeg,.jpg,.png"
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => {
                    handleInputImage(e);
                  }}
                />
                <label htmlFor="file" className="cursor-pointer">
                  {image.length > 0 ? (
                    <img
                      src={URL.createObjectURL(image[0])}
                      alt="image-category"
                      className="w-full h-60 object-contain"
                    />
                  ) : (
                    <>
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
                      <p className="text-sm mt-2">Choose your images here</p>
                      <em className="text-xs text-gray-400">
                        (Only *.jpeg, *.jpg and *.png images will be accepted)
                      </em>
                    </>
                  )}
                </label>
              </div>
              <div className="text-emerald-500"></div>
              <aside className="flex flex-row flex-wrap mt-4"></aside>
            </div>
          </div>
        </div>

        {/* Choose status */}
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
            Published
          </label>
          <div className="col-span-8 sm:col-span-4">
            <Switch
              color="green"
              onChange={(e) => {
                setStatus(e.target.checked);
              }}
              checked={status}
              crossOrigin={true.toString()}
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100">
        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          <button
            className="transition-colors duration-150 font-medium py-2 text-sm focus:outline-none rounded-lg border 
                  border-gray-200 px-4 mr-3 flex items-center justify-center cursor-pointer bg-white w-full text-red-500
                   hover:bg-red-50 hover:border-red-100 hover:text-red-600 
                   "
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          <button
            className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent hover:bg-green-600 w-full"
            type="submit"
            onClick={handleAddCategory}
          >
            {isLoading ? (
              <p className="flex items-center justify-center">
                <span className="mr-2">
                  {props?.type === "edit" ? "Edit" : "Add"} Category
                </span>{" "}
                <Spinner className="h-4 w-4" />
              </p>
            ) : (
              <span>{props?.type === "edit" ? "Edit" : "Add"} Category</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;
