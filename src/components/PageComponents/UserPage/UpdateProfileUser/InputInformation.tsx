// import * as userApi from "@/api/PageApi/userApi"
// import { ChangeEvent, useState } from "react";

// interface IDataUpdateUser {
//     firstName: string,
//     lastName: string,
//     birthDate: string,
//     gender: string,
//     phoneNumber: string
// }

function InputInformation() {
    // const [dataUpdate, setDataUpdate] = useState<IDataUpdateUser>()

    // const handleInputChange = (
    //     event: ChangeEvent<HTMLInputElement>,
    //     key: string
    // ): void => {
    //     const { value } = event.target;
    //     setDataUpdate((prevState: IDataUpdateUser) => ({
    //         ...prevState,
    //         [key]: value,
    //     }));
    // };

    return (
        <div className="mt-10 sm:mt-0">
            <div className="md:grid-cols-6 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="lg:mt-6 mt-4 bg-white">
                        <div className="grid grid-cols-6 gap-6">
                            <InputWrap title="First Name" type="text" key="firstName"  />
                            <InputWrap title="Last Name" type="text" />
                            <InputWrap title="Phone/Number" type="text" />
                            <InputWrap title="Email" type="email" />
                            <InputWrap title="Birthday" type="date" />
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block text-gray-500 font-medium text-sm leading-none mb-2">Gender</label>
                                <div className="relative">
                                    <select className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                            <button type="submit" className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-green-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-green-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputInformation

interface IInputWrap {
    title: string;
    type: string;
    // onChange?: (event: ChangeEvent<HTMLInputElement>, key: string) => void
    // key?: string
}

const InputWrap = (props: IInputWrap) => {
    return (
        <div className="col-span-6 sm:col-span-3">
            <label className="block text-gray-500 font-medium text-sm leading-none mb-2">{props?.title}</label>
            <div className="relative">
                <input name={props?.title} type={props?.type} placeholder={props?.title}  className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12" value="" />
            </div>
        </div>
    )
}