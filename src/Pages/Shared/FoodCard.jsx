import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;

    const { user } = useContext(AuthContext);
    const [, refetch] = useCart()
    const navigate = useNavigate();
    const location = useLocation();
    const handleAddToCart = item => {
        console.log(item);
        if (user && user.email) {
            const cartItem = { itemId: _id, name, image, price, email: user.email }
            console.log(cartItem);
            fetch('http://localhost:5000/carts', {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        refetch() // refetch cart to update item number
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Food added on the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch(e => console.log(e))
        } else {
            Swal.fire({
                title: 'Please log in to order place now',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Log in'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: location, replace: true })
                }
            })
        }
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-xl relative">
                <figure className=''><img src={image} alt="Shoes" /></figure>
                <p className='absolute right-6 top-4 text-white px-2 py-1 bg-black rounded-md'>$ {price}</p>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-center">
                        <button onClick={() => handleAddToCart(item)} className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;