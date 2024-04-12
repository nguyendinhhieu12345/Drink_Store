import AddAddress from "./AddAddress"
import AddPayment from "./AddPayment"
import OrderSumary from "./OrderSumary"

function CheckoutDetail() {

    return (
        <div className="flex items-start">
            <div className="flex flex-col w-1/2">
                <AddAddress />
                <AddPayment />
            </div>
            <OrderSumary />
        </div>
    )
}

export default CheckoutDetail