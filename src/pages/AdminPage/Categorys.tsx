import CreateCategory from "@/components/Category/createCategory";
import { Add } from "@/components/SVG/Add.svg";
import { Delete } from "@/components/SVG/Delete.svg";
import { Edit } from "@/components/SVG/Edit.svg";
import { Export } from "@/components/SVG/Export.svg";
import { Import } from "@/components/SVG/Import.svg";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import TableConfirmDelete from "@/components/TableAdmin/TableConfirmDelete";
import { Drawer } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as categoryApi from "@/api/adminApi/categoryApi/categoryApi";
import { toast } from "react-toastify";
import { ICategory } from "@/types/type";

interface IResponseCategory {
  timestamp: string;
  success: boolean;
  message: string;
  data: ICategory[];
}

export default function Categorys() {
  const [open, setOpen] = useState<boolean>(false);
  const [openCreateCategory, setOpenCreateCategory] = useState<boolean>(false);
  const [categorys, setCategorys] = useState<IResponseCategory>();
  const [dataDelete, setDataDelete] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    null
  );

  // Open confirm delete
  const handleDelete = (e: string) => {
    setOpen(!open);
    setDataDelete(e);
  };
  const handleOpen = () => setOpen(!open);

  const handleDeleteCate = async () => {
    setOpen(!open);
    try {
      const data = await categoryApi.deleteCategory(dataDelete);
      console.log(data);
      if (data?.success) {
        toast.success(data?.message);
        getAllCategory();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Drawer
  const openDrawer = () => setOpenCreateCategory(true);
  const closeDrawer = () => setOpenCreateCategory(false);

  const handleAddCate = () => {
    setOpenCreateCategory(true);
    setCurrentCategory(null);
  };

  const getAllCategory = async () => {
    const data = await categoryApi.getAllCategory();
    setCategorys(data);
  };
  useEffect(() => {
    getAllCategory();
  }, [openCreateCategory]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">
          Categorys
        </h1>

        {/* Add and delete */}
        <div className="rounded-lg min-w-0 shadow-xs overflow-hidden bg-white mb-5">
          <div className="p-4">
            <div className="md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex xl:items-center">
              <div className="flex-grow-0 sm:flex-grow md:flex-grow lg:flex-grow xl:flex-grow">
                <div className=" lg:flex md:flex flex-grow-0">
                  <div className="flex">
                    <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                      <button className="border flex justify-center items-center border-gray-300 hover:border-green-400 hover:text-green-400 cursor-pointer h-10 w-20 rounded-md focus:outline-none">
                        <Export />
                        <span className="text-xs">Export</span>
                      </button>
                    </div>
                    <div className="lg:flex-1 md:flex-1 mr-3  sm:flex-none">
                      <button className="border flex justify-center items-center h-10 w-20 hover:text-yellow-400  border-gray-300cursor-pointer  py-2 hover:border-yellow-400 rounded-md focus:outline-none">
                        <Import />
                        <span className="text-xs">Import</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
                    Add Category
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
          open={openCreateCategory}
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
          {openCreateCategory && (
            <CreateCategory
              type={currentCategory ? "edit" : "create"}
              categorys={categorys?.data}
              setOpenCreateCategory={setOpenCreateCategory}
              currentCategory={currentCategory}
            />
          )}
        </Drawer>

        {/* Filter */}
        <div className="min-w-0 rounded-lg overflow-hidden bg-white shadow-xs rounded-t-lg rounded-0 mb-4">
          <div className="py-2 px-4">
            <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <input
                  className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white  focus:border-gray-200 border-gray-200"
                  type="search"
                  name="search"
                  placeholder="Search Category"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-5 mr-1"
                ></button>
              </div>
              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <button
                    className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 h-12 w-full"
                    type="submit"
                  >
                    Filter
                  </button>
                </div>
                <div className="w-full mx-1">
                  <button
                    className="transition-colors duration-150 font-medium text-gray-600 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm"
                    type="reset"
                  >
                    <span className="text-black ">Reset</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <TableCategorys /> */}
        <TableAdmin
          fieldTable={["id", "name", "image", "status", "actions"]}
          data=""
          isPaging={false}
          title="Category"
          scriptData={
            <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
              {categorys?.data?.map((cate, i) => (
                <tr key={i}>
                  <>
                    {/* <td className="px-4 py-2">
                  <input
                    id="644501ab7094a0000851284b"
                    name="Premium T-Shirt"
                    type="checkbox"
                  />
                </td> */}

                    <td className="px-4 py-2">
                      <span className="text-sm">{cate.id}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm">{cate.name}</span>
                    </td>
                    <td className="px-4 py-2">
                      <img
                        className="object-contain w-20 h-20 rounded-lg"
                        src={cate.imageUrl}
                        alt="product"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {cate.status === "HIDDEN" ? (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 italic">
                          Hidden
                        </span>
                      ) : (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">
                          Publish
                        </span>
                      )}
                    </td>
                  </>

                  <td className="px-4 py-2">
                    <div className="flex justify-end text-right">
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                        onClick={() => {
                          setCurrentCategory(cate);
                          openDrawer();
                        }}
                      >
                        <p data-tip="true" data-for="edit" className="text-xl">
                          <Edit />
                        </p>
                      </button>
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                        onClick={() => handleDelete(cate.id)}
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
          title="Category"
          handleDelete={handleDeleteCate}
        />
      </div>
    </div>
  );
}
