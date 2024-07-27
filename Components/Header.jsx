import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { FiSearch } from "react-icons/fi";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import useFetchData from '@/hooks/useFetchData';

const Header = () => {

    const [searchOpen, setSearchOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullScreen(true)
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => {
                    setIsFullScreen(false)
                });
            }
        }
    }

    useEffect(() => {
        // check local storage for darkmode preference on initial load
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, [])
    useEffect(() => {
        // apply dark mode style when dark mode state changes
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true)
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false)
        }
    }, [darkMode])

    useEffect(() => {
        const handleKeydown = (event) => {
            switch (event.key) {
                case 'Escape':
                    setSearchOpen(false)
                    break;
                case 'f':
                    toggleFullScreen()
                    break;
                case '0':
                    setDarkMode(!darkMode)
                    break;
                default:
                // console.log(event.key);
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    // search data fetch
    const { allData, loading } = useFetchData('/api/getBlog')

    // filtering publish Blogs
    const publishedBlogs = allData.filter(item => item.status === 'published')

    const [searchQuery, setSearchQuery] = useState('')

    // filtering based on search query, search data from title
    const filteredSearchData = searchQuery.trim() === '' ? publishedBlogs : publishedBlogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return <>
        <div className="header_sec">
            <div className="container header">
                <div className="logo" data-aos="fade-right">
                    <Link href={'/'}>
                        <h1>BlogDom</h1>
                    </Link>
                </div>

                <div onClick={() => setSearchOpen(true)} className="searchbar">
                    <FiSearch />
                    <input type="search" placeholder='Discover news, articles and more' />
                </div>

                <div className="nav_list_dark">
                    <ul data-aos="fade-left">
                        <li><Link href={'/'}>Home</Link></li>
                        <li onClick={toggleFullScreen}>{isFullScreen ? <RxExitFullScreen size={22} /> : <RxEnterFullScreen size={22} />}</li>
                    </ul>

                    {/* Mobile Screen */}
                    <div className="navlist_mobile_ul">
                        <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? <BsFillSunFill /> : <BsMoonStarsFill />}</button>
                        <button onClick={() => setSearchOpen(true)}><FiSearch /> </button>
                        <button onClick={() => setMenuOpen(true)}><HiBars3CenterLeft /> </button>
                    </div>

                    <div className="darkmode" data-aos="fade-left">
                        <label className='switch'>
                            <input type="checkbox" checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
                            <span className="slider_header"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className={`search_click ${searchOpen && `open`}`}>
                <div className="searchab_input">
                    <FiSearch />
                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder='Discover news, articles and more' />
                </div>

                <div className="search_data text-center">
                    {loading ?
                        <div className="wh_100 flex flex-center mt-2 pb-5">
                            <div className="loader"></div>
                        </div>
                        :
                        <>
                            {searchQuery ? <>
                                {filteredSearchData.slice(0, 3).map((blog) => {
                                    return <Link onClick={() => setSearchOpen(false)} href={`/blog/${blog.slug}`} className="blogSearch" key={blog._id} >
                                        <div className="bloginfo">
                                            <div><h3>{blog.title}</h3></div>
                                            <p>{blog.subTitle}</p>
                                        </div>
                                    </Link>
                                })}
                            </> : <><div>No Search Results</div></>}
                        </>
                    }
                </div>
                <div className="exit_search" onClick={() => setSearchOpen(false)}>
                    <div><RxCross2 /> </div>
                    <h4>ESC</h4>
                </div>
            </div>

            {/* Mobile side bar */}
            <div className={`navlist_mobile ${menuOpen && `open`}`}>
                <div className="navlist_m_title flex flex-sb">
                    <h1>BlogDom</h1>
                    <button onClick={() => setMenuOpen(false)}><RxCross2 /></button>
                </div>

                <ul onClick={() => setMenuOpen(false)}>
                    <li><Link href={'/'}>Home</Link></li>
                </ul>

                <hr />

                <h3 className="mt-1">Topics</h3>
                <ul onClick={() => setMenuOpen(false)}>
                    <li><Link href={'/topics/htmlcssjs'}>Html Css & JS</Link></li>
                    <li><Link href={'/topics/nextjs-reactjs'}>Next & React JS</Link></li>
                    <li><Link href={'/topics/database'}>Database</Link></li>
                    <li><Link href={'/topics/deployment'}>Deployment</Link></li>
                </ul>

            </div>
        </div>
    </>
}

export default Header