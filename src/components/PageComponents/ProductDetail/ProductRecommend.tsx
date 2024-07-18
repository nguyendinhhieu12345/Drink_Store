import { RootState } from "@/redux/store";
import { User } from "@/type";
import { IProduct } from "@/types/type"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as productDetailApi from "@/api/PageApi/productDetailApi"
import * as homeApi from "@/api/PageApi/homeApi"
import { configRouter } from "@/configs/router";
import { formatVND } from "@/utils/hepler";
import { Eye } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

function ProductRecommend() {
    const [products, setProducts] = useState<IProduct[]>()
    const nav = useNavigate()
    const { id } = useParams()
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );
    const { t } = useTranslation()

    useEffect(() => {
        const getProductsRecommend = async () => {
            if (useCurrentUser?.data?.userId) {
                const data = await productDetailApi?.getProductsRecommend(useCurrentUser?.data?.userId, 4)
                if (data?.success) {
                    setProducts(data?.data)
                }
            }
            else {
                const data = await homeApi?.getTopSellingProduct(4)
                if (data?.success) {
                    setProducts(data?.data)
                }
            }
        }
        getProductsRecommend()
    }, [id])

    const handleRedirectProductDetail = (productId: string) => {
        nav(configRouter.productDetail.slice(0, -3) + productId)
    }

    return (
        <div className="py-8">
            <p className="font-semibold mb-3 text-md">{t("Recommended products")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
                {products?.map((product, index) => (
                    <div key={index} className="bg-white m-2 shadow-base p-3 rounded-lg overflow-hidden" onClick={() => handleRedirectProductDetail(product?.id)}>
                        <img src={product.thumbnailUrl} alt={product.name} className="w-full h-48 object-contain" />
                        <div className="p-4">
                            <button className="text-base mb-2 font-semibold hover:text-brown-700 hover:font-medium">{product.name}</button>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-gray-800 font-bold">{formatVND(product.price)}</span>
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

export default ProductRecommend