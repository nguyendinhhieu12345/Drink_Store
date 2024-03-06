import assets from "@/assets";

const ListCategory = () => {
  return (
    <div className="flex flex-col items-start justify-center my-4 py-6 w-full h-auto bg-white rounded-lg">
      <div className="mb-2 font-semibold text-start px-3 text-2xl">Category</div>
      <div className="flex overflow-auto items-center justify-between flex-wrap w-full">
        {Array.from({ length: 16 }, (_, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center max-h-40 w-[11%] my-2 mx-1 py-2 border hover:border-gray-400 cursor-pointer"
          >
            <div className="h-20 w-20 rounded-full p-0.5">
              <img
                className="h-full w-full rounded-full border-2 border-white object-cover hover:ease-in-out hover:duration-300 hover:delay-100 hover:scale-[1.2]"
                src={assets.images.imageLogin}
                alt="avatar"
              />
            </div>
            <p className="mt-1 w-14 break-words text-center text-sm text-slate-600 line-clamp-1">
              Coffe
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListCategory;
