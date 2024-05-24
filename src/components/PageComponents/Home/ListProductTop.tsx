import { configRouter } from "@/configs/router";
import { BaseResponseApi } from "@/type";
import { Basket } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as homeApi from "@/api/PageApi/homeApi"
import { dataInitResponseApi, formatVND } from '@/utils/hepler';

interface IListProductTop {
    title: string;
}

interface IProductResponse {
    id: string;
    name: string;
    price: number;
    description: string;
    thumbnailUrl: string;
    status: string;
    ratingSummary: {
        star: number;
        quantity: number
    }
}

interface IListProduct extends BaseResponseApi {
    data: IProductResponse[]
}

interface IHomeProducts {
    rating: IListProduct;
    sales: IListProduct;
}

function ListProductTop({ title }: IListProductTop) {
    const [products, setProducts] = useState<IHomeProducts>(
        {
            rating: { ...dataInitResponseApi, data: [] },
            sales: { ...dataInitResponseApi, data: [] }
        }
    )

    useEffect(() => {
        const getProducts = async () => {
            const productRatting = await homeApi.getTopRatingProduct(5)
            if (productRatting?.success) {
                setProducts((prev: IHomeProducts) => ({
                    ...prev,
                    rating: productRatting
                }))
            }
            const productSales = await homeApi.getTopSellingProduct(5)
            if (productSales?.success) {
                setProducts((prev: IHomeProducts) => ({
                    ...prev,
                    sales: productSales
                }))
            }
        }
        getProducts()
    }, [])

    return (
        <div className="flex flex-col gap-2 px-2 w-full space-y-4 bg-white rounded-lg py-2 lg:py-6 my-5 lg:my-10">
            <div className="w-full flex items-center justify-between px-1">
                <h5 className="text-lg font-bold uppercase">Top {title}</h5>
            </div>
            <div className="flex overflow-auto items-center justify-between lg:grid lg:gap-5 lg:grid-cols-5 w-full px-1 lg:px-3">
                {
                    title === "Rating" ?
                        products?.rating && products?.rating?.success && products?.rating?.data?.map((product) => (
                            <ProductItem {...product} key={product?.id} />
                        ))
                        :
                        products?.sales && products?.sales?.success && products?.sales?.data?.map((product) => (
                            <ProductItem {...product} key={product?.id} />
                        ))
                }
            </div>
        </div>
    );
}

const ProductItem = (product: IProductResponse) => {
    const nav = useNavigate();

    const handleRedirectProductDetail = (productId: string) => {
        nav(configRouter.productDetail.slice(0, -3) + productId);
    };

    return (
        <button
            key={product?.id}
            className="flex items-center justify-center mx-2 min-w-[160px] border border-gray-200 shadow-xl rounded-md lg:rounded-none lg:border-none lg:shadow-none"
            onClick={() => handleRedirectProductDetail(product?.id)}
        >
            <div
                className={`${product?.status === "TEMPORARY_SUSPENDED" && "opacity-60"} lg:rounded-md flex flex-col gap-3 justify-between items-center min-h-[100px] min-w-[70%] max-w-[80%] lg:border lg:border-gray-200 lg:shadow-xl relative`}
            >
                <div className="w-30 h-30 2xl:h-40 2xl:w-40 lg:mx-3 bg-gray-300 rounded-lg mt-3">
                    <img
                        src={product?.thumbnailUrl}
                        alt="image product"
                        className="2xl:h-40 2xl:w-40 rounded-lg"
                        loading="lazy"
                    />
                </div>
                {product?.status === "TEMPORARY_SUSPENDED" && <div className="font-semibold text-red-500 text-sm italic bg-gray-300 px-1 py-1 rounded-tl-2xl rounded-br-2xl absolute left-0.5 top-5">
                    Suspended
                </div>}
                <div className="flex flex-col space-y-2 justify-start p-2.5">
                    <h5 className="text-base font-medium break-all">
                        {product?.name}
                    </h5>
                </div>
                <div className="flex flex-row items-center justify-around w-full mb-2">
                    <p className="text-sm font-light text-gray-600">{formatVND(product?.price ?? 0)}</p>
                    <button className="focus:outline-none z-10 text-white hover:bg-btnActive hover:text-white bg-btnDisable p-2.5 rounded-lg">
                        <Basket />
                    </button>
                </div>
            </div>
        </button>
    )
}

export default ListProductTop;
