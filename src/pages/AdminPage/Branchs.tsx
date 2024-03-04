import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import { Drawer } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IBranch } from "@/types/type";
import CreateBranch from "@/components/Branch/CreateBranch";
import * as branchApi from "@/api/adminApi/branchApi/branchApi";

interface IResponseBranch {
  timestamp: string;
  success: boolean;
  message: string;
  data: IBranch[];
}

export default function Branchs() {
  const [open, setOpen] = useState<boolean>(false);
  const [openCreateBranch, setOpenCreateBranch] = useState<boolean>(false);
  const [branchs, setBranchs] = useState<IResponseBranch>();
  const [dataDelete, setDataDelete] = useState<string>("");
  const [currentBranch, setCurrentBranch] = useState<IBranch | null>(null);

  // Open confirm delete
  const handleDelete = (e: string) => {
    setOpen(!open);
    setDataDelete(e);
  };
  const handleOpen = () => setOpen(!open);

  const handleDeleteBranch = async () => {
    setOpen(!open);
    try {
      const data = await branchApi.deleteBranch(dataDelete);
      console.log(data);
      if (data?.success) {
        toast.success(data?.message);
        getAllBranch();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Drawer
  const openDrawer = () => setOpenCreateBranch(true);
  const closeDrawer = () => setOpenCreateBranch(false);

  const handleAddCate = () => {
    setOpenCreateBranch(true);
    setCurrentBranch(null);
  };

  const getAllBranch = async () => {
    const data = await branchApi.getAllBranch();
    setBranchs(data);
  };
  useEffect(() => {
    getAllBranch();
  }, [openCreateBranch]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Branchs</h1>

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
                    onClick={handleAddCate}
                  >
                    <span className="mr-2">
                      <Add />
                    </span>
                    Add Branch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model create category */}
        <Drawer
          placeholder=""
          placement="right"
          open={openCreateBranch}
          onClose={closeDrawer}
          size={700}
        >
          <button
            className="absolute focus:outline-none z-10 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 left-auto w-10 h-10 rounded-full block text-center"
            onClick={closeDrawer}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          {openCreateBranch && (
            <CreateBranch
              type={currentBranch ? "edit" : "create"}
              branchs={branchs?.data}
              setOpenCreateBranch={setOpenCreateBranch}
              currentBranch={currentBranch}
            />
          )}
        </Drawer>

        {/* <TableCategorys /> */}
        <TableAdmin
          fieldTable={["id", "address", "phone", "actions"]}
          data=""
          isPaging={false}
          title="Category"
          scriptData={
            <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
              {branchs?.data?.map((branch, i) => (
                <tr key={i}>
                  <>
                    <td className="px-4 py-2">
                      <span className="text-sm">{branch.id}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{branch.fullAddress}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{branch.phoneNumber}</span>
                    </td>
                  </>

                  <td className="px-4 py-2">
                    <div className="flex justify-end text-right">
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                        onClick={() => {
                          setCurrentBranch(branch);
                          openDrawer();
                        }}
                      >
                        <p data-tip="true" data-for="edit" className="text-xl">
                          <Edit />
                        </p>
                      </button>
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                        onClick={() => handleDelete(branch.id)}
                      >
                        <p
                          data-tip="true"
                          data-for="delete"
                          className="text-xl"
                        >
                          <Delete />
                        </p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        />
        <TableConfirmDelete
          open={open}
          handleOpen={handleOpen}
          title="Branch"
          handleDelete={handleDeleteBranch}
        />
      </div>
    </div>
  );
}
