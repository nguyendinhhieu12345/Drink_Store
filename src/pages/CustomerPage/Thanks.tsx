import { useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import { ArrowLeft } from "@phosphor-icons/react";
import { formatVND } from "@/utils/hepler";
import { Edit } from "@/components/SVG/Edit.svg";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Rating,
} from "@material-tailwind/react";
import { useState } from "react";

function OrderDetail() {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen((cur) => !cur);

    const nav = useNavigate();

    const handleRedirectOrders = () => {
        nav(configRouter.home);
    };

    return (
        <div className="px-2 mt-20 mx-40">
            <div className="flex items-center">
                <button
                    onClick={handleRedirectOrders}
                    className="mr-3 cursor-pointer p-2 rounded-full hover:bg-gray-300"
                >
                    <ArrowLeft />
                </button>
                <h1 className="my-6 text-lg font-bold text-gray-700"> Invoice </h1>
            </div>

            <div className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-base overflow-hidden">
                <div>
                    <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 ">
                        <h1 className="font-bold font-serif text-xl uppercase">
                            Invoice
                            <p className="text-xs mt-1 text-gray-500">
                                Status
                                <span className="pl-2 font-medium text-xs capitalize">
                                    {" "}
                                    <span className="font-serif">
                                        <span className="inline-flex text-center px-2 text-sm font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 ">
                                            Created<button className="ml-2"><Edit /></button>
                                        </span>
                                    </span>
                                </span>
                            </p>
                        </h1>
                        <div className="lg:text-right text-left">
                            <p className="text-sm text-gray-500  mt-2">
                                No.1, Vo Van Ngan, Tp. Thu Duc <br></br>
                            </p>
                        </div>
                    </div>
                    <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                        <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                                DATE
                            </span>
                            <span className="text-sm text-gray-500  block">
                                11/04/2024
                            </span>
                        </div>
                        <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                            <span className="font-bold font-serif text-sm uppercase text-gray-600  block">
                                INVOICE NO
                            </span>
                            <span className="text-sm text-gray-500  block">
                                123456789
                            </span>
                        </div>
                        <div className="flex flex-col lg:text-right text-left">
                            <span className="font-bold font-serif text-sm uppercase text-gray-600  block">
                                INVOICE TO
                            </span>
                            <p className="text-sm text-gray-500  mt-2">
                                86/33A, Dinh Phong Phu,  Tang Nhon Phu B, Quan 9 <br></br>
                                0123456789
                                <br></br>
                                <span>
                                    Hieu Nguyen
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full overflow-hidden border border-gray-200  rounded-lg my-8">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200  bg-gray-100 ">
                                    <tr>
                                        <td className="px-4 py-2 text-center">SR.</td>
                                        <td className="px-4 py-2 text-center">Product Title</td>
                                        <td className="px-4 py-2 text-center">DETAIL</td>
                                        <td className="px-4 py-2 text-center">Review</td>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800  bg-white  divide-y divide-gray-100 text-serif text-sm my-2">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <tr className="my-2" key={index}>
                                            <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                                                {index + 1}
                                            </td>
                                            <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                                                <span className="text-gray-700 font-semibold  text-xs text-center my-2">
                                                    Coffe Cabuchino
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap font-bold text-center my-2">
                                                <ul>
                                                    {Array.from({ length: 1 }).map((_, index) => (
                                                        <li key={index}>
                                                            Size: Small - Quantity: 2 -
                                                            price: {formatVND(15000)}{" "}
                                                            <br></br>
                                                            Topping list:
                                                            {
                                                                Array.from({ length: 1 }).map((_, index) => (
                                                                    <span key={index}>
                                                                        Sugar -{" "}
                                                                        {formatVND(
                                                                            1000
                                                                        )}
                                                                    </span>
                                                                ))}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                                                <button onClick={handleOpen}><Edit /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50 ">
                    <div className="flex lg:flex-row md:flex-row flex-col justify-between">
                        <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                                PAYMENT METHOD
                            </span>
                            <span className="text-sm text-gray-500  font-semibold font-serif block">
                                Money <span className="text-yellow-300 px-2.5 py-1 border border-yellow-300 rounded-xl">Unpaid</span>
                            </span>
                        </div>
                        <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                                SHIPPING COST
                            </span>
                            <span className="text-sm text-gray-500  font-semibold font-serif block">
                                {formatVND(
                                    25000
                                )}
                            </span>
                        </div>
                        <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                                TOAL ITEM PRICE
                            </span>
                            <span className="text-sm text-gray-500  font-semibold font-serif block">
                                {formatVND(
                                    60000
                                )}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-wrap">
                            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                                TOTAL AMOUNT
                            </span>
                            <span className="text-xl font-serif font-bold text-red-500  block">
                                {formatVND(
                                    70000
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
                placeholder=""
            >
                <Card placeholder="" className="mx-auto w-full">
                    <CardBody placeholder="" className="flex flex-col gap-4">
                        <div className="flex flex-col items-center justify-center">
                            <img src="https://underconstructionpage.com/wp-content/uploads/2018/03/paid-reviews.png" alt="image review" className="w-full max-h-32 rounded-lg object-cover" />
                            <p className="font-semibold text-lg my-2">Leave a review</p>
                            <div className="text-left w-full">
                                <p>Rating</p>
                                <Rating placeholder="" unratedColor="amber" ratedColor="amber" className="my-2" />
                                <p>Content</p>
                                <input placeholder="Additional review..." className="w-full px-4 py-2 my-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 active:ring-blue-500 active:border-blue-500" />
                                <p className="italic text-sm">*Review will be visible to the public</p>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter placeholder="" className="pt-0">
                        <Button placeholder="" variant="gradient" onClick={handleOpen} fullWidth>
                            Send Review
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    );
}

export default OrderDetail;
