import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

import img1 from '../../src/assets/home/slide1.jpg'
import img2 from '../../src/assets/home/slide2.jpg'
import img3 from '../../src/assets/home/slide3.jpg'
import img4 from '../../src/assets/home/slide4.jpg'
import img5 from '../../src/assets/home/slide5.jpg'
import SectionTitle from "./SectionTitle";

const CategoryCarousel = () => {
    return (
        <section>
            <SectionTitle
                SubHeading={'From 11.00 am to 10.00 pm'}
                Heading={'Order online'}></SectionTitle>
            <div className="text-white">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={img1} alt="" />
                        <h3 className="text-3xl uppercase -mt-14 text-center">Salads</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img2} alt="" />
                        <h3 className="text-3xl uppercase -mt-14 text-center">Pizza</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img3} alt="" />
                        <h3 className="text-3xl uppercase -mt-14 text-center">Desires</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img4} alt="" />
                        <h3 className="text-3xl uppercase -mt-14 text-center">Salads</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img5} alt="" />
                        <h3 className="text-3xl uppercase -mt-14 text-center">Salads</h3>
                    </SwiperSlide>
                </Swiper>
            </div >
        </section>

    );
};

export default CategoryCarousel;