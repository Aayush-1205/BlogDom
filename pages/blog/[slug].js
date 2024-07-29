import axios from "axios";
import { useRouter } from "next/router";
import { Children, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { allyDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { tag, topics } from "@/Components/data";
import Link from "next/link";

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState([""]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/getBlog?slug=${slug}`)
        .then((res) => {
          const allData = res.data;
          setBlog(allData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog", error);
        });
    }
  }, [slug]);

  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");

    const [copied, setCopied] = useState();
    // copy code
    const copyCode = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={allyDark}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              background: "#3d3d3d",
              color: "#fff",
              padding: "10px",
            }}
            onClick={copyCode}
          >
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <>
      <div className="slugpage">
        <div className="container">
          <div className="topslug_titles">
            <h1 className="slugtitle">
              {loading ? <div>Loading...</div> : blog && blog[0]?.title}
            </h1>

            <h5>
              <div className="flex gap-1 ">
                Published in
                <span>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      {blog[0]?.blogCategory.map((blogCate, index) => {
                        return (
                          <Link key={index} href={`/topics/${blogCate}`}>
                            <div className="blogtag">{blogCate}</div>
                          </Link>
                        );
                      })}
                    </>
                  )}
                </span>
              </div>
              {blog &&
                new Date(blog[0].createdAt).toLocaleDateString("en-In", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
            </h5>
          </div>

          <div className="flex flex-sb flex-left pb-5 flex-wrap">
            <div className="leftblog_data_markdown">
              {loading ? (
                <div className="wh_100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  <div className="w-100 blogcontent">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{ code: Code }}
                    >
                      {blog[0].description}
                    </ReactMarkdown>
                  </div>
                </>
              )}
            </div>

            <div className="rightslug_data">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
