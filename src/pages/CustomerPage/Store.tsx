import Search from "@/components/SVG/Search";
import { MapTrifold, Storefront } from "@phosphor-icons/react";
import Map from "@/components/Map/Map";
import { useState } from "react";

function Store() {
  const [openMap, setOpenMap] = useState<boolean>(false);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleGetGeocode = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const API_KEY = "2tgHvZJswyFkLug62ynzpCrs8RlqMcmzFVtoUjEL";
      const encodedAddress = encodeURIComponent(address);
      const url = `https://rsapi.goong.io/Geocode?address=${encodedAddress}&api_key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry?.location;
          setLatitude(lat);
          setLongitude(lng);
          setError(null);
        } else {
          setError("Address not found");
        }
      } catch (error) {
        console.error("Error geocoding:", error);
        setError("Error geocoding");
      }
    }
  };

  const handleOpenMap = () => {
    if (openMap) {
      setOpenMap(false);
    } else {
      setOpenMap(true);
    }
  };

  return (
    <div className="h-auto mt-20 mx-10 bg-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center my-5">
        <Storefront
          className="mr-3 p-2 rounded-full bg-yellow-300 text-white"
          size={35}
        />
        <h1 className="font-medium">Shopfee System</h1>
      </div>
      <div className="flex justify-around items-center">
        <div>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white w-96"
          >
            Search
          </label>
          <div className="relative w-[400px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer z-999999">
              <Search />
            </div>
            <input
              type="text"
              className="block w-full h-11 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Enter store name..."
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => handleGetGeocode(e)}
            />
          </div>
        </div>
        <div className="ml-3 my-6">
          <button
            className="rounded-lg hover:bg-btnDisable hover:p-1.5 p-1.5"
            onClick={handleOpenMap}
          >
            <MapTrifold size={30} />
          </button>
        </div>
      </div>
      {openMap && <Map latitude={latitude} longitude={longitude} />}
      {error && (
        <div className="text-center italic text-red-500 text-sm">{error}</div>
      )}
      <div className="my-6 text-left">
        <div className="text-left px-4 font-semibold text-xl">
          Found 4 stores
        </div>
        <div className="flex flex-wrap">
          {Array?.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-[48%] flex my-3 mx-3 rounded-lg shadow-xl border border-gray-200 px-5 py-2"
            >
              <img
                src="https://minio.thecoffeehouse.com/image/admin/42125551_2192693434338004_6795198411906744320_n_191298.jpeg"
                alt="store"
                className="w-25 h-25 rounded-lg"
              />
              <div className="flex flex-col items-start justify-center ml-5">
                <p className="font-semibold">Vo Van Ngan</p>
                <p className="break-all">No 1 Vo Van Ngan Q9 TPHCM</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
