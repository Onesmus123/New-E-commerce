import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet hic adipisci, nobis fugiat vero minima est facere ratione molestias consequuntur quzi minus tempore culpa ex ipsum placeat! Perferendis, corrupti obcaecati.</p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus tempora consequuntur dolorem optio? Pariatur tempore tenetur tempora numquam quae sapiente recusandae odit dolorum dolore quis consectetur, minima repellendus mollitia quia?
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox