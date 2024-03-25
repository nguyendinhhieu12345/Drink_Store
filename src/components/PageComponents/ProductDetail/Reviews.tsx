import assets from "@/assets"
import { Progress, Rating, Typography } from "@material-tailwind/react"
import { Star } from "@phosphor-icons/react"

function Reviews() {
  return (
    <>
      <p className="font-semibold mb-3 text-md">Reviews</p>
      <div className="flex item-start">
        <div className="w-[40%]">
          <p className="font-semibold text-2xl">Customer Reviews</p>
          <div className="flex items-center gap-2 font-medium my-2">
            <Rating placeholder="" value={4} readonly ratedColor="amber" />
            <Typography placeholder="" color="blue-gray" className="font-medium ">
              Based on 134 Reviews
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between w-full space-x-3">
                <div className="flex items-center">
                  <p className="w-3">{5 - index}</p> <Star size={23} color="#FACC15" weight="fill" />
                </div>
                <Progress
                  color="amber"
                  placeholder=""
                  value={20}
                  className="border-2 border-gray-900/10 bg-blue-100"
                />
                <div className="space-x-2">
                  <p>20%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[60%] ml-20">
          <div className="flex flex-col items-center justify-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-full mb-5 pb-5">
                <div className="flex items-center">
                  <img src={assets?.images?.noAvatar} alt="avatar user" loading="lazy" className="w-11 h-11 object-contain rounded-full border" />
                  <div className="ml-5">
                    <p className="font-medium text-sm my-1">Emily Selman</p>
                    <Rating placeholder="" value={4} readonly ratedColor="amber" className="w-2 h-2 my-1" />
                  </div>
                </div>
                <p className="text-base italic my-2">This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Reviews