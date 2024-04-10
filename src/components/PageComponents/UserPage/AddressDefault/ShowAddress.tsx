import { Delete } from "@/components/SVG/Delete.svg"
import { Edit } from "@/components/SVG/Edit.svg"

function ShowAddress() {
    return (
        <div className="w-full my-5 overflow-hidden border border-gray-200 rounded-lg mb-8 rounded-b-lg">
            {/* table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 ">
                        <tr className="">
                            <th scope="col" className="text-left text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">Address</th>
                            <th scope="col" className="text-right text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <tr key={index}>
                                <td className="px-5 py-3 leading-6 whitespace-nowrap">
                                    <div className="flex flex-col items-start justify-between">
                                        <p className="flex flex-row items-center">
                                            <span className="border-r pr-1">
                                                Nguyễn Đình Hiếu
                                            </span>
                                            <span className="ml-1 opacity-75">
                                                (+84) 869083652
                                            </span>
                                        </p>
                                        <p className="w-[80%] break-all">Hẻm 86/33A, đường Đình Phong Phú, phường Tăng Nhơn Phú B, Thành Phố Thủ Đức, TP. Hồ Chí Minh</p>
                                        <button className="text-brown-600 px-2 py-1 border border-brown-300 rounded-2xl">Default</button>
                                    </div>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap text-right text-sm"><div className="flex justify-end text-right">
                                    <button
                                        className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                    >
                                        <p data-tip="true" data-for="edit" className="text-xl">
                                            <Edit />
                                        </p>
                                    </button>
                                    <button
                                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                    >
                                        <p
                                            data-tip="true"
                                            data-for="delete"
                                            className="text-xl"
                                        >
                                            <Delete />
                                        </p>
                                    </button>
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowAddress