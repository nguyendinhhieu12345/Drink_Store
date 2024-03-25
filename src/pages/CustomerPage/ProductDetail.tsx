import assets from "@/assets"
import ListProductRecommend from "@/components/PageComponents/Home/ListProductRecommend"
import Reviews from "@/components/PageComponents/ProductDetail/Reviews"
import Cup from "@/components/SVG/Cup.svg"
import { formatVND } from "@/utils/const"
import { Breadcrumbs } from "@material-tailwind/react"
import { Notebook, Truck } from "@phosphor-icons/react"

function ProductDetail() {
  return (
    <div className="h-auto mt-20 mx-25">
      <div className="py-6 text-md">
        <Breadcrumbs placeholder="" className="bg-white p-0 m-0">
          <a href="/" className="font-semibold">
            Home
          </a>
          <a href="/" className="font-semibold">
            Menu
          </a>
          <p className="opacity-65 select-none cursor-text hover:text-black focus:text-black visited:text-black">Cà Phê Sữa Đá</p>
        </Breadcrumbs>
      </div >
      <div className="flex items-start mb-10">
        <div className="w-1/2">
          <img src="https://product.hstatic.net/1000075078/product/1669736835_ca-phe-sua-da_e6168b6a38ec45d2b4854d2708b5d542.png" alt="image product" className="w-142 h-142 object-contain bg-yellow-400" />
        </div>
        <div className="w-1/2">
          <p className="font-semibold text-3xl">Cà Phê Sữa Đá</p>
          <p className="my-2 font-medium text-2xl text-yellow-500">{formatVND(290000)}</p>
          <div className="my-6">
            <p className="font-medium">Select size (required)</p>
            <div className="flex my-4">
              <button className="flex items-center border border-gray-300 px-4 py-2 rounded-md mr-4 opacity-80 text-gray-700 active:text-white active:bg-select focus:text-white focus:bg-select">
                <Cup className="w-4 h-4 mr-1" />
                <p>Small + 0 đ</p>
              </button>
              <button className="flex items-center border px-4 py-2 border-gray-300 rounded-md mr-4 opacity-80 text-gray-700 active:text-white active:bg-select focus:text-white focus:bg-select">
                <Cup className="w-5 h-5 mr-1" />
                <p>Medium + 0 đ</p>
              </button>
              <button className="flex items-center border px-4 py-2 border-gray-300 rounded-md opacity-80 text-gray-700 active:text-white active:bg-select focus:text-white focus:bg-select">
                <Cup className="w-6 h-6 mr-1" />
                <p>Large + 0 đ</p>
              </button>
            </div>
          </div>
          <div className="my-6">
            <p className="font-medium">Topping</p>
            <div className="flex my-4">
              <button className="flex items-center border border-gray-300 px-4 py-2 rounded-md mr-4 opacity-80 text-gray-700 active:text-white active:bg-select focus:text-white focus:bg-select">
                <Cup className="w-4 h-4 mr-1" />
                <p>Sugar + 0 đ</p>
              </button>
              <button className="flex items-center border px-4 py-2 border-gray-300 rounded-md mr-4 opacity-80 text-gray-700 active:text-white active:bg-select focus:text-white focus:bg-select">
                <Cup className="w-5 h-5 mr-1" />
                <p>Trân châu + 0 đ</p>
              </button>
              <button className="flex items-center border px-4 py-2 border-gray-300 rounded-md opacity-80 text-gray-700 active:text-white active:bg-select focus:text-white focus:bg-select">
                <Cup className="w-6 h-6 mr-1" />
                <p>Sốt caramel + 0 đ</p>
              </button>
            </div>
          </div>
          <div className="my-6">
            <p className="font-medium">Note</p>
            <div className="flex my-4">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md opacity-60">
                <Notebook size={25} />
              </span>
              <input type="text" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-0 focus:border-gray-300 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 " placeholder="Note" />
            </div>
          </div>
          <div className="my-10 flex">
            <button className="w-1/2 mr-5 flex justify-center text-white px-4 py-2 rounded-md font-medium items-center gap-3 bg-select active:bg-select focus:bg-select visited:bg-select hover:bg-select">
              <img src={assets?.images?.imgCart} alt="img add to cart " className="w-5 h-5 object-contain" />
              Add to card
            </button>
            <button className="w-1/2 flex justify-center text-white px-4 py-2 rounded-md font-medium items-center gap-3 bg-select active:bg-select focus:bg-select visited:bg-select hover:bg-select">
              <Truck size={25} />
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="border-y border-gray-200 py-8">
        <p className="font-semibold mb-3 text-md">Product Description</p>
        <p className="text-md">Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.</p>
      </div>
      <div className="border-b border-gray-200 py-8">
        <Reviews />
      </div>
      <div className="py-8">
        <p className="font-semibold mb-3 text-md">Recommended products</p>
        <div className="grid gap-5 grid-cols-5 w-full mt-5">
          {Array.from({ length: 5 }, (_, index) => (
            <ListProductRecommend key={index} />
          ))}
        </div>
      </div>
    </div >
  )
}

export default ProductDetail