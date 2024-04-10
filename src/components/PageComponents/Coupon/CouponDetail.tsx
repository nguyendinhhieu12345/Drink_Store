import { formatBirthDay } from "@/utils/hepler"
import { ICoupon } from "./CouponComponent"
import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import CouponModel from "./CouponModel";

interface ICouponDetail {
    coupon: ICoupon
}

function CouponDetail(props: ICouponDetail) {

    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <button onClick={handleOpen} className="h-auto max-h-44 block md:flex lg:flex w-[31%] border items-center bg-white rounded-md shadow-base m-3">
                <div className="p-6 flex items-center justify-items-start">
                    <figure>
                        <img alt="image discount" loading="lazy" width="120" height="120" decoding="async" data-nimg="1" className="border rounded-lg" src="https://th.bing.com/th/id/R.486fee971e545a6a0aa2e439b03880d1?rik=NwG3OyQ4BOxWzQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-hvIuzd_3wGY%2fVDqszc7Or1I%2fAAAAAAAABXA%2fL0SdhBe19HE%2fs1600%2fDiscount.png&ehk=vzDpC54Lh5RZKIZV%2bkK5Meac3ACshBu%2bE8VFE8h0nWI%3d&risl=&pid=ImgRaw&r=0" />
                    </figure>
                </div>
                <div className="md:border-l-2 lg:border-l-2 border-dashed h-auto relative p-6">
                    <div className="before:absolute before:p-4 before:rounded-full before:bg-white before:-top-4 before:border-b before:border-gray-300 before:-left-4 
                                flex lg:my-6 md:my-5 mb-6 items-center
                                after:absolute after:p-4 after:rounded-full after:bg-white after:-bottom-4 after:border-t after:border-gray-300 after:-left-4">
                        <div className="w-full flex flex-col items-start justify-start">
                            <p className="font-semibold leading-5 text-lg break-words">{props?.coupon?.description}</p >
                            <p className="text-base leading-5 text-gray-500 mt-2">Start: {formatBirthDay(props?.coupon?.startDate.split("T00")[0])}</p>
                            <p className="text-base leading-5 text-gray-500 mt-2">Expire: {formatBirthDay(props?.coupon?.expirationDate.split("T00")[0])}</p>
                        </div>
                    </div>
                </div>
            </button>
            <Dialog size="xs" placeholder="" open={open} handler={handleOpen}>
                <DialogHeader placeholder="" className="text-center">Counpon Detail</DialogHeader>
                <DialogBody placeholder="" className="min-h-10 overflow-scroll">
                    <CouponModel counponId={props?.coupon?.id} />
                </DialogBody>
                <DialogFooter placeholder="" className="space-x-2">
                    <Button placeholder="" variant="text" color="blue-gray" onClick={handleOpen}>
                        Close
                    </Button>
                </DialogFooter>
            </Dialog></>
    )
}

export default CouponDetail