import { Delete } from "@/components/SVG/Delete.svg";
import { configRouter } from "@/configs/router";
import { ArrowLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as productApi from "@/api/adminApi/productApi/productApi";
import * as categoryApi from "@/api/adminApi/categoryApi/categoryApi";
import { ICategory, IProduct } from "@/types/type";
import { toast } from "react-toastify";
import { checkTypeImage, formatVND, imageUrlToFile } from "@/utils/const";
import useLoading from "@/hooks/useLoading";
import { Spinner } from "@material-tailwind/react";

interface IPriceProductSize {
  size: string;
  priceSize: number;
}
interface IPriceProductTopping {
  topping: string;
  priceTopping: number;
}

export default function AddProduct() {
  const [image, setImage] = useState<File[]>([]);
  const [size, setSize] = useState<string>("Small");
  const [pricingSize, setPricingSize] = useState<string>("");
  const [topping, setTopping] = useState<string>("");
  const [pricingTopping, setPricingTopping] = useState<string>("");
  const [listPriceSize, setListPriceSize] = useState<IPriceProductSize[]>([]);
  const [listPriceTopping, setListPriceTopping] = useState<
    IPriceProductTopping[]
  >([]);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [status, setStatus] = useState<string>("AVAILABLE");
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [productEdit, setProductEdit] = useState<IProduct>();

  const nav = useNavigate();
  const location = useLocation();
  const productId = useParams();

  const getAllCategory = async () => {
    const data = await categoryApi.getAllCategory();
    setCategory([...data?.data]);
    if (location.pathname.split("/")[2].split("-")[0] === "add") {
      setCategoryId(data?.data[0]?.id);
    }
  };

  const handleImageAdd = async (imageUrl: string) => {
    const file = await imageUrlToFile(imageUrl);
    if (file) {
      setImage([...image, file]);
    } else {
      console.log("Failed to convert image URL to file");
    }
  };

  const getProductById = async () => {
    const data = await productApi.getProductById(productId?.id as string);
    if (data?.success) {
      console.log(data);
      setProductEdit(data?.data);
      setName(data?.data?.name);
      setDescription(data?.data?.description);
      setCategoryId(data?.data?.categoryId);
      setStatus(data?.data?.status);
      handleImageAdd(data?.data?.imageUrl);
      data?.data?.sizeList?.map((size: any) => {
        setListPriceSize((prev) => {
          if (prev.filter((prev) => prev.size === size?.size).length === 0) {
            return [
              ...prev,
              {
                size: size?.size,
                priceSize: parseInt(size?.price),
              },
            ];
          } else {
            return [...prev];
          }
        });
      });
      data?.data?.toppingList?.map((toppping: any) => {
        setListPriceTopping((prev) => {
          if (
            prev.filter((prev) => prev.topping === toppping?.name).length === 0
          ) {
            return [
              ...prev,
              {
                topping: toppping?.name,
                priceTopping: parseInt(toppping?.price),
              },
            ];
          } else {
            return [...prev];
          }
        });
      });
    }
  };

  useEffect(() => {
    if (location.pathname.split("/")[2].split("-")[0] === "edit") {
      getAllCategory();
      getProductById();
    } else {
      getAllCategory();
    }
  }, []);

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (checkTypeImage(e.target.files)) {
        setImage([...e.target.files]);
      } else {
        toast.error("Only *.jpeg, *.jpg and *.png images will be accepted");
      }
    }
  };

  const handleRedirectProducts = () => {
    nav(configRouter.products);
  };

  const handleAddPriceProductSize = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (
        listPriceSize.filter((prev) => prev.size.trim() === size.trim())
          .length === 0
      ) {
        if (parseInt(pricingSize) > 0) {
          setListPriceSize((prev) => [
            ...prev,
            {
              size: size.trim(),
              priceSize: parseInt(pricingSize),
            },
          ]);
          toast.success("Added size successfully");
          setSize("Small");
          setPricingSize("");
        } else {
          toast.error("Price not available");
        }
      } else {
        toast.error("Size already exists");
        setPricingSize("");
      }
    }
  };

  const handleAddPriceProductTopping = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (
        listPriceTopping.filter(
          (prev) => prev.topping.trim() === topping.trim()
        ).length === 0
      ) {
        if (parseInt(pricingTopping) > 0) {
          setListPriceTopping((prev) => [
            ...prev,
            {
              topping: topping.trim(),
              priceTopping: parseInt(pricingTopping),
            },
          ]);
          toast.success("Added topping successfully");
          setTopping("");
          setPricingTopping("");
        } else {
          toast.error("Price not available");
        }
      } else {
        toast.error("Topping already exists");
        setPricingTopping("");
        setTopping("");
      }
    }
  };

  const handleAddProduct = async () => {
    if (name.trim() !== "" && description.trim() !== "" && image.length > 0) {
      startLoading();
      let formData = new FormData();
      // Thêm các trường dữ liệu vào FormData
      listPriceSize.forEach((size, index) => {
        formData.append(
          `sizeList[${index}].size`,
          size.size.toString().toUpperCase()
        );
        formData.append(`sizeList[${index}].price`, size.priceSize.toString());
      });

      listPriceTopping.forEach((topping, index) => {
        formData.append(
          `toppingList[${index}].name`,
          topping.topping.toString()
        );
        formData.append(
          `toppingList[${index}].price`,
          topping.priceTopping.toString()
        );
      });

      formData.append("name", name);
      formData.append("status", status);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      image.forEach((img) => {
        formData.append("image", img);
      });
      if (location.pathname.split("/")[2].split("-")[0] === "add") {
        try {
          const data = await productApi.addProduct(formData, "BEVERAGE");
          if (data?.success) {
            stopLoading();
            toast.success(data?.message);
            nav(configRouter.products);
          } else {
            stopLoading();
            toast.error(data?.message);
          }
        } catch (err: any) {
          stopLoading();
          toast.error(err?.response?.data?.message);
        }
      } else {
        try {
          const data = await productApi.updateProduct(
            formData,
            productId?.id as string
          );
          if (data?.success) {
            stopLoading();
            toast.success(data?.message);
            nav(configRouter.products);
          } else {
            stopLoading();
            toast.error(data?.message);
          }
        } catch (err: any) {
          stopLoading();
          toast.error(err?.response?.data?.message);
        }
      }
    } else {
      toast.error("Please fill out all fields completely");
    }
  };

  const handleDeleSize = (size: string) => {
    setListPriceSize((listPriceSize) =>
      listPriceSize.filter((prev) => prev.size.trim() !== size.trim())
    );
  };

  const handleDeleTopping = (topping: string) => {
    setListPriceTopping((listTopping) =>
      listTopping.filter((prev) => prev.topping.trim() !== topping.trim())
    );
  };

  return (
    <>
      {productEdit?.id ? (
        <div className="w-full h-auto min-h-full overflow-auto py-3 px-8 ">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="mr-3 cursor-pointer p-2 hover:bg-gray-300 rounded-full"
                onClick={handleRedirectProducts}
              >
                <ArrowLeft />
              </div>
              <p className="text-lg font-semibold">
                {location.pathname.split("/")[2].split("-")[0] === "add"
                  ? "Add"
                  : "Edit"}{" "}
                Product
              </p>
            </div>
            <div>
              <button
                className="px-4 py-2 bg-green-400 rounded-full text-white"
                onClick={handleAddProduct}
              >
                {isLoading ? (
                  <p className="flex items-center justify-center">
                    <span className="mr-2">Save</span>{" "}
                    <Spinner className="h-4 w-4" />
                  </p>
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          </div>
          <div className="w-full h-auto flex">
            <div className="w-[70%] flex flex-col">
              {/* Enter information product */}
              <div className="w-full h-auto bg-white rounded-xl p-3">
                <div className="mb-3">
                  <p className="mb-3 font-normal text-sm">Title</p>
                  <input
                    className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                    type="text"
                    placeholder="Product name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="mb-2">
                  <p className="mb-3 font-normal text-sm">Description</p>
                  <textarea
                    className="block w-full border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2 min-h-20 h-40 max-h-60"
                    placeholder="Desciption"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
                <div className="">
                  <p className="mb-3 font-normal text-sm">Category</p>
                  <select
                    className="w-full rounded-xl text-base"
                    defaultValue={
                      category?.filter((cate) => cate.id === categoryId)
                        .length > 0
                        ? category.filter((cate) => cate.id === categoryId)[0]
                            ?.name
                        : category[0]?.name
                    }
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {category?.map((cate, index) => (
                      <option key={index} value={cate.id}>
                        {cate.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Enter image product */}
              <div className="mt-6 w-full h-auto bg-white rounded-xl p-3">
                <label className="block mb-3 w-full text-gray-800 font-medium text-sm">
                  Thumnail Product
                </label>
                <div className="w-full">
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
                            <p className="text-sm mt-2">
                              Choose your images here
                            </p>
                            <em className="text-xs text-gray-400">
                              (Only *.jpeg, *.jpg and *.png images will be
                              accepted)
                            </em>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enter topping */}
              <div className="mt-6 w-full h-auto bg-white rounded-xl p-3">
                <label className="block mb-3 w-full text-gray-800 font-medium text-sm">
                  Pricing
                </label>
                <div className="flex items-center justify-around">
                  <div className="mb-3 w-[48%]">
                    <p className="mb-3 font-normal text-sm">Size</p>
                    <select
                      className="w-full rounded-xl text-base"
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                      value={size}
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                  <div className="mb-3 w-[48%]">
                    <p className="mb-3 font-normal text-sm">
                      Price <span className="text-xs">(đ)</span>
                    </p>
                    <input
                      className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                      type="number"
                      placeholder="Product price"
                      id="priceSize"
                      name="priceSize"
                      value={pricingSize}
                      onChange={(e) => {
                        setPricingSize(e.target.value);
                      }}
                      onKeyDown={handleAddPriceProductSize}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-around">
                  <div className="mb-3 w-[48%]">
                    <p className="mb-3 font-normal text-sm">Topping</p>
                    <input
                      className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                      type="text"
                      placeholder="Topping"
                      id="topping"
                      name="topping"
                      value={topping}
                      onChange={(e) => {
                        setTopping(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3 w-[48%]">
                    <p className="mb-3 font-normal text-sm">
                      Price <span className="text-xs">(đ)</span>
                    </p>
                    <input
                      className="block w-full h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600 p-2"
                      type="number"
                      placeholder="Product price"
                      id="priceTopping"
                      name="priceTopping"
                      value={pricingTopping}
                      onChange={(e) => {
                        setPricingTopping(e.target.value);
                      }}
                      onKeyDown={handleAddPriceProductTopping}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%] flex flex-col ml-4">
              {/* Set status */}
              <div className="w-full h-auto bg-white rounded-xl p-3">
                <p className="mb-3 font-normal text-sm">Status</p>
                <select
                  className="w-full rounded-xl text-base"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="HIDDEN">HIDDEN</option>
                  <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
                </select>
              </div>

              {/* Overview */}
              <div className="w-full h-auto bg-white rounded-xl p-3 mt-3">
                <p className="mb-3 font-normal text-sm">Overview Pricing</p>
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
                      <tr>
                        <td className="px-4 py-2">Type</td>
                        <td className="px-4 py-2">Price</td>
                        <td className="px-4 py-2 text-right">ACTIONS</td>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
                      {/* display size */}
                      {listPriceSize.map((size, i) => (
                        <tr key={i}>
                          <td className="px-4 py-2">
                            <span className="text-sm">{size.size}</span>
                          </td>
                          <td className="px-4 py-2">
                            <span className="text-sm font-semibold">
                              {formatVND(size.priceSize ? size.priceSize : 0)}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex justify-end text-right">
                              <button
                                className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                onClick={() => handleDeleSize(size.size)}
                              >
                                <p
                                  data-tip="true"
                                  data-for="delete"
                                  className="text-xl"
                                >
                                  <Delete />
                                </p>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* display topping */}
                      {listPriceTopping.map((topping, i) => (
                        <tr key={i}>
                          <td className="px-4 py-2">
                            <span className="text-sm">{topping.topping}</span>
                          </td>
                          <td className="px-4 py-2">
                            <span className="text-sm font-semibold">
                              {formatVND(topping.priceTopping)}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex justify-end text-right">
                              <button
                                className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                onClick={() =>
                                  handleDeleTopping(topping.topping)
                                }
                              >
                                <p
                                  data-tip="true"
                                  data-for="delete"
                                  className="text-xl"
                                >
                                  <Delete />
                                </p>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Product not found</p>
      )}
    </>
  );
}
