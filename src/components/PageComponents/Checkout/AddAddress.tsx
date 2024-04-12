import assets from "@/assets"
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import { useState } from "react"

function AddAddress() {
    const [methodDelivery, setMethodDelivery] = useState<string>("Home Delivery")

    return (
        <div className="border shadow-base rounded-md p-3">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-lg mb-2">Add Address</p>
                <Menu>
                    <MenuHandler>
                        <button className="px-3 py-1.5 hover:bg-gray-50 border rounded-xl">{methodDelivery}</button>
                    </MenuHandler>
                    <MenuList placeholder="">
                        <MenuItem placeholder="" onClick={() => setMethodDelivery("Home Delivery")}>Home Delivery</MenuItem>
                        <MenuItem placeholder="" onClick={() => setMethodDelivery("Take Away")}>Take Away</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="flex items-center my-2">
                <div className="flex items-center">
                    <img src={assets.images.delivery} alt="delivery" className="w-7 h-7 object-contain mr-2" />
                    <div className="ml-2">
                        <p className="font-semibold text-default">Hieu Nguyen | 0123456789</p>
                        <p>No.1, Vo Van Ngan, Tp. Thu Duc</p>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default AddAddress