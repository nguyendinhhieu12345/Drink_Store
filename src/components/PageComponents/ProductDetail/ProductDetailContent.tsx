import { Notebook } from "@phosphor-icons/react"
import Cup from "@/components/SVG/Cup.svg"
import { Cart, IItemDetailList, addToCart, updateCart } from "@/features/cart/cartSlice"
import { AppDispatch, RootState } from "@/redux/store"
import assets from "@/assets"
import { useDispatch, useSelector } from "react-redux"
import * as productDetailApi from "@/api/PageApi/productDetailApi"
import { configRouter } from "@/configs/router"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BaseResponseApi } from "@/type"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { formatVND } from "@/utils/hepler"

interface IProductDetailContent extends BaseResponseApi {
    data: {
        categoryId: string;
        description: string;
        id: string;
        imageUrl: string;
        name: string;
        sizeList?: {
            size: string;
            price: number;
        }[],
        status: string;
        toppingList?: {
            name: string;
            price: number;
        }[],
        type: string,
        price?: number
    }
}

function ProductDetailContent() {
    const [productDetail, setProductDetail] = useState<IProductDetailContent>()
    const [dataAddCart, setDataAddCart] = useState<IItemDetailList>()
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const cartCurrent = useSelector<RootState, Cart[]>(
        (state) => state?.cartSlice?.cartCurrent as Cart[]
    )

    const dispatch = useDispatch<AppDispatch>()

    const { id } = useParams()
    const nav = useNavigate()

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const data = await productDetailApi.getProductDetail(id as string)
                if (data?.success) {
                    setProductDetail(data)
                    setDataAddCart((prev: IItemDetailList | undefined) => ({
                        ...prev!,
                        price: data?.data?.type === "CAKE" ? data?.data?.price : 0,
                        quantity: 1
                    }));
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
        if (dataAddCart?.quantity && dataAddCart?.quantity >= 1 && dataAddCart?.size && dataAddCart?.size !== "") {
            if (cartCurrent?.filter(cart => cart?.productId === productDetail?.data?.id)?.length > 0) {
                const data = await dispatch(
                    updateCart({
                        productId: productDetail?.data?.id as string,
                        itemDetail:
                        {
                            quantity: dataAddCart?.quantity,
                            toppingNameList: dataAddCart?.toppingNameList,
                            size: dataAddCart?.size,
                            note: dataAddCart?.note ?? "",
                            price: (dataAddCart?.price as number) * dataAddCart?.quantity
                        }
                    })
                );
                if (data?.type === "/cart/updateCart/fulfilled") {
                    toast.success("Update product in cart success")
                    nav(configRouter.searchProduct)
                }
            }
            else {
                await dispatch(
                    addToCart({
                        productId: productDetail?.data?.id as string,
                        name: productDetail?.data?.name,
                        imageUrl: productDetail?.data?.imageUrl,
                        itemDetailList: [
                            {
                                quantity: dataAddCart?.quantity,
                                toppingNameList: dataAddCart?.toppingNameList,
                                size: dataAddCart?.size,
                                note: dataAddCart?.note ?? "",
                                price: (dataAddCart?.price as number) * dataAddCart?.quantity
                            }
                        ]
                    })
                );
                toast.success("Add product to cart success")
                nav(configRouter.searchProduct)
            }
        }
        else {
            toast.error("Please select Size and Quantity")
        }
    };

    const TotalPrice = (old: number, newValue: number) => {
        return old + newValue
    }

    const handleAddSize = (
        size: string,
        price: number
    ) => {
        setSelectedSize(size);
        const prevSizePrice = productDetail?.data?.sizeList?.find(s => s.size === selectedSize)?.price || 0;
        setDataAddCart((prev: IItemDetailList | undefined) => ({
            ...prev!,
            size: size,
            price: TotalPrice((prev?.price ?? 0) - prevSizePrice, price),
            quantity: 1
        }));
    }

    const handleAddTopping = (name: string, price: number) => {
        if (selectedToppings.includes(name)) {
            setDataAddCart((prev: IItemDetailList | undefined) => ({
                ...prev!,
                toppingNameList: prev?.toppingNameList?.filter(topping => topping !== name),
                price: (prev?.price ?? 0) - price,
            }));
            setSelectedToppings(selectedToppings.filter(topping => topping !== name));
        } else {
            setDataAddCart((prev: IItemDetailList | undefined) => ({
                ...prev!,
                toppingNameList: [...(prev?.toppingNameList ?? []), name],
                price: (prev?.price ?? 0) + price,
            }));
            setSelectedToppings([...selectedToppings, name]);
        }
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start mb-10">
                <div className="w-full sm:w-1/2">
                    <img src={productDetail?.data?.imageUrl} alt="image product" className="w-142 h-142 object-contain bg-[#fff0f0f0]" />
                </div>
                <div className="w-full sm:w-1/2">
                    <p className="font-semibold text-3xl mt-5 sm:mt-0">{productDetail?.data?.name}</p>
                    <p className="my-2 font-medium text-2xl text-yellow-500">{productDetail?.data?.type === "CAKE" ? formatVND(productDetail?.data?.price ? productDetail?.data?.price : 0) : formatVND((productDetail?.data?.sizeList && productDetail?.data?.sizeList[0]?.price) ? (productDetail?.data?.sizeList && productDetail?.data?.sizeList[0]?.price) : 0)}</p>
                    {productDetail?.data?.type !== "CAKE" &&
                        <div className="my-6">
                            <p className="font-medium">Select size (required)</p>
                            <div className="flex flex-wrap my-4">
                                {productDetail?.data?.sizeList?.map((size, index) => (
                                    <button id={size?.size} onClick={() => handleAddSize(size?.size, size?.price)} key={index}
                                        className={`my-2 flex items-center border border-gray-300 px-4 py-2 rounded-md mr-4 opacity-80 text-gray-700 active:text-white active:bg-select focus:text-white focus:bg-select ${selectedSize === size.size ? 'bg-select text-white' : ''
                                            }`}
                                    >
                                        <Cup className={`w-${index + 4} h-${index + 4} mr-1`} />
                                        <p>{size.size} + {size.price} đ</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    }
                    {productDetail?.data?.type !== "CAKE" &&
                        <div className="my-6">
                            {(productDetail?.success && productDetail?.data?.toppingList && productDetail?.data?.toppingList?.length > 0) && <p className="font-medium">Topping</p>}
                            <div className="flex flex-wrap my-4">
                                {productDetail?.data?.toppingList?.map((topping, index) => (
                                    <button
                                        id={topping?.name}
                                        onClick={() => handleAddTopping(topping?.name, topping?.price)} key={index}
                                        className={`my-2 flex items-center border border-gray-300 px-4 py-2 rounded-md mr-4 opacity-80 text-gray-700 active:text-white active:bg-select 
                                        ${selectedToppings.includes(topping.name) ? 'bg-select text-white' : 'bg-white text-gray-700'
                                            }`}
                                    >
                                        <p>{topping.name} + {topping.price} đ</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    }

                    <div className="my-6">
                        <p className="font-medium">Note</p>
                        <div className="flex my-4">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md opacity-60">
                                <Notebook size={25} />
                            </span>
                            <input onChange={(e) => setDataAddCart((prev: IItemDetailList | undefined) => ({
                                ...prev!,
                                note: e.target.value
                            }))} type="text" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-0 focus:border-gray-300 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 " placeholder="Note" />
                        </div>
                    </div>

                    <div className="my-6">
                        <p className="font-medium">Quantity</p>
                        <div className="flex my-4">
                            <input type="number" min={1}
                                onChange={(e) => setDataAddCart((prev: IItemDetailList | undefined) => ({
                                    ...prev!,
                                    quantity: parseInt(e.target.value),
                                    // price: (prev?.price as number) * parseInt(e.target.value)
                                }))}
                                className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-0 focus:border-gray-300 min-w-0 w-20 text-sm border-gray-300 p-2.5"
                                value={dataAddCart?.quantity ?? 1}
                            />
                        </div>
                    </div>

                    <div className="my-10 flex">
                        <button disabled={productDetail?.data?.status === "TEMPORARY_SUSPENDED" ? true : false} onClick={handleAddToCart}
                            className={`${productDetail?.data?.status === "TEMPORARY_SUSPENDED" && "cursor-not-allowed opacity-60"} w-full mr-5 flex justify-center text-white px-4 py-2 rounded-md font-medium items-center gap-3 bg-select active:bg-select focus:bg-select visited:bg-select hover:bg-select`}
                        >
                            <img src={assets?.images?.imgCart} alt="img add to cart " className="w-5 h-5 object-contain" />
                            {productDetail?.data?.status === "TEMPORARY_SUSPENDED" ? "Suspended" : "Add to cart"}
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
        </div >
    )
}

export default ProductDetailContent