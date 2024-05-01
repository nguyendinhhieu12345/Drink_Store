import { Radio, Switch, Typography } from "@material-tailwind/react";
import { Coin, Money } from "@phosphor-icons/react";
import { ICheckout, IPropsCheckout } from "./CheckoutDetail";

function AddPayment(props: IPropsCheckout) {
    return (
        <div className="border shadow-base mt-5 rounded-md p-3">
            <p className="font-semibold text-lg mb-2">Payment Method</p>
            <div className="flex flex-col justify-center gap-3 border-b">
                <Radio
                    onClick={() => props?.setDataCheckout((prev: ICheckout | undefined) => (
                        {
                            ...prev!,
                            paymentType: "CASHING"
                        }
                    ))}
                    crossOrigin="true"
                    name="description"
                    defaultChecked
                    label={
                        <div className="flex items-center">
                            <Money size={20} className="mr-1" />
                            <Typography placeholder="" color="blue-gray" className="font-medium">
                                Cash
                            </Typography>
                        </div>
                    }
                />
                <Radio
                    crossOrigin="true"
                    name="description"
                    onClick={() => props?.setDataCheckout((prev: ICheckout | undefined) => (
                        {
                            ...prev!,
                            paymentType: "VNPAY"
                        }
                    ))}
                    label={
                        <div className="flex items-center">
                            <img src="https://th.bing.com/th/id/OIP.pn3RUm1xk1HiAxWIgC6CIwHaHa?rs=1&pid=ImgDetMain" alt="ZaloPay" className="w-5 h-5 object-contain mr-1" />
                            <Typography placeholder="" color="blue-gray" className="font-medium">
                                VnPay
                            </Typography>
                        </div>
                    }
                />
                <Radio
                    crossOrigin="true"
                    name="description"
                    onClick={() => props?.setDataCheckout((prev: ICheckout | undefined) => (
                        {
                            ...prev!,
                            paymentType: "ZALOPAY"
                        }
                    ))}
                    label={
                        <div className="flex items-center">
                            <img src="https://th.bing.com/th/id/R.94da32993bff86ccd2045e51ef57211b?rik=FQ1mOOuuqczYYw&riu=http%3a%2f%2fagiletech.vn%2fwp-content%2fuploads%2f2019%2f06%2fagiletechvietnam-zalopay.png&ehk=I9gnOznX4IszHNUenS707nG9FS2r7xTGgj1YQ4qmZo0%3d&risl=&pid=ImgRaw&r=0" alt="zalopay" className="w-5 h-5 object-contain mr-1" />
                            <Typography placeholder="" color="blue-gray" className="font-medium">
                                Zalo Pay
                            </Typography>
                        </div>
                    }
                />
            </div>
            <div>
                <p className="font-semibold text-base my-2">Coin</p>
                <div className="flex items-center justify-between px-3">
                    <div className="flex items-start">
                        <Coin size={20} weight="fill" className="text-yellow-300 mr-2" />
                        <div>
                            <p className="text-sm">Use coins</p>
                            <p className="text-sm">(Current coins: {JSON.parse(localStorage.getItem("profile") as string)?.coin ?? 0} coins)</p>
                        </div>
                    </div>
                    <div>
                        <Switch color="green" crossOrigin="true" defaultChecked={false} onChange={(e) => {
                            if (e.target.checked) {
                                props?.setDataCheckout((prev: ICheckout | undefined) => (
                                    {
                                        ...prev!,
                                        coin: JSON.parse(localStorage.getItem("profile") as string)?.coin ?? 0
                                    }
                                ))
                            }
                            else {
                                props?.setDataCheckout((prev: ICheckout | undefined) => (
                                    {
                                        ...prev!,
                                        coin: 0
                                    }
                                ))
                            }
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPayment