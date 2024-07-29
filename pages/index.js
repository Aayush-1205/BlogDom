import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { tag, topics } from "@/Components/data";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);

  const { allData, loading } = useFetchData("/api/getBlog");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastingBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastingBlog - perPage;
  const currentBlogs = allData.slice(indexOfFirstBlog, indexOfLastingBlog);

  const allBlog = allData.length;

  //fliter publish blogs
  const publishedBlog = currentBlogs.filter(
    (blog) => blog.status === "published"
  );

  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allBlog / perPage); i++) {
    pageNumbers.push(i + 1);
  }

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

  return (
    <>
      <Head>
        <title>BlogDom</title>
        <meta name="description" content="BlogDom created by Aayush Shinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2 data-aos="fade-right">Recently Published</h2>
            <div className="blogs_sec">
              {loading ? (
                <div className="wh_100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  {publishedBlog.map((blog) => {
                    // in the markdown content first image show here
                    const firstImageUrl = extractImageUrl(blog.description);

                    return (
                      <div className="blog" key={blog._id} data-aos="fade-up">
                        <div className="blogimg">
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
                        </div>
                        <div className="bloginfo">
                          <Link href={`/tag/${blog.tags[0]}`}>
                            <div className="blogtag">{blog.tags[0]}</div>
                          </Link>

                          <Link href={`/blog/${blog.slug}`}>
                            <h3>{blog.title}</h3>
                          </Link>
                          <p>{blog.subTitle}</p>

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
                data-aos="fade-right"
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
                      data-aos="fade-up"
                    >
                      {number}
                    </button>
                  );
                })}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
                data-aos="fade-left"
              >
                Next
              </button>
            </div>
          </div>

          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                {topics.map((t, i) => {
                  return (
                    <Link key={i} href={`/topics/${t.url}`}>
                      <div className="topics">
                        <div className="flex flex-center topics_svg">
                          <img src={`/img/${t.icon}`} alt="" />
                        </div>
                        <h3>{t.topic}</h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                {tag.map((tag, index) => {
                  return (
                    <Link key={index} href={`/tag/${tag.url}`}>
                      {tag.topic}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="letstalk_sec mt-3">
              <h2>Social Links</h2>
              <div className="talk_sec">
                <div className="flex flex-center gap-1">
                  <Link
                    className="st_icon"
                    target="_blank"
                    href={"https://github.com/Aayush-1205"}
                  >
                    <FaGithub />
                  </Link>

                  <Link
                    className="st_icon"
                    target="_blank"
                    href={
                      "https://www.linkedin.com/in/aayush-shinde-178a952b6/"
                    }
                  >
                    <FaLinkedin />
                  </Link>

                  <Link
                    className="st_icon"
                    target="_blank"
                    href={"https://www.instagram.com/aayush.s54"}
                  >
                    <FaInstagram />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Home