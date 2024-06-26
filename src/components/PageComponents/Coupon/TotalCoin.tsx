import { configRouter } from "@/configs/router";
import { useNavigate } from "react-router-dom";
import assets from "@/assets";

function TotalCoin() {
    const profileUser = JSON.parse(localStorage.getItem("profile") as string)
    const nav = useNavigate()

    const handleNavHistoryCoin = () => {
        nav(configRouter?.historyCoin)
    }

    return (
        <div>
            <div className="w-full mt-5">
                <div className="w-full flex items-center justify-between px-3">
                    <h2 className="text-2xl font-bold mb-4 border-l-4 border-red-500 pl-5 my-5">Your Coin</h2>
                    <button className="italic px-4 py-2 rounded-xl hover:bg-btnActive hover:text-white" onClick={handleNavHistoryCoin}>History Coin</button>
                </div>
                <div className="w-1/3 mr-3 bg-btnActive min-h-20 flex items-center p-3 rounded-lg">
                    <p className="text-white min-w-32 text-lg">Your coin: {profileUser?.coin ?? 0}</p>
                    <img src={assets?.images?.coin} alt="coin" className="max-w-52 w-full h-full object-contain -ml-3" loading="lazy" />
                </div>
            </div>
        </div>
    )
}

export default TotalCoin