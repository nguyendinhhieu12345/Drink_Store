import assets from "@/assets"
import { Progress, Rating, Typography } from "@material-tailwind/react"
import { Star, ThumbsDown, ThumbsUp } from "@phosphor-icons/react"
import * as productDetailApi from "@/api/PageApi/productDetailApi"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { AxiosError } from "axios"
// import { toast } from "react-toastify"
import { BaseResponseApi, User } from "@/type"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import TablePaging from "../SearchProduct/Paging"
import { formatTimeStamp } from "@/utils/hepler"
import { useTranslation } from "react-i18next"

export interface IReview extends BaseResponseApi {
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
    const [pageActive, setPageActive] = useState<number>(1);
    const [statistiProduct, setStatisticProduct] = useState<IStatisticProduct>()
    const { t } = useTranslation()

    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const { id } = useParams()

    const getProductDetail = async () => {
        try {
            const data = await productDetailApi.getReviewProduct(id as string, pageActive)
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
                // toast.error("Product not found with id: " + id);
                console.log(e)
            }
        }
    }

    useEffect(() => {
        id && getProductDetail()
    }, [id, pageActive])

    const handleLikeReview = async (interaction: string, reviewId: string) => {
        const data = await productDetailApi?.likeProduct(reviewId, interaction, useCurrentUser?.data?.userId)
        console.log(data)
        if (data?.success) {
            getProductDetail()
        }
    }

    return (
        <>
            <p className="font-semibold mb-3 text-md">{t("Reviews")}</p>
            <div className="flex flex-col sm:flex-row item-start">
                <div className="w-full sm:w-[40%]">
                    <p className="font-semibold text-2xl">{t("Customer Reviews")}</p>
                    <div className="flex items-center gap-2 font-medium my-2">
                        {/* <Rating placeholder="" value={4} readonly ratedColor="amber" /> */}
                        <Typography placeholder="" color="blue-gray" className="font-medium ">
                            {t("Based on")} {statistiProduct?.success && statistiProduct?.data?.reviewCountTotal} {t("Reviews")}
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
                                        value={statistiProduct?.data?.reviewCountTotal === 0 ? 0 : (total.count / statistiProduct?.data?.reviewCountTotal) * 100}
                                        className="border-2 border-gray-900/10 bg-blue-100"
                                    />
                                    <div className="space-x-2">
                                        <p className="w-5">{statistiProduct?.data?.reviewCountTotal === 0 ? 0 : ((total.count / statistiProduct?.data?.reviewCountTotal) * 100).toFixed(1)}%</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-full mt-4 sm:mt-0 sm:w-[60%] sm:ml-20">
                    <div className="flex flex-col items-center justify-center">
                        {reviews?.data?.productReviewList?.length === 0 && <p className="w-full mb-5 pb-5 italic">{t("No reviews")}</p>}
                        {reviews?.success && reviews?.data?.productReviewList.map((review) => (
                            <div key={review.id} className="w-full mb-2 pb-5">
                                <div className="flex items-center">
                                    <img src={review?.avatarUrl ? review?.avatarUrl : assets?.images?.noAvatar} alt="avatar user" loading="lazy" className="w-11 h-11 object-contain rounded-full border" />
                                    <div className="ml-5">
                                        <p className="font-medium text-sm my-1">{review?.reviewerName}</p>
                                        <Rating placeholder="" value={review?.star} readonly ratedColor="amber" className="w-1 h-1 my-1" />
                                        <p className="text-xs my-1 italic">{formatTimeStamp(review?.createdAt)}</p>
                                    </div>
                                </div>
                                <p className="text-base italic my-1">{review?.content}</p>
                                <div className="flex items-center">
                                    <button onClick={() => handleLikeReview("LIKE", review?.id)}><ThumbsUp size={20} color={review?.interaction === "LIKE" ? "blue" : "black"} weight={review?.interaction === "LIKE" ? "fill" : "regular"} /></button>
                                    <button onClick={() => handleLikeReview("DISLIKE", review?.id)} className="ml-3"><ThumbsDown size={20} color={review?.interaction === "DISLIKE" ? "blue" : "black"} weight={review?.interaction === "DISLIKE" ? "fill" : "regular"} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {reviews?.success && reviews?.data?.totalPage >= 2 && (
                        <TablePaging
                            data={reviews}
                            setPageActive={setPageActive}
                            pageActive={pageActive}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default Reviews