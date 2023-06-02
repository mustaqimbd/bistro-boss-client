import React from 'react';

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    // console.log(item);
    return (
        <div className='flex space-x-4'>
            <img className='w-[120px] rounded-r-full rounded-bl-full' src={image} alt="" />
            <div>
                <h1 className='uppercase'>{name}----------</h1>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>$ {price}</p>
        </div>
    );
};

export default MenuItem;