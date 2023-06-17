import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useEffect } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const CheckOut = ({ cart, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState()

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('checkout payment error', error);
            setError(error.message)
        } else {
            setError('')
            console.log('checkout payment method', paymentMethod);
        }
        setProcessing(true)
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.name,
                        email: user?.email,
                    },
                },
            },
        );
        if (paymentError) {
            console.log(paymentError);
        }
        if (paymentIntent.status === 'succeeded') {
            console.log('payment succeeded id ', paymentIntent.id);
            setTransactionId(paymentIntent.id)
            const paymentDetails = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price: price,
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.itemId),
                itemNames: cart.map(item => item.name),
                date: new Date(),
                status: 'Order pending'
            }
            axiosSecure.post('/payments', paymentDetails)
                .then(res => {
                    console.log(res.data);
                })
        }
        setProcessing(false)

    }

    return (
        <div className='mx-10'>
            <p className='py-5'>{error}</p>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
                {transactionId && <p className='text-green-500'>Payment successful with transaction Id : {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckOut;