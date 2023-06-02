import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Allusers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get(`/users`)
        return res.data;
    })
    console.log(users);

    const makeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(e => console.log(e))
    }
    const handleDelete = (id) => {

    }
    return (
        <div className='w-full p-10'>
            <Helmet><title>Bistro boss | All users</title></Helmet>
            <h1 className='text-3xl font-bold text-center mb-4'>Total users {users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{
                                            user.role == 'admin' ? "admin"
                                                : <button onClick={() => makeAdmin(user)} className=''>
                                                    <FaUserShield />
                                                </button>
                                        }</td>
                                        <td>
                                            <button onClick={() => handleDelete(user._id)} className="btn btn-warning btn-sm"><FaTrashAlt /></button>
                                        </td>
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

export default Allusers;