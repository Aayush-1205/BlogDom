import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { tag } from "../data";

export default function TagsPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [blog, setBlog] = useState([]);
  const router = useRouter();

  const { tags } = router.query;

  useEffect(() => {
    // function to fetch blog data
    const fetchBlogData = async () => {
      try {
        const res = await axios.get(`/api/getBlog?tags=${tags}`);
        const allData = res.data;
        setBlog(allData);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching blog data`, error);
        setLoading(false);
      }
    };

    // fetch blog data only if category exists
    if (tags) {
      fetchBlogData();
    }
    // else {
    //   router.push("/404");
    // }
  }, [tags]);

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastingBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastingBlog - perPage;
  const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastingBlog);

  const allBlog = blog.length;

  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allBlog / perPage); i++) {
    pageNumbers.push(i + 1);
  }

  // filter published blogs
  const publishedBlogs = currentBlogs.filter((ab) => ab.status === "published");

  const extractImageUrl = (markdownContent) => {
    // check if markdownContent is provided and non-empty
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }

    // regular expression to match the first image url in markdown format ![alt text](image url)
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  };

  //   console.log(publishedBlogs);

  return (
    <>
      <Head>
        <title>BlogDom - {tags}</title>
        <meta name="description" content="Admin Dashboard created by Aayush" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="blogpage">
        <div className="category_slug">
          <div className="container">
            <div className="category_title">
              <div className="flex gap-1">
                <h1>{loading ? <div>Loading...</div> : tags}</h1>
                <span>
                  {loading ? (
                    <div>0</div>
                  ) : (
                    publishedBlogs.filter((blog) => blog.tags).length
                  )}
                </span>
              </div>

              <p>{blog.subTitle}</p>
            </div>

            <div className="category_blogs mt-3">
              {loading ? (
                <>
                  <div className="wh_100 flex flex-center mt-2 pb-5">
                    <div className="loader"></div>
                  </div>
                </>
              ) : (
                <>
                  {publishedBlogs.map((blog) => {
                    // in the markdown content first image show here
                    const firstImageUrl = extractImageUrl(blog.description);
                    return (
                      <div className="cate_blog" key={blog._id}>
                        <Link href={`/blog/${blog.slug}`}>
                          <img
                            src={
                              firstImageUrl ||
                              "/img/noImage.png" ||
                              "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                            }
                            alt={blog.title}
                          />
                        </Link>
                        <div className="bloginfo mt-2">
                          {blog.tags.map((t) => {
                            return (
                              <Link href={`/tag/${t}`}>
                                <div className="blogtag">{t}</div>
                              </Link>
                            );
                          })}

                          <Link href={`/blog${blog.slug}`}>
                            <h3>{blog.title}</h3>
                          </Link>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. A fugit voluptate esse adipisci, rerum, quod
                            nesciunt nihil similique illo explicabo ab sapiente?
                            Ex, eos ut.
                          </p>

                          <div className="blogauthor flex gap-1">
                            <div className="blogaimg">
                              <img src="/img/Mylogo.png" alt="Developer" />
                            </div>

                            <div className="flex flex-col flex-left gap-05">
                              <h4>By Aayush</h4>
                              <span>
                                {new Date(blog.createdAt).toLocaleDateString(
                                  "en-In",
                                  {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div className="blogpagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 1, pageNumbers.length)
                )
                .map((number) => {
                  return (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`${currentPage === number ? "active" : ""}`}
                    >
                      {number}
                    </button>
                  );
                })}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
