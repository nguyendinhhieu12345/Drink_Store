import ShowBlog from "@/components/PageComponents/Home/ShowBlog"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as homeApi from "@/api/PageApi/homeApi"
import { AxiosError } from "axios"
import { configRouter } from "@/configs/router"
import { toast } from "react-toastify"
import { BaseResponseApi } from "@/type"

interface IBlogDetail extends BaseResponseApi {
    data: {
        title: string;
        summary: string;
        content: string;
        imageUrl: string;
        createdAt: string
    }
}

function BlogDetail() {
    const [blogDetail, setBlogDetail] = useState<IBlogDetail>()
    const { id } = useParams()
    const nav = useNavigate()

    const getBlogDetail = async () => {
        try {
            const data = await homeApi?.getAllBlogById(id as string)
            if (data?.success) {
                setBlogDetail(data)
            }
        }
        catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                nav(configRouter.home);
                toast.error("Blog not found with id: " + id);
            }
        }
    }

    useEffect(() => {
        id && getBlogDetail()
    }, [id])

    return (
        <div className="h-auto mt-20 mx-5 sm:mx-5 xl:mx-20">
            <div className="max-w-screen-lg mx-auto">
                <main className="mt-10">
                    <img src={blogDetail?.data?.imageUrl} className="w-full object-cover lg:rounded my-5" style={{ height: "28em" }} />
                    <div className="w-full mt-10 mx-auto relative">
                        <div className="px-4 lg:px-0">
                            <h2 className="text-3xl font-semibold text-gray-800 leading-tight">
                                {blogDetail?.data?.title}
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:space-x-12">
                        <div className="px-4 lg:px-0 mt-6 text-gray-700 text-lg leading-relaxed w-full ">
                            <p className="pb-6 font-semibold">{blogDetail?.data?.summary}</p>
                            <div dangerouslySetInnerHTML={{ __html: blogDetail?.data?.content as string }} />
                        </div>
                    </div>
                </main>
            </div>
            <ShowBlog title="New Blogs" />
        </div>
    )
}

export default BlogDetail