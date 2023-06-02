import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Components/Cover';
import coverImage from '../../src/assets/menu/banner3.jpg'
import desertImg from '../../src/assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../src/assets/menu/pizza-bg.jpg'
import saladImg from '../../src/assets/menu/salad-bg.jpg'
import soupImg from '../../src/assets/menu/soup-bg.jpg'

import useMenu from '../Hooks/useMenu';
import SectionTitle from '../Components/SectionTitle';
import MenuCategory from '../Components/MenuCategory';
const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category == "dessert")
    const pizzas = menu.filter(item => item.category == "pizza")
    const salads = menu.filter(item => item.category == "salad")
    const soups = menu.filter(item => item.category == "soup")
    const offereds = menu.filter(item => item.category == "offered")
    // console.log(desserts, pizzas, salads, soups, offereds);
    return (
        <div>
            <Helmet>
                <title>Bistro | menu</title>
            </Helmet>
            <Cover image={coverImage} title="our menu" />
            <SectionTitle Heading="today's offer" SubHeading="Don't miss it" />
            <MenuCategory items={offereds}/>
            <MenuCategory items={desserts} title="dessert" text="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." coverImage={desertImg}/>
            <MenuCategory items={pizzas} title="pizza" coverImage={pizzaImg} text="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
            <MenuCategory items={soups} title="soup" coverImage={soupImg} text="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
        </div>
    );
};

export default Menu;