import { useState } from 'react';
import coverImg from '../../src/assets/shop/banner2.jpg'
import Cover from '../Components/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../Hooks/useMenu';
import FoodCard from './Shared/FoodCard';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams();
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();

    const desserts = menu.filter(item => item.category == "dessert")
    const pizzas = menu.filter(item => item.category == "pizza")
    const salads = menu.filter(item => item.category == "salad")
    const soups = menu.filter(item => item.category == "soup")
    const drinks = menu.filter(item => item.category == "drinks")

    return (
        <div>
            <Helmet>
                <title>Bistro boss | Order </title>
            </Helmet>
            <Cover image={coverImg} title="Order food" />
            <Tabs classID='text-center' defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUP</Tab>
                    <Tab>DESSERT</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salads} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizzas} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soups} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} />
                </TabPanel>
            </Tabs>
        </div>
    );
};
const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };

    return (
        <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
        >
            <div className='grid grid-cols-3 gap-5'>
                {items.map(item => <FoodCard item={item} key={item._id} />)}
            </div>
        </Swiper>
    )
}
export default Order;