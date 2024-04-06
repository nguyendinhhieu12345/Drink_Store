import { Notebook, Truck } from "@phosphor-icons/react"
import Cup from "@/components/SVG/Cup.svg"
import { addToCart } from "@/features/cart/cartSlice"
import { AppDispatch } from "@/redux/store"
import { formatVND } from "@/utils/hepler"
import assets from "@/assets"
import { useDispatch } from "react-redux"
import * as productDetailApi from "@/api/PageApi/productDetailApi"
import { configRouter } from "@/configs/router"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BaseResponseApi } from "@/type"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

interface IProductDetailContent extends BaseResponseApi {
    data: {
        categoryId: string;
        description: string;
        id: string;
        imageUrl: string;
        name: string;
        sizeList: {
            size: string;
            price: number;
        }[],
        status: string;
        toppingList: {
            name: string;
            price: number;
        }[]
    }
}

function ProductDetailContent() {
    const [productDetail, setProductDetail] = useState<IProductDetailContent>()

    const dispatch = useDispatch<AppDispatch>()

    const { id } = useParams()
    const nav = useNavigate()

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const data = await productDetailApi.getProductDetail(id as string)
                if (data?.success) {
                    setProductDetail(data)
                }
            }
            catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    nav(configRouter.home);
                    toast.error("Product not found with id: " + id);
                }
            }
        }
        id && getProductDetail()
    }, [id])

    const handleAddToCart = async () => {
        await dispatch(
            addToCart({
                product_id: "123"
            })
        );
    };

    return (
        <div>
            <div className="flex items-start mb-10">
                <div className="w-1/2">
                    <img src={productDetail?.data?.imageUrl} alt="image product" className="w-142 h-142 object-contain bg-yellow-400" />
                </div>
                <div className="w-1/2">
                    <p className="font-semibold text-3xl">{productDetail?.data?.name}</p>
                    <p className="my-2 font-medium text-2xl text-yellow-500">{formatVND(productDetail?.success ? productDetail?.data?.sizeList[0].price : 0)}</p>
                    <div className="my-6">
                        <p className="font-medium">Select size (required)</p>
                        <div className="flex my-4">
                            {productDetail?.data?.sizeList.map((size, index) => (
                                <button key={index} className="flex items-center border border-gray-300 px-4 py-2 rounded-md mr-4 opacity-80 text-gray-700 active:text-white active:bg-select focus:text-white focus:bg-select">
                                    <Cup className={`w-${index + 4} h-${index + 4} mr-1`} />
                                    <p>{size.size} + {size.price} đ</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="my-6">
                        <p className="font-medium">Topping</p>
                        <div className="flex my-4">
                            {productDetail?.data?.toppingList.map((topping, index) => (
                                <button key={index} className="flex items-center border border-gray-300 px-4 py-2 rounded-md mr-4 opacity-80 text-gray-700 active:text-white active:bg-select focus:text-white focus:bg-select">
                                    <p>{topping.name} + {topping.price} đ</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="my-6">
                        <p className="font-medium">Note</p>
                        <div className="flex my-4">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md opacity-60">
                                <Notebook size={25} />
                            </span>
                            <input type="text" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-0 focus:border-gray-300 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 " placeholder="Note" />
                        </div>
                    </div>
                    <div className="my-10 flex">
                        <button onClick={handleAddToCart} className="w-1/2 mr-5 flex justify-center text-white px-4 py-2 rounded-md font-medium items-center gap-3 bg-select active:bg-select focus:bg-select visited:bg-select hover:bg-select">
                            <img src={assets?.images?.imgCart} alt="img add to cart " className="w-5 h-5 object-contain" />
                            Add to cart
                        </button>
                        <button className="w-1/2 flex justify-center text-white px-4 py-2 rounded-md font-medium items-center gap-3 bg-select active:bg-select focus:bg-select visited:bg-select hover:bg-select">
                            <Truck size={25} />
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-y border-gray-200 py-8">
                <p className="font-semibold mb-3 text-md">Product Description</p>
                <p className="text-md">
                    {productDetail?.data?.description}
                </p>
            </div>
        </div>
    )
}

export default ProductDetailContent