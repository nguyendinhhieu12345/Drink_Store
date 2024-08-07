import { ISearchProduct } from "@/pages/CustomerPage/SearchProduct"
import { Popover, PopoverContent, PopoverHandler, Rating, Typography } from "@material-tailwind/react"
import { Broom, Funnel, ListDashes, SquaresFour } from "@phosphor-icons/react"
import { useState } from "react"
import * as searchApi from "@/api/PageApi/searchApi"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

interface IFilterProduct {
    activeDisplay: boolean,
    setActiveDisplay: React.Dispatch<React.SetStateAction<boolean>>,
    setProducts: React.Dispatch<React.SetStateAction<ISearchProduct | undefined>>
}

function FilterProduct(props: IFilterProduct) {
    const [dataSearch, setDataSearch] = useState<{
        min_price: number,
        max_price: number,
        min_star: number,
        sort_type: string
    }>({
        min_price: 0,
        max_price: 0,
        min_star: 0,
        sort_type: "PRICE_DESC"
    })
    const { t } = useTranslation();

    const handleApplyFilter = async () => {
        if (dataSearch?.min_price <= dataSearch?.max_price) {
            if (localStorage?.getItem("categorySearch")) {
                const data = await searchApi.getProductByCategoryId(localStorage.getItem("categorySearch") as string, 1, dataSearch?.min_price, dataSearch?.max_price, dataSearch?.min_star, dataSearch?.sort_type)
                if (data?.success) {
                    props?.setProducts(data)
                }
            }
            else if (location.search.split("?key=")) {
                const data = await searchApi.getProductByKeyName(1, location.search.split("?key=")[1] ? location.search.split("?key=")[1] : "", dataSearch?.min_price, dataSearch?.max_price, dataSearch?.min_star, dataSearch?.sort_type)
                if (data?.success) {
                    props?.setProducts(data)
                }
            }
        }
        else {
            toast.error("Please enter max price greater than min price!")
        }
    }

    const handleResetFilter = async () => {
        if (localStorage.getItem("categorySearch") === "") {
            const data = await searchApi.getProductByKeyName(1, "", 0, 0, 0, "")
            if (data?.success) {
                props?.setProducts(data)
                setDataSearch({
                    min_price: 0,
                    max_price: 0,
                    min_star: 0,
                    sort_type: "PRICE_DESC"
                })
                localStorage.removeItem("categorySearch")
            }
        }
        else {
            const data = await searchApi.getProductByKeyName(1, location.search.split("?key=")[1] ? location.search.split("?key=")[1] : "", 0, 0, 0, "")
            if (data?.success) {
                setDataSearch({
                    min_price: 0,
                    max_price: 0,
                    min_star: 0,
                    sort_type: "PRICE_DESC"
                })
                localStorage.removeItem("categorySearch")
                props?.setProducts(data)
            }
        }
    }

    return (
        <div className="flex items-center border-t py-3 justify-between">
            <div className="text-sm">
                <p className="hidden sm:block">{location.search.split("?key=")[1] && `Search "${location.search.split("?key=")[1].replace(/%20/g, " ")}"`}</p>
            </div>
            <div className="flex items-center">
                <div className="flex items-center">
                    <p className="text-xs sm:text-sm">{t("Sort by")}:</p>
                    <select className="rounded-lg px-2 py-1 ml-2 text-xs sm:text-sm" onChange={async (e) => {
                        if (localStorage?.getItem("categorySearch")) {
                            const data = await searchApi.getProductByCategoryId(localStorage.getItem("categorySearch") as string, 1, 0, 0, 0, e.target.value)
                            if (data?.success) {
                                props?.setProducts(data)
                            }
                        }
                        else if (location.search.split("?key=")) {
                            const data = await searchApi.getProductByKeyName(1, location.search.split("?key=")[1] ? location.search.split("?key=")[1] : "", 0, 0, 0, e.target.value)
                            if (data?.success) {
                                props?.setProducts(data)
                            }
                        }
                    }}
                        defaultValue="PRICE_ASC"
                    >
                        <option value="PRICE_ASC">
                            {t("Price low to hight")}
                        </option>
                        <option value="PRICE_DESC">
                            {t("Price hight to low")}
                        </option>
                    </select>
                </div>
                <div className="flex items-center text-xs sm:text-sm ml-5">
                    <p>{t("View")}</p>
                    <button className="mr-1" onClick={() => props?.setActiveDisplay(true)}>
                        <SquaresFour size={20} weight={props?.activeDisplay ? "fill" : undefined} className={`${!props.activeDisplay && "opacity-50"}`} />
                    </button>
                    <button className="mr-1" onClick={() => props?.setActiveDisplay(false)}>
                        <ListDashes size={20} weight={!props?.activeDisplay ? "fill" : undefined} className={`${props.activeDisplay && "opacity-50"}`} />
                    </button>
                    <Popover placement="bottom-end">
                        <PopoverHandler>
                            <button>
                                <Funnel size={20} />
                            </button>
                        </PopoverHandler>
                        <PopoverContent placeholder="" className="w-80">
                            <Typography
                                placeholder=""
                                variant="small"
                                color="blue-gray"
                                className="mb-1 font-bold"
                            >
                                {t("Price")} (đ)
                            </Typography>
                            <div className="flex items-center justify-between w-full">
                                <input
                                    value={dataSearch?.min_price}
                                    onChange={
                                        (e) => setDataSearch((prev: {
                                            min_price: number,
                                            max_price: number,
                                            min_star: number,
                                            sort_type: string
                                        }) => ({
                                            ...prev,
                                            min_price: parseInt(e.target.value)
                                        }))
                                    }
                                    step={1000}
                                    type="number"
                                    min={0}
                                    className="block w-25 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-none focus:border-gray-50 "
                                />
                                <p>-</p>
                                <input
                                    value={dataSearch?.max_price}
                                    onChange={
                                        (e) => setDataSearch((prev: {
                                            min_price: number,
                                            max_price: number,
                                            min_star: number,
                                            sort_type: string
                                        }) => ({
                                            ...prev,
                                            max_price: parseInt(e.target.value)
                                        }))
                                    }
                                    step={1000}
                                    min={dataSearch?.min_price}
                                    type="number"
                                    className="block w-25 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-none focus:border-gray-50 "
                                />
                                <button className="px-4 py-2 bg-select rounded-lg text-white" onClick={handleApplyFilter}>{t("Apply")}</button>
                            </div>
                            <Typography
                                placeholder=""
                                variant="small"
                                color="blue-gray"
                                className="my-1 font-bold"
                            >
                                {t("Rating")}
                            </Typography>
                            <div className="flex flex-col">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <button className="flex items-end" key={index} onClick={() => setDataSearch((prev: {
                                        min_price: number,
                                        max_price: number,
                                        min_star: number,
                                        sort_type: string
                                    }) => ({
                                        ...prev,
                                        min_star: index + 1
                                    }))}>
                                        <Rating placeholder="" value={5 - index} ratedColor="amber" readonly />
                                        {index + 1 !== 0 && <p className="ml-2 text-base">{t("And up")}</p>}
                                    </button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                    <button onClick={handleResetFilter}><Broom size={20} /></button>
                </div>
            </div>
        </div>
    )
}

export default FilterProduct