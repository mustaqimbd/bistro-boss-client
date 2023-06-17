import React from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
const image_hosting_token = import.meta.env.VITE_Image_upload_apiKey;
const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`

const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])
        console.log(formData);
        fetch(image_upload_url, { method: 'POST', body: formData })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    console.log(result.data.display_url);
                    data.price = parseFloat(data.price)
                    const item = data;
                    item.image = result.data.display_url;
                    console.log(item);
                    axiosSecure.post('/menu', item)
                        .then(data => {
                            if (data.data.insertedId) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Item added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    }
    return (
        <div className='w-full px-10'>
            <SectionTitle SubHeading="What's new" Heading='Add an Item' />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full ">
                    <label className="label font-semibold">
                        Recipe Name *
                    </label>
                    <input type="text" placeholder="Type here" {...register("name", { required: true, maxLength: 80 })} className="input input-bordered w-full " />
                </div>
                <div className='flex gap-5'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category *</span>
                        </label>
                        <select defaultValue='Pick One' className="select select-bordered" {...register("category", { required: true })}>
                            <option>Pick one</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salads</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label font-semibold">
                            Price *
                        </label>
                        <input type="number" placeholder="Type here" {...register("price", { required: true, maxLength: 80 })} className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe Details *</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Enter" {...register("recipe", { required: true })}></textarea>
                </div>
                <label className="label">
                    <span className="label-text">Item image *</span>
                </label>
                <input type="file" className="file-input file-input-bordered w-full " {...register("image", { required: true })} />
                <input type='submit' value='Add item' className="btn mt-5 w-[100px] mx-auto" ></input>
            </form>
        </div>
    );
};

export default AddItem;