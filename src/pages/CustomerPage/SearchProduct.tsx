import DisplayCategory from "@/components/PageComponents/SearchProduct/DisplayCategory"
import DisplayFollowGrid from "@/components/PageComponents/SearchProduct/DisplayFollowGrid"
import DisplayFollowList from "@/components/PageComponents/SearchProduct/DisplayFollowList"
import FilterProduct from "@/components/PageComponents/SearchProduct/FilterProduct"
import { BaseResponseApi } from "@/type"
import { Breadcrumbs } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import * as searchApi from "@/api/PageApi/searchApi"

export interface ISearchProduct extends BaseResponseApi {
    data: {
        totalPage: number;
        productList: {
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
        }[]
    }
}

function SearchProduct() {
    const [products, setProducts] = useState<ISearchProduct>()
    const [activeDisplay, setActiveDisplay] = useState<boolean>(true)
    const location = useLocation()

    const handleGetProduct = async (categoryId: string, keySearch: string) => {
        if (categoryId === "") {
            const data = await searchApi.getProductByKeyName(1, "", 0, 0, 0, "")
            if (data?.success) {
                setProducts(data)
                localStorage.removeItem("categorySearch")
            }
        }
        else {
            const data = await searchApi.getProductByKeyName(1, keySearch, 0, 0, 0, "")
            if (data?.success) {
                setProducts(data)
            }
        }
    }

    useEffect(() => {
        handleGetProduct(localStorage.getItem("categorySearch") as string, location.search.split("?key=")[1] ? location.search.split("?key=")[1] : "")

        const clearLocalStorage = () => {
            localStorage.removeItem("categorySearch");
        };

        window.addEventListener('beforeunload', clearLocalStorage);

        return () => {
            window.removeEventListener('beforeunload', clearLocalStorage);
            clearLocalStorage();
        };
    }, [location])

    return (
        <div className="h-auto mt-20 mx-5 lg:mx-10 2xl:mx-48">
            <div className="py-5 text-md">
                <Breadcrumbs placeholder="" className="bg-white p-0 m-0">
                    <a href="/" className="font-semibold">
                        Home
                    </a>
                    <p className="opacity-65 select-none cursor-text hover:text-black focus:text-black visited:text-black">Search {location.search.split("?key=")[1] && `"${location.search.split("?key=")[1].replace(/%/g, " ")}"`}</p>
                </Breadcrumbs>
            </div >
            {!location.search.split("?key=")[1] && <DisplayCategory setProducts={setProducts} />}
            <FilterProduct setProducts={setProducts} activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
            {activeDisplay ? <DisplayFollowGrid products={products} /> : <DisplayFollowList products={products} />}
        </div>
    )
}

export default SearchProduct