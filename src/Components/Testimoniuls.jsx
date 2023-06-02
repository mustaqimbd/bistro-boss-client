import React, { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation } from "swiper";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testimoniuls = () => {
    const [review, setReview] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])
    return (
        <div className='my-20'>
            <SectionTitle
                SubHeading='What our client say'
                Heading="Testimonials"
            />
            <Swiper
                pagination={{
                    type: "progressbar",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    review.map(reviw => <SwiperSlide key={reviw._id}>
                        <div className='w-[80%] mx-auto my-6 flex flex-col items-center'>
                            <Rating
                                style={{ maxWidth: 150 }}
                                value={reviw.rating}
                                readOnly
                            />
                            <p>{reviw.details}</p>
                            <h1 className='text-2xl'>{reviw.name}</h1>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default Testimoniuls;