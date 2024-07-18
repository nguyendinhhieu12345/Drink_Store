import { BaseResponseApi } from "@/type"
import { useEffect, useState } from "react"
import * as couponApi from "@/api/PageApi/couponApi"
import { formatBirthDay, formatVND } from "@/utils/hepler"
import { useTranslation } from "react-i18next"

interface ICouponDetail {
    counponId: string
}

interface UsageCondition {
    type: string;
    value?: number;
}

interface CombinationCondition {
    type: string;
}

interface MinPurchaseCondition {
    value: number;
}

interface Condition {
    type: string;
    usageConditionList?: UsageCondition[];
    minPurchaseCondition?: MinPurchaseCondition;
    combinationConditionList?: CombinationCondition[];
}

interface ICouponDetailResponse extends BaseResponseApi {
    data: {
        conditionList: Condition[],
        description: string,
        code: string,
        startDate: string,
        expirationDate: string,
        type: string
    }
}

function CouponModel(props: ICouponDetail) {
    const [couponDetail, setCouponDetail] = useState<ICouponDetailResponse>()
    const { t } = useTranslation()

    useEffect(() => {
        const getCouponDetail = async () => {
            const data = await couponApi.getCouponDetailRelease(props?.counponId)
            console.log(data)
            if (data?.success) {
                setCouponDetail(data)
            }
        }
        getCouponDetail()
    }, [props.counponId])

    return (
        <div className="flex flex-col text-black">
            <p className="font-semibold text-lg text-center">{couponDetail?.success && couponDetail?.data?.description}</p>
            <div className="border-b-2 pb-2 border-dashed flex flex-col items-center justify-center my-2">
                <img src="https://order.thecoffeehouse.com/_nuxt/img/QR-code.3bf0228.png" alt="qrcode" className="w-25 h-25 object-contain" />
                <p className="mt-2">CODE: <span className="font-semibold text-lg">{couponDetail?.success && couponDetail?.data?.code}</span></p>
            </div>
            <div className="pt-2">
                <div>
                    <p className="font-semibold">{t("Expire")}</p>
                    <p>{couponDetail?.success && formatBirthDay(couponDetail?.data?.startDate)} - {couponDetail?.success && formatBirthDay(couponDetail?.data?.expirationDate)}</p>
                </div>
                {couponDetail?.success &&
                    <div>
                        <p className="font-semibold">{t("Condition")}</p>
                        {
                            couponDetail?.data?.conditionList.map((condition, index) => {
                                if (condition.type === "MIN_PURCHASE") {
                                    return <p key={index}>{t("Min Purchase")}: {formatVND(condition?.minPurchaseCondition?.value ? condition?.minPurchaseCondition?.value : 0)}</p>;
                                } else if (condition.type === "COMBINATION") {
                                    return <p key={index}>{t("Combinable")}: {condition?.combinationConditionList?.map((com, index) => (
                                        <span key={index}>{com.type} </span>
                                    ))}</p>;
                                } else if (condition.type === "USAGE") {
                                    return (
                                        <div key={index}>
                                            <span>{t("Usage Conditions")}: </span>
                                            {condition?.usageConditionList?.map((usage, usageIndex) => (
                                                <span key={usageIndex}>{usage.type === "QUANTITY" ? <>{t("Max")}{` ${usage.value}`}</> : <>{t("Once use per customer")}</>} </span>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            })
                        }
                    </div>}
            </div>
        </div>
    )
}

export default CouponModel