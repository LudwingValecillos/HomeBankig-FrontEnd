import React from 'react'
import Icon  from './Icon'
import instagram from '../assets/instagram-brands-solid.svg'
import whatsapp from '../assets/whatsapp-brands-solid.svg'
import facebook from '../assets/facebook-brands-solid.svg'

const SocialNetworks = () => {
  return (
    <div className="SocialNetworks lg:w-52 flex lg:gap-2 ">
     <a href="https://www.instagram.com/" className='p-3'> <Icon src= {instagram}/></a>
     <a href="https://web.whatsapp.com/" className='p-3'> <Icon src={whatsapp}/></a>
     <a href="https://www.facebook.com/" className='p-3'> <Icon src={facebook}/></a>
    </div>
  )
}

export default SocialNetworks