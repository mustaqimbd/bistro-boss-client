import React from 'react';
import SectionTitle from './SectionTitle';
import feateredImg from '../../src/assets/home/featured.jpg'
const Featured = () => {
    return (
        <div className="bg-[url('../../src/assets/home/featured.jpg')] p-20 bg-fixed">
            <SectionTitle Heading="Featured item" SubHeading="Check it out"></SectionTitle>

            {/* <img src={feateredImg} alt="" /> */}
            <div className="flex items-center gap-6 w-[80%] justify-center mx-auto">
                <div>
                    <img src={feateredImg} alt="" />
                </div>
                <div className="text-white">
                    <h2>March 20, 2023</h2>
                    <h1>WHERE CAN I GET SOME?</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order now</button>
                </div>
            </div>

        </div>
    );
};

export default Featured;