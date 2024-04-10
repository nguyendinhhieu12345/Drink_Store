import { checkTypeImage, imageUrlToFile } from "@/utils/hepler";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as userApi from "@/api/PageApi/userApi"
import { AxiosError } from "axios";

function InputImage() {
    const profileUser = JSON.parse(localStorage.getItem("profile") as string)
    const [image, setImage] = useState<File[]>([]);

    const handleInputImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (checkTypeImage(e.target.files)) {
                setImage([...e.target.files]);
                const newData = new FormData()
                Array.from(e.target.files).forEach(img => newData.append("image", img));
                try {
                    const data = await userApi.updateAvatarUser(profileUser?.id, newData)
                    console.log(data)
                    if (data?.success) {
                        toast.success(data?.message)
                        localStorage.setItem("profile", JSON.stringify({
                            ...profileUser,
                            avatarUrl: data?.data
                        }))
                    }
                }
                catch (e: unknown) {
                    if (e instanceof AxiosError && e.response) {
                        toast.error(e.response.data?.message);
                    }
                }
            } else {
                toast.error("Only *.jpeg, *.jpg and *.png images will be accepted!", {
                    position: "bottom-left",
                });
            }
        }
    };

    const handleImageAdd = async (imageUrl: string | null) => {
        if (imageUrl === null) {
            setImage([])
        }
        else {
            const file = await imageUrlToFile(imageUrl);
            if (file) {
                setImage([...image, file]);
            } else {
                console.log("Failed to convert image URL to file");
            }
        }
    };

    useEffect(() => {
        handleImageAdd(profileUser?.avatarUrl)
    }, [])

    return (
        <div className="bg-white space-y-6">
            <div>
                <label className="block text-gray-500 font-medium text-sm leading-none mb-2">Photo</label>
                <div className="w-full text-center">
                    <div className="border-2 border-gray-300 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6">
                        <input
                            accept="image/.jpeg,.jpg,.png"
                            type="file"
                            id="file"
                            className="hidden"
                            onChange={(e) => {
                                handleInputImage(e);
                            }}
                        />
                        <label htmlFor="file" className="cursor-pointer">
                            {
                                image.length > 0 ? (
                                    <img
                                        src={URL.createObjectURL(image[0])}
                                        alt="image-category"
                                        className="w-full h-60 object-contain"
                                    />
                                )
                                    : (
                                        <>
                                            <span className="mx-auto flex justify-center">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-3xl text-green-500"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <polyline points="16 16 12 12 8 16"></polyline>
                                                    <line x1="12" y1="12" x2="12" y2="21"></line>
                                                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                                    <polyline points="16 16 12 12 8 16"></polyline>
                                                </svg>
                                            </span>
                                            <p className="text-sm mt-2">Choose your images here</p>
                                            <em className="text-xs text-gray-400">
                                                (Only *.jpeg, *.jpg and *.png images will be accepted)
                                            </em>
                                        </>
                                    )}
                        </label>
                    </div>
                    <div className="text-emerald-500"></div>
                    <aside className="flex flex-row flex-wrap mt-4"></aside>
                </div>
            </div>
        </div>
    )
}

export default InputImage