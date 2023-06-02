import React, { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import MenuItem from '../Pages/Shared/MenuItem';
import useMenu from '../Hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category == "popular")
    
    return (
        <section>
            <SectionTitle Heading="From our menu" SubHeading="Popular menu" />
            <div className='grid md:grid-cols-2 gap-5 mb-12'>
                {
                    popular.map(item => <MenuItem item={item} key={item._id} />)
                }
            </div>
            <button className='btn btn-outline border-0 border-b-4 mt-4'>View menu</button>
        </section>
    );
};

export default PopularMenu;