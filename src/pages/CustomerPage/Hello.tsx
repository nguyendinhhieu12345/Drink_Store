import KeyFeatures from "@/components/PageComponents/Hello/KeyFeatures"
import Tricount from "@/components/PageComponents/Hello/Tricount"

function Hello() {
    return (
        <div className="h-auto mt-25 px-5 sm:px-5 xl:px-20">
            <Tricount />
            <KeyFeatures />
        </div>
    )
}

export default Hello