import InputImage from "@/components/PageComponents/UserPage/UpdateProfileUser/InputImage";
import InputInformation from "@/components/PageComponents/UserPage/UpdateProfileUser/InputInformation";

function ProfileUser() {
    return (
        <div className="bg-white h-auto w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-xl font-semibold mb-5">Update profile</h2>
                    </div>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <InputImage />
                <InputInformation />
            </div>
        </div>
    )
}

export default ProfileUser