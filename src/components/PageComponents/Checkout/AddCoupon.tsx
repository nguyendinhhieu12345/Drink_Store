import SealPercentSVG from "@/components/SVG/SealPercentSVG";
import { IPropsCheckout } from "./CheckoutDetail";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import ChooseCoupon from "./ChooseCoupon";

function AddCoupon(props: IPropsCheckout) {
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className="border shadow-base mt-5 rounded-md p-3">
            <p className="font-semibold text-lg mb-2">Add Coupon</p>
            <div className="flex flex-col text-default font-medium">
                {
                    props?.dataCheckout?.productCouponCode && <p>Product coupon: {props?.dataCheckout?.productCouponCode}</p>
                }
                {
                    props?.dataCheckout?.orderCouponCode && <p>Order coupon: {props?.dataCheckout?.orderCouponCode}</p>
                }
                {
                    props?.dataCheckout?.shippingCouponCode && <p>Shipping coupon: {props?.dataCheckout?.shippingCouponCode}</p>
                }
                <button onClick={handleOpen} className="flex my-2"><span><SealPercentSVG /></span>Add coupon</button>
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
                        onClick={handleOpen}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default AddCoupon