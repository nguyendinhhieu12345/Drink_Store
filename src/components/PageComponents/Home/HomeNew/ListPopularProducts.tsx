import { Eye, Star } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { IListProduct } from "../ListProductTop";
import * as homeApi from "@/api/PageApi/homeApi"
import { formatVND } from "@/utils/hepler";
import { configRouter } from "@/configs/router";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ListPopularProducts() {
    const [activeBtn, setActiveBtn] = useState<number>(0)
    const [products, setProducts] = useState<IListProduct>()
    const nav = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        const getProducts = async () => {
            if (activeBtn === 0) {
                const productRatting = await homeApi.getTopRatingProduct(8)
                if (productRatting?.success) {
                    setProducts(productRatting)
                }
            }
            else if (activeBtn === 1) {
                const productSales = await homeApi.getTopSellingProduct(8)
                if (productSales?.success) {
                    setProducts(productSales)
                }
            }
            else {
                const productTracking = await homeApi.getTrackingProduct(8)
                if (productTracking?.success) {
                    setProducts(productTracking)
                }
            }
        }
        getProducts()
    }, [activeBtn])

    const handleRedirectProductDetail = (productId: string) => {
        nav(configRouter.productDetail.slice(0, -3) + productId);
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className="text-xl sm:text-3xl font-bold mb-4 border-l-4 border-red-500 pl-5 my-5">{t("Popular Products")}</h2>
                <div className='flex items-center'>
                    <button onClick={() => setActiveBtn(0)} className={`px-1.5 sm:px-3 py-2 mx-3 ${activeBtn === 0 && 'text-red-500 border-b-4 border-red-500 font-semibold'} hover:text-red-500  transition ease-in-out delay-75`}>
                        {t("Top Rated")}
                    </button>
                    <button onClick={() => setActiveBtn(1)} className={`px-1.5 sm:px-3 py-2 mx-3 ${activeBtn === 1 && 'text-red-500 border-b-4 border-red-500 font-semibold'} hover:text-red-500 transition ease-in-out delay-75`}>
                        {t("Best Selling")}
                    </button>
                    <button onClick={() => setActiveBtn(2)} className={`px-1.5 sm:px-3 py-2 mx-3 ${activeBtn === 2 && 'text-red-500 border-b-4 border-red-500 font-semibold'} hover:text-red-500 transition ease-in-out delay-75`}>
                        {t("Viewed Products")}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
                {products?.data?.map((product, index) => (
                    <div key={index} className="bg-white m-2 shadow-base p-3 rounded-lg overflow-hidden" onClick={() => handleRedirectProductDetail(product?.id)}>
                        <img src={product.thumbnailUrl} alt={product.name} className="w-full h-48 object-contain" />
                        <div className="p-4">
                            <button className="text-base mb-2 font-semibold hover:text-brown-700 hover:font-medium">{product.name}</button>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-gray-800 font-bold">{formatVND(product.price)}</span>
                                    <p className="hidden sm:flex sm:items-center sm:text-base">{product?.ratingSummary?.quantity} reviews| {product?.ratingSummary?.star.toFixed(1)} <Star size={18} color="#FACC15" weight="fill" /></p>
                                </div>
                                <button className="focus:outline-none z-10 text-white hover:bg-btnActive hover:text-white bg-btnDisable p-2.5 rounded-lg">
                                    <Eye />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListPopularProducts