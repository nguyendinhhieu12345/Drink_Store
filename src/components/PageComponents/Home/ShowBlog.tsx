import Cup from "@/components/SVG/Cup.svg"
import { configRouter } from "@/configs/router"
import { BaseResponseApi } from "@/type"
import { useEffect, useState } from "react"
import * as homeApi from "@/api/PageApi/homeApi"
import { formatTimeStamp } from "@/utils/hepler"

interface IShowBlog {
    title: string
}

interface IListBlog extends BaseResponseApi {
    data: {
        totalPage: number,
        blogList: {
            id: string;
            title: string;
            summary: string;
            thumbnailUrl: string;
            createdAt: string
        }[]
    }
}

function ShowBlog(props: IShowBlog) {
    const [blogs, setBlogs] = useState<IListBlog>()

    useEffect(() => {
        const getAllBlog = async () => {
            const data = await homeApi.getAllBlog(1, 8)
            if (data?.success) {
                setBlogs(data)
            }
        }
        getAllBlog()
    }, [])

    return (
        <div className=" w-full">
            <div className="flex items-center justify-center my-5">
                <div className="mr-2 p-1 text-center rounded-full bg-yellow-300 text-white"><Cup className="w-5 h-5" /></div>
                <h1 className="font-medium text-2xl">{props?.title}</h1>
            </div>
            <div className="w-full flex items-center justify-between flex-wrap">
                {
                    blogs?.data?.blogList?.map((blog, index) => (
                        <article key={index} className="w-[22%] flex flex-col shadow-base rounded-xl m-4 bg-white">
                            <a rel="noopener noreferrer" href={configRouter?.blogDetail.slice(0, -3) + blog?.id} aria-label="Te nulla oportere reprimique his dolorum">
                                <img alt="" className="object-cover w-full h-40 rounded-t-xl" src={blog?.thumbnailUrl} />
                            </a>
                            <div className="flex flex-col flex-1 p-3">
                                <a href={configRouter?.blogDetail.slice(0, -3) + blog?.id} className="flex-1 py-2 text-base font-semibold leading-snug">{blog?.title}</a>
                                <span className="text-xs">{formatTimeStamp(blog?.createdAt)}</span>
                                <div className="flex flex-wrap justify-between pt-1 h-10 space-x-2 text-xs break-all">
                                    <p className="truncate">{blog?.summary}</p>
                                </div>
                            </div>
                        </article>
                    ))
                }
            </div>
        </div>
    )
}

export default ShowBlog