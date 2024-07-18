import { useEffect, useState } from "react"
import { ICheckout, IPropsCheckout } from "./CheckoutDetail"
import { BaseResponseApi } from "@/type";
import * as checkoutApi from "@/api/PageApi/checkoutApi"
import { Checkbox } from "@material-tailwind/react";
import { Cart } from "@/features/cart/cartSlice";
import { formatBirthDay, formatVND } from "@/utils/hepler";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";

interface Coupon {
    couponId: string;
    code: string;
    description: string;
    expirationDate: number;
    valid: boolean;
    subjectConditionList?: SubjectCondition[];
    minPurchaseCondition?: {
        value: number
    }
}

interface SubjectCondition {
    productName: string;
    value: number;
}

interface CouponData extends BaseResponseApi {
    data: {
        shippingNoCombineBy: string[];
        shippingCouponList: Coupon[];
        orderNoCombineBy: string[];
        orderCouponList: Coupon[];
        productNoCombineBy: string[];
        productCouponList: Coupon[];
    }
}

function ChooseCoupon(props: IPropsCheckout) {
    const [couponValid, setCouponValid] = useState<CouponData>()
    const cartCurrent = useSelector<RootState, Cart[]>(
        (state) => state?.cartSlice?.cartCurrent as Cart[]
    )
    const { t } = useTranslation()

    const getCouponValid = async () => {
        const productCouponCode = props?.dataCheckout?.productCouponCode;
        const orderCouponCode = props?.dataCheckout?.orderCouponCode;
        const shippingCouponCode = props?.dataCheckout?.shippingCouponCode;
        const couponCodes: { [key: string]: string } = {};
        if (productCouponCode && productCouponCode !== "") {
            couponCodes.productCouponCode = productCouponCode;
        }
        if (orderCouponCode && orderCouponCode !== "") {
            couponCodes.orderCouponCode = orderCouponCode;
        }
        if (shippingCouponCode && shippingCouponCode !== "") {
            couponCodes.shippingCouponCode = shippingCouponCode;
        }
        const data = await checkoutApi.getValidateListCoupon({
            orderItemList: props?.dataCheckout?.itemList.map(item => {
                const { productId, itemDetailList } = item;
                return {
                    productId,
                    itemDetailList: itemDetailList.map(detail => {
                        const { quantity, toppingNameList, size, note } = detail;
                        if (size) {
                            return {
                                quantity,
                                toppingNameList,
                                size,
                                note
                            };
                        }
                        else {
                            return {
                                quantity,
                                note
                            };
                        }
                    })
                }
            }) as Cart[],
            shippingFee: props?.dataCheckout?.shippingFee as number ?? 0,
            totalPayment: ((cartCurrent)?.reduce((total, item) => {
                return total + (item?.itemDetailList)?.reduce((subtotal, item) => {
                    return subtotal + (item?.price ?? 0);
                }, 0);
            }, 0) ?? 0) + (props?.dataCheckout?.shippingFee as number ?? 0),
            totalItemPrice: (cartCurrent)?.reduce((total, item) => {
                return total + (item?.itemDetailList)?.reduce((subtotal, item) => {
                    return subtotal + (item?.price ?? 0);
                }, 0);
            }, 0) ?? 0,
            ...couponCodes
        })
        if (data?.success) {
            setCouponValid(data)
        }
    }

    useEffect(() => {
        getCouponValid()
    }, [props?.dataCheckout])

    const handleGetCoupon = (type: string, couponCode: string, e?: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "product") {
            if (e?.target.checked) {
                props?.setDataCheckout((prev: ICheckout | undefined) => ({
                    ...prev!,
                    productCouponCode: couponCode,
                }))
            }
            else {
                props?.setDataCheckout((prev: ICheckout | undefined) => {
                    const { productCouponCode, ...rest } = prev!;
                    console.log(productCouponCode)
                    return {
                        ...rest
                    };
                })
            }
            // getCouponValid()
        }
        else if (type === "shipping") {
            if (e?.target.checked) {
                props?.setDataCheckout((prev: ICheckout | undefined) => ({
                    ...prev!,
                    shippingCouponCode: couponCode
                }))
            }
            else {
                props?.setDataCheckout((prev: ICheckout | undefined) => {
                    const { shippingCouponCode, ...rest } = prev!;
                    console.log(shippingCouponCode)
                    return {
                        ...rest
                    };
                })
            }
            // getCouponValid()
        }
        else {
            if (e?.target.checked) {
                props?.setDataCheckout((prev: ICheckout | undefined) => ({
                    ...prev!,
                    orderCouponCode: couponCode
                }))
            }
            else {
                props?.setDataCheckout((prev: ICheckout | undefined) => {
                    const { orderCouponCode, ...rest } = prev!;
                    console.log(orderCouponCode)
                    return {
                        ...rest
                    };
                })
            }
            // getCouponValid()
        }
    }

    const checkDisableCheckBox = (isValid: boolean, couponCode: string, type: string) => {
        if (isValid) {
            if (type === "product") {
                if (props?.dataCheckout?.productCouponCode !== undefined) {
                    if (props?.dataCheckout?.productCouponCode !== couponCode) {
                        console.log(true)
                        return true
                    }
                    else {
                        console.log(false)
                        return false
                    }
                }
                else {
                    console.log(false)
                    return false
                }
            }
            if (type === "shipping") {
                if (props?.dataCheckout?.shippingCouponCode !== undefined) {
                    if (props?.dataCheckout?.shippingCouponCode !== couponCode) {
                        console.log(true)
                        return true
                    }
                    else {
                        console.log(false)
                        return false
                    }
                }
                else {
                    console.log(false)
                    return false
                }
            }
            if (type === "order") {
                if (props?.dataCheckout?.orderCouponCode !== undefined) {
                    if (props?.dataCheckout?.orderCouponCode !== couponCode) {
                        console.log(true)
                        return true
                    }
                    else {
                        console.log(false)
                        return false
                    }
                }
                else {
                    console.log(false)
                    return false
                }
            }
        }
        else {
            console.log(true)
            return true
        }
    }

    return (
        <div className="p-2 border-t max-h-[32rem] overflow-y-auto">
            {(couponValid?.success && couponValid?.data?.productCouponList?.length === 0 && couponValid?.data?.shippingCouponList?.length === 0 && couponValid?.data?.orderCouponList?.length === 0) &&
                <p>{t("There are no coupons displayed")}</p>
            }
            {(couponValid?.success && couponValid?.data?.productCouponList?.length > 0) &&
                <div className="w-full flex items-center justify-between px-3">
                    <h5 className="text-base font-bold uppercase">{t("PRODUCT COUPONS")}</h5>
                </div>
            }
            <div className="flex flex-wrap w-full items-center">
                {couponValid?.success && couponValid?.data?.productCouponList?.map((coupon) => (
                    <>
                        <div className={`${!coupon?.valid && "opacity-45 cursor-not-allowed"} flex w-full items-center justify-between mx-12`} key={coupon?.couponId}>
                            <button className="h-auto max-h-28 block md:flex lg:flex w-[60%] border items-center bg-white rounded-md shadow-base m-3">
                                <div className="p-6 h-full flex items-center justify-items-start">
                                    <figure>
                                        <img alt="image discount" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" className="border rounded-lg" src="https://th.bing.com/th/id/R.486fee971e545a6a0aa2e439b03880d1?rik=NwG3OyQ4BOxWzQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-hvIuzd_3wGY%2fVDqszc7Or1I%2fAAAAAAAABXA%2fL0SdhBe19HE%2fs1600%2fDiscount.png&ehk=vzDpC54Lh5RZKIZV%2bkK5Meac3ACshBu%2bE8VFE8h0nWI%3d&risl=&pid=ImgRaw&r=0" />
                                    </figure>
                                </div>
                                <div className="md:border-l-2 lg:border-l-2 max-h-28 border-dashed h-full relative px-6">
                                    <div className="before:absolute before:p-4 before:rounded-full before:bg-white before:-top-4 before:border-b before:border-gray-300 before:-left-4 
                                    flex lg:my-6 md:my-5 mb-6 items-center
                                    after:absolute after:p-4 after:rounded-full after:bg-white after:-bottom-4 after:border-t after:border-gray-300 after:-left-4">
                                        <div className="w-full flex flex-col items-start justify-start">
                                            <p className="font-semibold leading-5 text-base break-words">{coupon?.description}</p >
                                            <p className="text-sm leading-5 text-gray-500 mt-2">{t("Expire")}: {coupon?.expirationDate ? formatBirthDay(coupon?.expirationDate.toString()) : <>{t("Not expired")}</>}</p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <Checkbox disabled={checkDisableCheckBox(coupon.valid, coupon.code, "product")} defaultChecked={props?.dataCheckout?.productCouponCode === coupon?.code ? true : false} name="product" crossOrigin="true" onChange={(e) => coupon.valid && handleGetCoupon("product", coupon?.code, e)} />
                        </div>
                        <div className="flex flex-col mx-16">
                            {coupon?.minPurchaseCondition && <p>{t("Min purchase require")}: {formatVND(coupon?.minPurchaseCondition?.value)}</p>}
                            {coupon?.subjectConditionList && <div>
                                {t("Bonus")}: {coupon?.subjectConditionList?.map((sub, index) => (
                                    <span>{sub?.value} x {sub?.productName} {index + 1 !== coupon?.subjectConditionList?.length && ", "}</span>
                                ))}
                            </div>}
                            <div>
                                {(!coupon?.valid && couponValid?.data?.productNoCombineBy?.length > 0) && <p>{t("Coupon not combine with")}: {couponValid?.data?.productNoCombineBy}</p>}
                            </div>
                        </div>
                    </>
                ))}
            </div>
            {props?.dataCheckout?.type !== "Take Away" &&
                <>
                    {(couponValid?.success && couponValid?.data?.shippingCouponList?.length > 0) &&
                        <div className="w-full flex items-center justify-between px-3">
                            <h5 className="text-base font-bold uppercase">{t("SHIPPING COUPONS")}</h5>
                        </div>
                    }
                    <div className="flex flex-wrap w-full items-center">
                        {couponValid?.success && couponValid?.data?.shippingCouponList?.map((coupon) => (
                            <>
                                <div className={`${!coupon?.valid && "opacity-45 cursor-not-allowed"} flex w-full items-center justify-between mx-12`} key={coupon?.couponId}>
                                    <button className="h-auto max-h-28 block md:flex lg:flex w-[60%] border items-center bg-white rounded-md shadow-base m-3">
                                        <div className="p-6 h-full flex items-center justify-items-start">
                                            <figure>
                                                <img alt="image discount" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" className="border rounded-lg" src="https://th.bing.com/th/id/R.486fee971e545a6a0aa2e439b03880d1?rik=NwG3OyQ4BOxWzQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-hvIuzd_3wGY%2fVDqszc7Or1I%2fAAAAAAAABXA%2fL0SdhBe19HE%2fs1600%2fDiscount.png&ehk=vzDpC54Lh5RZKIZV%2bkK5Meac3ACshBu%2bE8VFE8h0nWI%3d&risl=&pid=ImgRaw&r=0" />
                                            </figure>
                                        </div>
                                        <div className="md:border-l-2 lg:border-l-2 max-h-28 border-dashed h-full relative px-6">
                                            <div className="before:absolute before:p-4 before:rounded-full before:bg-white before:-top-4 before:border-b before:border-gray-300 before:-left-4 
                                flex lg:my-6 md:my-5 mb-6 items-center
                                after:absolute after:p-4 after:rounded-full after:bg-white after:-bottom-4 after:border-t after:border-gray-300 after:-left-4">
                                                <div className="w-full flex flex-col items-start justify-start">
                                                    <p className="font-semibold leading-5 text-base break-words">{coupon?.description}</p >
                                                    <p className="text-sm leading-5 text-gray-500 mt-2">{t("Expire")}: {coupon?.expirationDate ? formatBirthDay(coupon?.expirationDate.toString()) : <>{t("Not expired")}</>}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </button>

                                    <Checkbox disabled={checkDisableCheckBox(coupon.valid, coupon.code, "shipping")} name="shipping" defaultChecked={props?.dataCheckout?.shippingCouponCode === coupon?.code ? true : false} crossOrigin="true" onChange={(e) => handleGetCoupon("shipping", coupon?.code, e)} />
                                </div>
                                <div className="flex flex-col mx-16">
                                    {coupon?.minPurchaseCondition && <p>{t("Min purchase require")}: {formatVND(coupon?.minPurchaseCondition?.value)}</p>}
                                    <div>
                                        {(!coupon?.valid && couponValid?.data?.shippingNoCombineBy?.length > 0) && <p>{t("Coupon not combine with")}: {couponValid?.data?.shippingNoCombineBy}</p>}
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </>}

            {(couponValid?.success && couponValid?.data?.orderCouponList?.length > 0) &&
                <div className="w-full flex items-center justify-between px-3">
                    <h5 className="text-base font-bold uppercase">{t("ORDER COUPONS")}</h5>
                </div>
            }
            <div className="flex flex-wrap w-full items-center">
                {couponValid?.success && couponValid?.data?.orderCouponList?.map((coupon) => (
                    <>
                        <div className={`${!coupon?.valid && "opacity-45 cursor-not-allowed"} flex w-full items-center justify-between mx-12`} key={coupon?.couponId}>
                            <button className="h-auto max-h-28 block md:flex lg:flex w-[60%] border items-center bg-white rounded-md shadow-base m-3">
                                <div className="p-6 h-full flex items-center justify-items-start">
                                    <figure>
                                        <img alt="image discount" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" className="border rounded-lg" src="https://th.bing.com/th/id/R.486fee971e545a6a0aa2e439b03880d1?rik=NwG3OyQ4BOxWzQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-hvIuzd_3wGY%2fVDqszc7Or1I%2fAAAAAAAABXA%2fL0SdhBe19HE%2fs1600%2fDiscount.png&ehk=vzDpC54Lh5RZKIZV%2bkK5Meac3ACshBu%2bE8VFE8h0nWI%3d&risl=&pid=ImgRaw&r=0" />
                                    </figure>
                                </div>
                                <div className="md:border-l-2 lg:border-l-2 max-h-28 border-dashed h-full relative px-6">
                                    <div className="before:absolute before:p-4 before:rounded-full before:bg-white before:-top-4 before:border-b before:border-gray-300 before:-left-4 
                                    flex lg:my-6 md:my-5 mb-6 items-center
                                    after:absolute after:p-4 after:rounded-full after:bg-white after:-bottom-4 after:border-t after:border-gray-300 after:-left-4">
                                        <div className="w-full flex flex-col items-start justify-start">
                                            <p className="font-semibold leading-5 text-base break-words">{coupon?.description}</p >
                                            <p className="text-sm leading-5 text-gray-500 mt-2">{t("Expire")}: {coupon?.expirationDate ? formatBirthDay(coupon?.expirationDate.toString()) : <>{t("Not expired")}</>}</p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <Checkbox disabled={checkDisableCheckBox(coupon.valid, coupon.code, "order")} name="order" crossOrigin="true" defaultChecked={props?.dataCheckout?.orderCouponCode === coupon?.code ? true : false} onChange={(e) => handleGetCoupon("order", coupon?.code, e)} />
                        </div>
                        <div className="flex flex-col mx-16">
                            {coupon?.minPurchaseCondition && <p>{t("Min purchase require")}: {formatVND(coupon?.minPurchaseCondition?.value)}</p>}
                            <div>
                                {(!coupon?.valid && couponValid?.data?.orderNoCombineBy?.length > 0) && <p>{t("Coupon not combine with")}: {couponValid?.data?.orderNoCombineBy}</p>}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default ChooseCoupon