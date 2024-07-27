import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    // function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    // show or hide the button based on scroll position
    const handleScroll = () => {
        window.scrollY > 300 ? setIsVisible(true) : setIsVisible(false)
    }

    // add scroll event listener when component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

  return (
    <button className={`scrollToTop ${isVisible ? 'show' : 'hide'}`} onClick={scrollToTop}>
        <FaArrowUp size={22} />
    </button>
  )
}

export default ScrollTop