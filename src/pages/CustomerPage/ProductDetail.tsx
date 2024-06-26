import ProductDetailContent from "@/components/PageComponents/ProductDetail/ProductDetailContent"
import Reviews from "@/components/PageComponents/ProductDetail/Reviews"
import { Breadcrumbs } from "@material-tailwind/react"
import ProductRecommend from "@/components/PageComponents/ProductDetail/ProductRecommend"
import { useParams } from "react-router-dom"

function ProductDetail() {
    const { id } = useParams()

    return (
        <div className="h-auto mt-20 mx-25">
            <div className="py-6 text-md">
                <Breadcrumbs placeholder="" className="bg-white p-0 m-0">
                    <a href="/" className="font-semibold">
                        Home
                    </a>
                    <a href="/" className="font-semibold">
                        Menu
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