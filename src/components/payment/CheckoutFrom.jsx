import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
//import useAxiosSecure from "../../../hooks/useAxiosSecure";
//import useCart from "../../../hooks/useCart";
//import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";


const CheckoutForm = ({classData}) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    //const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    //const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const {_id, price, title, email, name} = classData;
    const totalPrice = price;
   // console.log(totalPrice, classData);
    
    

    useEffect(() => {
        if (totalPrice > 0) {
            axiosPublic.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    //console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosPublic, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
            return;
        }
    
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
    
        if (error) {
            console.log('Payment error', error);
            setError(error.message);
            return;
        }
    
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });
    
        if (confirmError) {
            console.error('Confirm error:', confirmError);
            return;
        }
    
        if (paymentIntent.status === 'succeeded') {
            console.log('Payment successful:', paymentIntent);
    
            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                classId: _id,
                title,
                image: classData.image,
                name,
            };
    
            const res = await axiosPublic.post('/payments', payment);
            if (res.data?.paymentResult?.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Payment successful! You are enrolled.',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/student-dashboard/my-enrolled-classes');
            }
        }
    };
    

    return (
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
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;