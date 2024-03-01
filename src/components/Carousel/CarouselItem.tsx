import React from 'react'
import './carouselItem.scss'
import { Typography } from '@mui/material';


const CarouselItem:React.FC<{item: any}> = ({item})=>{

    

    return (
        <div className='carousel-item'>
            <div className='carousel-item-text'><Typography sx={{typography:{lg:'h3', md:'h4', sm:'h5', xs:'h6'}}}>{item.title}</Typography><br/>{item.description}<br/><a href='/about'>See More...</a></div>
            <img className='carousel-img' src={item.image} alt={item.description}/>
            
        </div>
    )
}

export default CarouselItem;    