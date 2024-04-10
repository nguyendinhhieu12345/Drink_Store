function ChangePasswordUser() {
    return (
        <div className="bg-white h-auto w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <h2 className="text-xl font-semibold mb-5">Change password</h2>
            <div className="md:grid-cols-6 md:gap-6">
                <div className="md:mt-0 md:col-span-2">
                    <div className="lg:mt-6 bg-white">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-6">
                                <label className="block text-gray-500 font-medium text-sm leading-none mb-2">Current Password</label>
                                <div className="relative">
                                    <input name="Current Password" type="password" placeholder="Current Password" className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-green-500 h-11 md:h-12" value="" />
                                </div>
                            </div>
                            <div className="col-span-6 sm:col-span-6">
                                <label className="block text-gray-500 font-medium text-sm leading-none mb-2">Current Password</label>
                                <div className="relative">
                                    <input name="currentPassword" type="password" placeholder="Current Password" className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-green-500 h-11 md:h-12" value="" />
                                </div>
                            </div>
                            <div className="col-span-6 sm:col-span-6">
                                <label className="block text-gray-500 font-medium text-sm leading-none mb-2">New Password</label>
                                <div className="relative">
                                    <input name="newPassword" type="password" placeholder="New Password" className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-green-500 h-11 md:h-12" value="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 text-right">
                <button type="submit" className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-green-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-green-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto">Change Password</button>
            </div>
        </div>
    )
}

export default ChangePasswordUser