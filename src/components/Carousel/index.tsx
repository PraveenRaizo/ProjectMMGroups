import React,{useState} from 'react'
import CarouselItem from './CarouselItem'
// @ts-ignore
import SingleEOT from '../../assets/SingleEOT.png'
import './carouselItem.scss'

const Carousel:React.FC =()=>{

    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        {
            title: 'Single Girder EOT',
            description:'Single girder cranes are most cost effective purchase for capacities up to 15 tons and 20 to 80 feet spans',
            image: SingleEOT,
            link: '/about',
        },
        {
            title: 'Double Girder EOT',
            description:'Double Girder bridge cranes are most frequently used where capacities over 10 tons and/or spans of 60-100ft are needed.',
            image: SingleEOT,
            link:'/about'
        },
        {
            title: 'Gantry/Goliath Cranes',
            description:'This is an extended design of EOT crane where the crane move on rails mounted on floor level',
            image: SingleEOT,
            link:'about'
        },
        {
            title: 'Pillar mounted jib cranes',
            description:'The pillar jib crane LS is typically used to support lifting tasks that are mostly in the lower capacity range. Loads can be quickly and safely raised and can be transferred via the smooth-running jib arm',
            image: SingleEOT,
            link:'/about'
        },
        {
            title: 'Overhead crane parts',
            description:'An overhead crane, commonly called a bridge crane, is a type of crane found in industrial environments. An overhead crane consists of two parallel rails seated on longitudinal I-beams attached to opposite steel columns by means of brackets. The traveling bridge spans the gap.',
            image: SingleEOT,
            link:'/about'
        }
        
    ]

    const updateIndex =(newIndex: number)=>{
        if(newIndex<0){
            newIndex=0;
        }else if(newIndex >= items.length){
            newIndex = items.length - 1;
        }

        setActiveIndex(newIndex)
    }

    return (
        <div className='carousel'>
            <div className='inner'
                style={{transform: `translate(-${activeIndex * 100}%)`}}
            >
                {
                    items.map((item)=>{
                        return <CarouselItem item={item}/>;
                    })
                }
            </div>

            <div className='carousel-buttons'>
                <button
                    className='button-arrow' 
                    onClick={()=>{
                        updateIndex(activeIndex - 1);
                    }} 
                >
                    <span className="material-symbols-outlined">
                            arrow_back_ios
                    </span>
                </button>
                <div className='indicators'>
                    {items.map((item, index)=>{
                        return(
                            <button 
                                className='indicator-buttons'
                                onClick={()=>{
                                    updateIndex(index)
                                }}
                            >
                                <span 
                                    className={`material-symbols-outlined ${
                                        index===activeIndex
                                            ? "indicator-symbol-active"
                                            :"indicator-symbol"
                                    }`}
                                >
                                    fiber_manual_record
                                </span>
                            </button>
                        )
                    })}
                </div>
                <button 
                    className='button-arrow'
                    onClick={()=>{
                        updateIndex(activeIndex + 1);
                    }}
                >
                    <span className="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </button>
            </div>
        </div>
    )

}

export default Carousel;