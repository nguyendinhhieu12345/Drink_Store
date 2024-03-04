import { Switch } from "@material-tailwind/react";
import { useState } from "react";

export default function ProfileAdmin() {
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);
  return (
    <div className="p-6 flex-grow scrollbar-hide w-full h-auto max-h-full  bg-white rounded-lg">
      {/* Input Username */}
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
          Username
        </label>
        <div className="col-span-8 sm:col-span-4">
          <input
            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
            type="text"
            name="name"
            placeholder="Username"
            value=""
          />
        </div>
      </div>

      {/* Input FName */}
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
          First Name
        </label>
        <div className="col-span-8 sm:col-span-4">
          <input
            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
            type="text"
            name="name"
            placeholder="First name"
            value=""
          />
        </div>
      </div>

      {/* Input LName */}
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
          Last Name
        </label>
        <div className="col-span-8 sm:col-span-4">
          <input
            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
            type="text"
            name="name"
            placeholder="Last name"
            value=""
          />
        </div>
      </div>

      {/* Input Birthday */}
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
          Birthday
        </label>

        <div className="col-span-8 sm:col-span-4">
          <div className="w-full text-center">
            <input
              className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
              type="date"
              name="joiningDate"
              placeholder="Joining Date"
            />
          </div>
        </div>
      </div>

      {/* Choose status */}
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-800 col-span-4 sm:col-span-2 font-medium">
          Gender
        </label>
        <div className="col-span-8 sm:col-span-4 flex items-start">
          <p className="opacity-80  mr-2">Female</p>
          <Switch crossOrigin color="green" defaultChecked label="Male" />
          <button
            className="px-3 py-2 border border-green-300 ml-10 rounded-lg bg-green-500 text-white hover:bg-green-600"
            onClick={() => setIsOpenPassword(!isOpenPassword)}
          >
            Change password
          </button>
        </div>
      </div>

      {isOpenPassword && (
        <>
          {/* Input Password */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              Password
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                type="password"
                name="name"
                placeholder="Password"
                // value=""
              />
            </div>
          </div>

          {/* Input Confirm Password */}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
              Confirm Password
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                type="password"
                name="name"
                placeholder="Confirm Password"
                // value=""
              />
            </div>
          </div>
        </>
      )}
      <div className="flex flex-row-reverse pr-6 pb-6">
        <button
          className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm text-white bg-green-500 hover:bg-green-600 h-12"
          type="submit"
        >
          {" "}
          Update Profile
        </button>
      </div>
    </div>
  );
}
