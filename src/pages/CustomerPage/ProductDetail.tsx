import ListProductRecommend from "@/components/PageComponents/Home/ListProductRecommend"
import ProductDetailContent from "@/components/PageComponents/ProductDetail/ProductDetailContent"
import Reviews from "@/components/PageComponents/ProductDetail/Reviews"
import { Breadcrumbs } from "@material-tailwind/react"
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
            <div className="py-8">
                <p className="font-semibold mb-3 text-md">Recommended products</p>
                <div className="grid gap-5 grid-cols-5 w-full mt-5">
                    {Array.from({ length: 5 }, (_, index) => (
                        <ListProductRecommend key={index} />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ProductDetail