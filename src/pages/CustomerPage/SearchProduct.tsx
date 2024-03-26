import DisplayCategory from "@/components/PageComponents/SearchProduct/DisplayCategory"
import DisplayFollowGrid from "@/components/PageComponents/SearchProduct/DisplayFollowGrid"
import DisplayFollowList from "@/components/PageComponents/SearchProduct/DisplayFollowList"
import FilterProduct from "@/components/PageComponents/SearchProduct/FilterProduct"
import { Breadcrumbs } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

function SearchProduct() {
  const [keySearch, setKeySearch] = useState<string>("")
  const [activeDisplay, setActiveDisplay] = useState<boolean>(true)
  const location = useLocation()

  useEffect(() => {
    setKeySearch(location.search.split("?key=")[1])
  }, [location])

  return (
    <div className="h-auto mt-20 mx-48">
      <div className="py-5 text-md">
        <Breadcrumbs placeholder="" className="bg-white p-0 m-0">
          <a href="/" className="font-semibold">
            Home
          </a>
          <p className="opacity-65 select-none cursor-text hover:text-black focus:text-black visited:text-black">Search "{keySearch}"</p>
        </Breadcrumbs>
      </div >
      {!keySearch && <DisplayCategory />}
      <FilterProduct activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
      {activeDisplay ? <DisplayFollowGrid /> : <DisplayFollowList />}
    </div>
  )
}

export default SearchProduct