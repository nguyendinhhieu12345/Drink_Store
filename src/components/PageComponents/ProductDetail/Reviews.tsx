import assets from "@/assets"
import { Progress, Rating, Typography } from "@material-tailwind/react"
import { Star } from "@phosphor-icons/react"
import * as productDetailApi from "@/api/PageApi/productDetailApi"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { BaseResponseApi } from "@/type"

interface IReview extends BaseResponseApi {
    data: {
        totalPage: number;
        productReviewList: {
            id: string;
            star: number;
            content: string;
            avatarUrl: string;
            reviewerName: string;
            dislikeQuantity: number;
            likeQuantity: number;
            createdAt: string;
            interaction: string | null
        }[]
    }
}

interface IStatisticProduct extends BaseResponseApi {
    data: {
        reviewCountTotal: number;
        statistics: {
            star: number;
            count: number
        }[]
    }
}

function Reviews() {
    const [reviews, setReviews] = useState<IReview>()
    const [statistiProduct, setStatisticProduct] = useState<IStatisticProduct>()

    const { id } = useParams()
    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const data = await productDetailApi.getReviewProduct(id as string, 1)
                const result = await productDetailApi.getStatisticProduct(id as string)
                if (data?.success) {
                    setReviews(data)
                }
                if (result?.success) {
                    setStatisticProduct(result)
                }
            }
            catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    // nav(configRouter.home);
                    toast.error("Product not found with id: " + id);
                }
            }
        }
        id && getProductDetail()
    }, [id])

    return (
        <>
            <p className="font-semibold mb-3 text-md">Reviews</p>
            <div className="flex item-start">
                <div className="w-[40%]">
                    <p className="font-semibold text-2xl">Customer Reviews</p>
                    <div className="flex items-center gap-2 font-medium my-2">
                        <Rating placeholder="" value={4} readonly ratedColor="amber" />
                        <Typography placeholder="" color="blue-gray" className="font-medium ">
                            Based on {statistiProduct?.success && statistiProduct?.data?.reviewCountTotal} Reviews
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        {
                            statistiProduct?.success && statistiProduct?.data?.statistics.map((total) => (
                                <div key={total.star} className="flex items-center justify-between w-full space-x-3">
                                    <div className="flex items-center">
                                        <p className="w-3">{total?.star}</p> <Star size={23} color="#FACC15" weight="fill" />
                                    </div>
                                    <Progress
                                        color="amber"
                                        placeholder=""
                                        value={(total.count / statistiProduct?.data?.reviewCountTotal) * 100}
                                        className="border-2 border-gray-900/10 bg-blue-100"
                                    />
                                    <div className="space-x-2">
                                        <p className="w-5">{(total.count / statistiProduct?.data?.reviewCountTotal) * 100}%</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-[60%] ml-20">
                    <div className="flex flex-col items-center justify-center">
                        {reviews?.success && reviews?.data?.productReviewList.map((review) => (
                            <div key={review.id} className="w-full mb-5 pb-5">
                                <div className="flex items-center">
                                    <img src={review?.avatarUrl ? review?.avatarUrl : assets?.images?.noAvatar} alt="avatar user" loading="lazy" className="w-11 h-11 object-contain rounded-full border" />
                                    <div className="ml-5">
                                        <p className="font-medium text-sm my-1">{review?.reviewerName}</p>
                                        <Rating placeholder="" value={review?.star} readonly ratedColor="amber" className="w-2 h-2 my-1" />
                                    </div>
                                </div>
                                <p className="text-base italic my-2">{review?.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews