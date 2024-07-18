import Tricount from "@/components/PageComponents/Hello/Tricount"
import ListFuture from "../../components/PageComponents/Home/HomeNew/ListFuture"
import { useTranslation } from "react-i18next"

function Hello() {
    const { t } = useTranslation()

    return (
        <div className="h-auto mt-25 px-5 sm:px-5 xl:px-20">
            <Tricount />
            <div className="text-center mt-5">
                <h2 className="text-xl text-gray-800 font-semibold tracking-wide uppercase">{t("Key features")}</h2>
                <ListFuture />
            </div>
        </div>
    )
}

export default Hello