import { Helmet } from 'react-helmet-async';
import useCart from '../../../Hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2';

const Mycard = () => {
    const [cart, refetch] = useCart()
    const sum = cart.reduce((sum, item) => {
        return sum + item.price;
    }, 0);
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
                fetch(`http://localhost:5000/cart/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
                    .catch(e => console.log(e))
            }
        })
    }


    return (
        <div className='w-full'>
            <Helmet>
                <title>Bistro | Dashboard | Cart</title>
            </Helmet>
            <div className='flex justify-evenly mb-10 items-center'>
                <h3 className='text-3xl font-bold'>Total item : {cart.length}</h3>
                <h3 className='text-3xl font-bold'>Total price : $ {sum}</h3>
                <button className='btn btn-primary btn-sm'>Pay</button>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Food</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((row, index) => {
                            return (
                                <tr key={row._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={row.image} alt="image" />
                                        </div>
                                    </td>
                                    <td>
                                        {row.name}
                                    </td>
                                    <td className='text-end'>$ {row.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(row._id)} className="btn btn-warning btn-sm"><FaTrashAlt /></button>
                                    </th>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Mycard;