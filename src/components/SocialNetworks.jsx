import React from 'react'
import Icon  from './Icon'

const SocialNetworks = () => {
  return (
    <div className="SocialNetworks lg:w-52 flex lg:gap-2 ">
     <a href="https://www.instagram.com/" className='p-3'> <Icon src="/public/instagram-brands-solid.svg"/></a>
     <a href="https://web.whatsapp.com/" className='p-3'> <Icon src="/public/whatsapp-brands-solid.svg"/></a>
     <a href="https://www.facebook.com/" className='p-3'> <Icon src="/public/facebook-brands-solid.svg"/></a>
    </div>
  )
}

export default SocialNetworks