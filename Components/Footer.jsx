import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="container flex flex-sb flex-wrap flex-left">
                <div className="footer_logo">
                    <h2>BlogDom</h2>
                    <h4>&copy; 2024 All Rights Reserved.</h4>
                    <h3>Coded By <span><Link target='_blank' href={'https://github.com/Aayush-1205'}>@Aayush</Link></span></h3>
                </div>
                <div className="q_links">
                    <h3>Social Media</h3>
                    <ul>
                        <li><Link target='_blank' href={'https://github.com/Aayush-1205'}>Github</Link></li>
                        <li><Link target='_blank' href={'https://www.linkedin.com/in/aayush-shinde-178a952b6/'}>Linkedin</Link></li>
                        <li><Link target='_blank' href={'https://www.instagram.com/aayush.s54'}>Instagram</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer