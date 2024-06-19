import * as userApi from "@/api/PageApi/userApi"
import useLoading from "@/hooks/useLoading";
import { isPhone, messageToast } from "@/utils/hepler";
import { Spinner } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

interface IDataUpdateUser {
    firstName: string,
    lastName: string,
    birthDate: string,
    gender: string,
    phoneNumber: string
}

function InputInformation() {
    const profileBase = JSON.parse(localStorage?.getItem("profile") as string)
    const [dataUpdate, setDataUpdate] = useState<IDataUpdateUser>({
        firstName: profileBase?.firstName,
        lastName: profileBase?.lastName,
        birthDate: profileBase?.birthDate,
        gender: profileBase?.gender ? profileBase?.gender : "MALE",
        phoneNumber: profileBase?.phoneNumber ? profileBase?.phoneNumber : ""
    })
    const { isLoading, startLoading, stopLoading } = useLoading()

    const handleUpdateProfile = async () => {
        try {
            startLoading()
            if (dataUpdate?.firstName.trim() !== "" && dataUpdate?.lastName.trim() !== "" && dataUpdate?.birthDate.trim() !== "" && dataUpdate?.gender.trim() !== "" && dataUpdate?.phoneNumber.trim() !== "" && isPhone(dataUpdate?.phoneNumber?.trim())) {
                const resultSignup = await userApi?.updateProfileUser(profileBase?.id, dataUpdate?.firstName, dataUpdate?.lastName, dataUpdate?.birthDate, dataUpdate?.gender, dataUpdate?.phoneNumber)
                if (resultSignup?.success) {
                    toast.success(resultSignup?.message)
                    stopLoading()
                    localStorage.setItem("profile", JSON.stringify(
                        {
                            ...profileBase,
                            firstName: dataUpdate?.firstName,
                            lastName: dataUpdate?.lastName,
                            birthDate: dataUpdate?.birthDate,
                            gender: dataUpdate?.gender,
                            phoneNumber: dataUpdate?.phoneNumber
                        }
                    ))
                }
            }
            else {
                stopLoading()
                toast.error(messageToast?.fillInput)
            }
        }
        catch (e: unknown) {
            stopLoading()
            if (e instanceof AxiosError && e.response) {
                toast.error(e.response.data?.message);
            }
        }
    }

    return (
        <div className="mt-10 sm:mt-0">
            <div className="md:grid-cols-6 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="lg:mt-6 mt-4 bg-white">
                        <div className="grid grid-cols-6 gap-6">
                            <InputWrap dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} value={dataUpdate?.firstName} title="First Name" type="text" keyData="firstName" />
                            <InputWrap dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} value={dataUpdate?.lastName} title="Last Name" type="text" keyData="lastName" />
                            <InputWrap dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} value={dataUpdate?.phoneNumber} title="Phone/Number" type="text" keyData="phoneNumber" />
                            <InputWrap dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} value={profileBase?.email} title="Email" type="email" keyData="email" />
                            <InputWrap dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} value={dataUpdate?.birthDate} title="Birthday" type="date" keyData="birthDate" />
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block text-gray-500 font-medium text-sm leading-none mb-2">Gender</label>
                                <div className="relative">
                                    <select value={dataUpdate?.gender}
                                        onChange={(e) => {
                                            setDataUpdate((prev: IDataUpdateUser) => (
                                                {
                                                    ...prev,
                                                    gender: e.target.value
                                                }
                                            ))
                                        }}
                                        className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12">
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                            <button onClick={handleUpdateProfile} type="submit" className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-green-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-green-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto">
                                {isLoading ? (
                                    <p className="flex items-center justify-center">
                                        <span className="mr-2">Update Profile</span>{" "}
                                        <Spinner className="h-4 w-4" />
                                    </p>
                                ) : (
                                    <span>Update Profile</span>
                                )}
                            </button>
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
    value: string,
    dataUpdate: IDataUpdateUser,
    setDataUpdate: React.Dispatch<React.SetStateAction<IDataUpdateUser>>
    keyData: string
}

const InputWrap = (props: IInputWrap) => {

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        keyData: string
    ): void => {
        const { value } = event.target;
        props?.setDataUpdate((prev: IDataUpdateUser) => (
            {
                ...prev,
                [keyData]: value.trim()
            }
        ))
    };

    return (
        <div className="col-span-6 sm:col-span-3">
            <label className="block text-gray-500 font-medium text-sm leading-none mb-2">{props?.title}</label>
            <div className="relative">
                <input
                    value={props?.value}
                    onChange={(e) => handleInputChange(e, props?.keyData)}
                    disabled={props?.title === "Email" ? true : false}
                    name={props?.title}
                    type={props?.type}
                    placeholder={props?.title}
                    className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                />
            </div>
        </div>
    )
}