import React from 'react';

const SectionTitle = ({ Heading, SubHeading }) => {
    return (
        <div className='text-center w-[25%] mx-auto'>
            <p className='text-yellow-600 mb-4'>--- {SubHeading} --- </p>
            <h1 className='text-4xl border-y-4 mb-5 pb-4'>{Heading}</h1>
        </div>
    );
};

export default SectionTitle;