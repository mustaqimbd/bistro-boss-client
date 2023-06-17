import React from 'react';
import CheckOut from './CheckOut';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useCart from '../../../Hooks/useCart';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Payment_pk)
    const [cart] = useCart()
    const total = cart.reduce((sum, item) => {
        console.log(sum);
        return sum + parseFloat(item.price)
    }, 0)
    const price = parseFloat(total.toFixed(total))
    console.log('sumsumesume', price);
    return (
        <div>
            <h1 className='text-3xl font-bold p-5 text-center'>Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckOut price={price} cart={cart}></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;