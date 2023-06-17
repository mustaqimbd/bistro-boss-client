import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageItem = () => {
    const [menu, refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure()

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full">
            <SectionTitle Heading="Manage All Items" SubHeading='Hurry up' />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            menu.map((item, index) => {
                                return (
                                    <tr key={item._id}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            Zemlak, Daniel and Leannon
                                        </td>

                                        <td>Purple</td>
                                        <td>Purple</td>
                                        <td><button onClick={() => handleDelete(item._id)} className="btn btn-warning btn-sm"><FaTrashAlt /></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItem;