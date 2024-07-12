import SealPercentSVG from "@/components/SVG/SealPercentSVG";
import { ICheckout, IPropsCheckout } from "./CheckoutDetail";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import ChooseCoupon from "./ChooseCoupon";
import * as checkoutApi from "@/api/PageApi/checkoutApi"
import { Cart } from "@/features/cart/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatVND } from "@/utils/hepler";

// Assuming RewardUnit is an enum
enum RewardUnit {
    MONEY = "MONEY",
    PERCENTAGE = "PERCENTAGE"
}

interface ICouponValidInCart {
    couponType: string;
    violatedCondition: null;
    reward: {
        moneyReward?: {
            unit: string;
            value: number;
        },
        productRewardList?: {
            productName: string;
            productId: string;
            productSize: string;
            quantity: number
        }[],
        subjectInformationList?: {
            id: string;
            name: string
        }[]
    },
    valid: boolean
}

function AddCoupon(props: IPropsCheckout) {
    const [open, setOpen] = useState<boolean>(false)
    const [couponValidInCart, setCouponValidInCart] = useState<ICouponValidInCart[]>()

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    const cartCurrent = useSelector<RootState, Cart[]>(
        (state) => state?.cartSlice?.cartCurrent as Cart[]
    )

    const getTotalItemPriceInCart = () => {
        return ((cartCurrent)?.reduce((total, item) => {
            return total + (item?.itemDetailList)?.reduce((subtotal, item) => {
                return subtotal + (item?.price ?? 0);
            }, 0);
        }, 0) ?? 0)
    }

    function getShippingCouponValue(shippingCouponCode: string, shippingFee: number, shippingCouponResult: ICouponValidInCart): number {
        let result: number = 0;
        if (shippingCouponCode !== null && shippingFee !== null) {
            if (shippingCouponResult?.reward?.moneyReward?.unit === RewardUnit.MONEY) {
                if (shippingCouponResult!.reward!.moneyReward!.value! < shippingFee!) {
                    result += shippingCouponResult!.reward!.moneyReward!.value ?? 0;
                } else {
                    result += shippingFee!;
                }
            } else if (shippingCouponResult?.reward?.moneyReward?.unit === RewardUnit.PERCENTAGE) {
                result += shippingFee! * ((shippingCouponResult!.reward!.moneyReward!.value ?? 0) / 100);
            }
        }
        return result;
    }

    function getOrderCouponValue(orderCouponCode: string, orderCouponResult: ICouponValidInCart, productCouponCode: string, productCouponResult: ICouponValidInCart): number {
        let result: number = 0;
        if (orderCouponCode !== null) {
            if (orderCouponResult?.reward?.moneyReward?.unit === RewardUnit.MONEY) {
                result += orderCouponResult!.reward!.moneyReward!.value ?? 0;
            } else if (orderCouponResult?.reward?.moneyReward?.unit === RewardUnit.PERCENTAGE) {
                result += (getTotalItemPriceInCart() - getProductCouponValue(productCouponCode, productCouponResult)) * ((orderCouponResult!.reward!.moneyReward!.value ?? 0) / 100);
            }
        }
        return result;
    }

    function getProductCouponValue(productCouponCode: string, productCouponResult: ICouponValidInCart): number {
        let result: number = 0;
        if (productCouponCode !== null && !productCouponResult?.reward?.productRewardList) {
            if (productCouponResult?.reward?.moneyReward?.unit === RewardUnit.MONEY) {
                productCouponResult!.reward!.subjectInformationList?.map((product) => {
                    result += getTotalProductById(product!.id!) * (productCouponResult!.reward!.moneyReward!.value ?? 0);
                })

            } else if (productCouponResult?.reward?.moneyReward?.unit === RewardUnit.PERCENTAGE) {
                productCouponResult!.reward!.subjectInformationList?.map((product) => {
                    result += getTotalProductPriceById(product!.id!) * ((productCouponResult!.reward!.moneyReward!.value ?? 0) / 100);
                })
            }
        }
        return result;
    }

    function getTotalProductById(id: string): number {
        const product = cartCurrent.filter((item) => item.productId === id);
        console.log(product)
        const productTotal = product.reduce((total, current) => total + current.itemDetailList.length, 0);
        console.log(productTotal)
        return productTotal;
    }

    function getTotalProductPriceById(id: string): number {
        const totalProductPrice = cartCurrent
            .filter((item) => item.productId === id)
            .reduce((total, current) => total + (current.itemDetailList.reduce((subtotal, item) => subtotal + (item.price || 0), 0)), 0);
        return totalProductPrice;
    }

    function getTotalCouponValue(couponValidInCart: ICouponValidInCart[]): number {
        return getShippingCouponValue(props?.dataCheckout?.shippingCouponCode as string, props?.dataCheckout?.shippingFee as number, couponValidInCart.filter(prev => prev.couponType === "SHIPPING")[0]) +
            getOrderCouponValue(props?.dataCheckout?.orderCouponCode as string, couponValidInCart.filter(prev => prev.couponType === "ORDER")[0], props?.dataCheckout?.productCouponCode as string, couponValidInCart.filter(prev => prev.couponType === "PRODUCT")[0]) +
            getProductCouponValue(props?.dataCheckout?.productCouponCode as string, couponValidInCart.filter(prev => prev.couponType === "PRODUCT")[0]);
    }

    const handleCheckCouponInCart = async () => {
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
        const data = await checkoutApi.checkCouponIncart({
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
            setOpen(prev => !prev)
            setCouponValidInCart(data?.data)
            props?.setDataCheckout((prev: ICheckout | undefined) => (
                {
                    ...prev!,
                    total: (((cartCurrent)?.reduce((total, item) => {
                        return total + (item?.itemDetailList)?.reduce((subtotal, item) => {
                            return subtotal + (item?.price ?? 0);
                        }, 0);
                    }, 0) as number) + (prev?.shippingFee as number)) - getTotalCouponValue(data?.data),
                    ...couponCodes
                }
            ))
            localStorage.setItem("discountValue", getTotalCouponValue(data?.data).toString())
            // console.log(getTotalCouponValue(data?.data))
        }
        // console.log(data)
    }

    return (
        <div className="border shadow-base mt-5 rounded-md p-3">
            <p className="font-semibold text-lg mb-2">Add Coupon</p>
            <div className="flex flex-col text-default font-medium">
                {
                    props?.dataCheckout?.productCouponCode &&
                    <p>Product coupon: {props?.dataCheckout?.productCouponCode}
                        {(couponValidInCart && couponValidInCart?.filter(prev => prev.couponType === "PRODUCT").length > 0)
                            &&
                            (!couponValidInCart?.filter(prev => prev.couponType === "PRODUCT")[0]?.reward?.productRewardList
                                ?
                                ` - ${couponValidInCart?.filter(prev => prev.couponType === "PRODUCT")[0]?.reward?.moneyReward?.unit === "MONEY" ?
                                    formatVND(couponValidInCart?.filter(prev => prev.couponType === "PRODUCT")[0]?.reward?.moneyReward?.value as number)
                                    :
                                    `${couponValidInCart?.filter(prev => prev.couponType === "PRODUCT")[0]?.reward?.moneyReward?.value}%`}
                                `:
                                (<div className="flex">
                                    - Bonus: {couponValidInCart?.filter(prev => prev.couponType === "PRODUCT")[0]?.reward?.productRewardList?.map((item, index) => (
                                        <p key={index}> {item?.quantity} x {item?.productName}</p>
                                    ))}
                                </div>)
                            )

                        }
                    </p>
                }
                {
                    props?.dataCheckout?.orderCouponCode &&
                    <p>
                        Order coupon: {props?.dataCheckout?.orderCouponCode}
                        {(couponValidInCart && couponValidInCart?.filter(prev => prev.couponType === "ORDER").length > 0) && ` - ${couponValidInCart?.filter(prev => prev.couponType === "ORDER")[0]?.reward?.moneyReward?.unit === "MONEY" ? formatVND(couponValidInCart?.filter(prev => prev.couponType === "ORDER")[0]?.reward?.moneyReward?.value as number) : `${couponValidInCart?.filter(prev => prev.couponType === "ORDER")[0]?.reward?.moneyReward?.value}%`}`}
                    </p>
                }
                {
                    props?.dataCheckout?.shippingCouponCode &&
                    <p>
                        Shipping coupon:
                        {props?.dataCheckout?.shippingCouponCode}
                        {(couponValidInCart && couponValidInCart?.filter(prev => prev.couponType === "SHIPPING").length > 0) && ` - ${couponValidInCart?.filter(prev => prev.couponType === "SHIPPING")[0]?.reward?.moneyReward?.unit === "MONEY" ? formatVND(couponValidInCart?.filter(prev => prev.couponType === "SHIPPING")[0]?.reward?.moneyReward?.value as number) : `${couponValidInCart?.filter(prev => prev.couponType === "SHIPPING")[0]?.reward?.moneyReward?.value}%`}`}
                    </p>
                }
                {props?.dataCheckout?.total as number > 0 ?
                    <button onClick={handleOpen} className="flex my-2"><span><SealPercentSVG /></span>Add coupon</button> :
                    <p>Cannot select discount code when total amount is 0</p>
                }
            </div>
            <Dialog size="md" placeholder="" open={open} handler={handleOpen}>
                <DialogHeader placeholder="">Add Coupon</DialogHeader>
                <DialogBody className="p-0" placeholder="">
                    <ChooseCoupon dataCheckout={props?.dataCheckout} setDataCheckout={props?.setDataCheckout} />
                </DialogBody>
                <DialogFooter placeholder="">
                    <Button
                        placeholder=""
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button placeholder="" variant="gradient" color="green"
                        onClick={handleCheckCouponInCart}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default AddCoupon