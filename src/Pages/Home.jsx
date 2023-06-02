import React from 'react';
import HomeCarousel from '../Components/HomeCarousel';
import CategoryCarousel from '../Components/CategoryCarousel';
import PopularMenu from '../Components/PopularMenu';
import Featured from '../Components/Featured';
import Testimoniuls from '../Components/Testimoniuls';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro | Home</title>
            </Helmet>
            <HomeCarousel />
            <CategoryCarousel />
            <PopularMenu />
            <Featured />
            <Testimoniuls />
        </div>
    );
};

export default Home;