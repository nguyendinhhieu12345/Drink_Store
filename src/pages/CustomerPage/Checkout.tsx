import CheckoutDetail from "@/components/PageComponents/Checkout/CheckoutDetail"
import { Money } from "@phosphor-icons/react"

function Checkout() {
    return (
        <div className="h-auto mt-25 mx-40">
            <div className="flex items-center justify-center my-5">
                <div className="mr-2 p-1 rounded-full bg-yellow-300 text-white"><Money /></div>
                <h1 className="font-medium">Shopfee Checkout</h1>
            </div>
            <CheckoutDetail />
        </div>
    )
}

export default Checkout