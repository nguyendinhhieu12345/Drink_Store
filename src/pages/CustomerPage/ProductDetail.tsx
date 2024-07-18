import ProductDetailContent from "@/components/PageComponents/ProductDetail/ProductDetailContent"
import Reviews from "@/components/PageComponents/ProductDetail/Reviews"
import { Breadcrumbs } from "@material-tailwind/react"
import ProductRecommend from "@/components/PageComponents/ProductDetail/ProductRecommend"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

function ProductDetail() {
    const { id } = useParams()
    const { t } = useTranslation()

    return (
        <div className="h-auto mt-20 px-5 sm:px-5 xl:px-20">
            <div className="py-6 text-md">
                <Breadcrumbs placeholder="" className="bg-white p-0 m-0">
                    <a href="/" className="font-semibold">
                        {t("Home")}
                    </a>
                    <p className="opacity-65 select-none cursor-text hover:text-black focus:text-black visited:text-black">{id}</p>
                </Breadcrumbs>
            </div >
            <ProductDetailContent />
            <div className="border-b border-gray-200 py-8">
                <Reviews />
            </div>
            <ProductRecommend />
        </div >
    )
}

export default ProductDetail