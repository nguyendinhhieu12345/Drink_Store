import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import { configRouter } from "@/configs/router";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Marketing() {
  const nav = useNavigate();

  const handleRedirectCreateCampain = () => {
    nav(configRouter.addMarketting);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">
          Marketing
        </h1>

        {/* Add and delete */}
        <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
          <div className="p-4">
            <div className="md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex xl:items-center xl:justify-end">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <button
                    className="inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-emerald-500 border border-transparent opacity-100 w-full rounded-md h-12 bg-red-600"
                    type="button"
                  >
                    <span className="mr-2">
                      <Delete />
                    </span>
                    Delete
                  </button>
                </div>
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <button
                    className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-500 border border-transparent w-full rounded-md h-12"
                    type="button"
                    onClick={handleRedirectCreateCampain}
                  >
                    <span className="mr-2">
                      <Add />
                    </span>
                    Add campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table campaign */}
        <TableCampaign />
      </div>
    </div>
  );
}

const TableCampaign = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = () => {
    setOpen(!open);
  };

  const handleOpen = () => setOpen(!open);

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg mb-8 rounded-b-lg">
      {/* table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
            <tr>
              <td className="px-4 py-2">
                <input id="selectAll" name="selectAll" type="checkbox" />
              </td>
              <td className="px-4 py-2">CODE</td>
              <td className="px-4 py-2">TITLE</td>
              <td className="px-4 py-2">START DATE</td>
              <td className="px-4 py-2">STATUS</td>
              <td className="px-4 py-2 text-right">ACTIONS</td>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-2">
                  <input
                    id="644501ab7094a0000851284b"
                    name="Premium T-Shirt"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">WINTER24</span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">Create new product</span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm">Jan 18, 2024</span>
                </td>

                <td className="px-4 py-2">
                  <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                    Success{" "}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <div className="flex justify-end text-right">
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                      <p data-tip="true" data-for="edit" className="text-xl">
                        <Edit />
                      </p>
                    </button>
                    <button
                      className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                      onClick={handleDelete}
                    >
                      <p data-tip="true" data-for="delete" className="text-xl">
                        <Delete />
                      </p>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* paging */}
      <div className="px-4 py-3 border-t border-gray-200  bg-white text-gray-500 ">
        <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 ">
          <span className="flex items-center font-semibold tracking-wide uppercase">
            Showing 1-10 of 500
          </span>
          <div className="flex mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Product Page Navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    className="inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                    type="button"
                    aria-label="Previous"
                  >
                    <CaretLeft size={12} />
                  </button>
                </li>
                {Array.from({ length: 5 }).map((_, i) => (
                  <li
                    key={i}
                    className={`${
                      i === 0
                        ? "bg-green-500 rounded-md"
                        : "hover:bg-gray-100 rounded-md"
                    }`}
                  >
                    <button
                      className={`${
                        i === 0 ? "bg-green-500 hover:bg-green-500" : ""
                      }inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 border border-transparent `}
                      type="button"
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                    type="button"
                    aria-label="Next"
                  >
                    <CaretRight size={12} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Confirm Delete */}
      <Dialog placeholder="" open={open} handler={handleOpen}>
        <DialogHeader placeholder="">Confirm delete Campaign</DialogHeader>
        <DialogBody placeholder="">
          Are you sure you want to delete this campaign? This action cannot be
          undone.
        </DialogBody>
        <DialogFooter placeholder="">
          <Button
            placeholder=""
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleOpen}
            placeholder=""
            variant="gradient"
            color="green"
            className="cursor-pointer"
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
