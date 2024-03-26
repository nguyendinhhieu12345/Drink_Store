import { Popover, PopoverContent, PopoverHandler, Rating, Typography } from "@material-tailwind/react"
import { Funnel, ListDashes, SquaresFour } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

interface IFilterProduct {
  activeDisplay: boolean,
  setActiveDisplay: React.Dispatch<React.SetStateAction<boolean>>
}

function FilterProduct(props: IFilterProduct) {
  const [keySearch, setKeySearch] = useState<string>("")

  useEffect(() => {
    setKeySearch(location.search.split("?key=")[1])
  }, [location])

  return (
    <div className="flex items-center border-t py-3 justify-between">
      <div className="text-sm">
        <p>{keySearch}</p>
        <p>11029 items found for "{keySearch}"</p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <p className="text-sm">Sort by:</p>
          <select className="rounded-lg px-2 py-1 ml-2 text-sm">
            <option>
              Price low to hight
            </option>
            <option>
              Price hight to low
            </option>
          </select>
        </div>
        <div className="flex items-center text-sm ml-5">
          <p>View</p>
          <button className="mr-1" onClick={() => props?.setActiveDisplay(true)}>
            <SquaresFour size={25} weight={props?.activeDisplay ? "fill" : undefined} className={`${!props.activeDisplay && "opacity-50"}`} />
          </button>
          <button className="mr-1" onClick={() => props?.setActiveDisplay(false)}>
            <ListDashes size={25} weight={!props?.activeDisplay ? "fill" : undefined} className={`${props.activeDisplay && "opacity-50"}`} />
          </button>
          <Popover placement="bottom-end">
            <PopoverHandler>
              <button>
                <Funnel size={25} />
              </button>
            </PopoverHandler>
            <PopoverContent placeholder="" className="w-80">
              <Typography
                placeholder=""
                variant="small"
                color="blue-gray"
                className="mb-1 font-bold"
              >
                Price (đ)
              </Typography>
              <div className="flex items-center justify-between w-full">
                <input
                  type="number"
                  className="block w-25 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-none focus:border-gray-50 "
                />
                <p>-</p>
                <input
                  type="number"
                  className="block w-25 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-none focus:border-gray-50 "
                />
                <button className="px-4 py-2 bg-select rounded-lg text-white">Apply</button>
              </div>
              <Typography
                placeholder=""
                variant="small"
                color="blue-gray"
                className="my-1 font-bold"
              >
                Rating
              </Typography>
              <div className="flex flex-col">
                {Array.from({ length: 5 }).map((_, index) => (
                  <button className="flex items-end">
                    <Rating placeholder="" value={5 - index} ratedColor="amber" readonly />
                    {index !== 0 && <p className="ml-2 text-base">And up</p>}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default FilterProduct