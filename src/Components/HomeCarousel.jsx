import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../src/assets/home/01.jpg';
import img2 from '../../src/assets/home/02.jpg';
import img3 from '../../src/assets/home/03.png';
import img4 from '../../src/assets/home/04.jpg';
import img5 from '../../src/assets/home/05.png';
import img6 from '../../src/assets/home/06.png';
import './homecarousel.css'
import SectionTitle from './SectionTitle';
const HomeCarousel = () => {
    return (
        
            <div className="carousel-container"> {/* Add a class or ID to the container */}
                <Carousel axis="vertical" autoPlay infiniteLoop>
                    <div>
                        <img src={img1} alt="Image 1" />
                    </div>
                    <div>
                        <img src={img2} alt="Image 2" />
                    </div>
                    <div>
                        <img src={img3} alt="Image 3" />
                    </div>
                    <div>
                        <img src={img4} alt="Image 4" />
                    </div>
                    <div>
                        <img src={img5} alt="Image 5" />
                    </div>
                    <div>
                        <img src={img6} alt="Image 6" />
                    </div>
                </Carousel>
            </div>
    );
};

export default HomeCarousel;
