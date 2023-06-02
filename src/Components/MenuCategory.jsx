import { useEffect, useState } from 'react';
import MenuItem from '../Pages/Shared/MenuItem';
import Cover from './Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, coverImage, text }) => {
    return (
        <div className='mb-12'>
            {coverImage && <Cover image={coverImage} title={title} text={text} />}
            <div className='grid md:grid-cols-2 gap-5 mb-12 mt-12'>
                {
                    items.map(item => <MenuItem item={item} key={item._id} />)
                }
            </div>
            <div className='flex'>
                <Link to={`/order/${title}`} className='btn btn-outline border-0 bg-slate-100 border-orange-400 border-b-4 mt-4 mx-auto'>Order now</Link>
            </div>
        </div>
    );
};

export default MenuCategory;