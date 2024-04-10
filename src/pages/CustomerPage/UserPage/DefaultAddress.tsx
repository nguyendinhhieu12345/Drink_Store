import ShowAddress from "@/components/PageComponents/UserPage/AddressDefault/ShowAddress"

function DefaultAddress() {
    return (
        <div className="bg-white h-auto w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <div className="flex items-center justify-between py-1 border-b">
                <h2 className="text-xl font-semibold mb-5">My Address</h2>
                <button className="flex items-center px-3 py-2 bg-btnActive text-white rounded-lg">+ Add Address</button>
            </div>
            <ShowAddress />
        </div>
    )
}

export default DefaultAddress