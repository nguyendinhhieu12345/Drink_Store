import { Chat, CreditCard, Money, Truck } from '@phosphor-icons/react';

const features = [
    {
        icon: <Truck size={25} />,
        title: "Discount Shipping",
        description: "Discount Shipping for orders",
    },
    {
        icon: <Money size={25} />,
        title: "Refund",
        description: "Within 30 days for an exchange.",
    },
    {
        icon: <Chat size={25} />,
        title: "Support",
        description: "24 hours a day, 7 days a week",
    },
    {
        icon: <CreditCard size={25} />,
        title: "Payment",
        description: "Pay with Multiple Methods",
    }
]

function ListFuture() {
    return (
        <div className='hidden sm:flex items-center justify-between py-5'>
            {features?.map((feature, index) => (
                <div className="flex items-center" key={index}>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300">
                        {feature?.icon}
                    </div>
                    <div className='flex flex-col items-start ml-2'>
                        <h3 className="font-bold text-lg">{feature?.title}</h3>
                        <p className="text-sm text-gray-600">{feature?.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListFuture