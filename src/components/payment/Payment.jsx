import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
//import CheckoutForm from "./CheckoutForm";
import CheckoutForm from "./CheckoutFrom";

// TODO: add publishable key
const stripePromise = loadStripe('pk_test_51Qjiu5G87L8W2FOoTSWqmEchadl0BOW1ltzFzMpHfUxwPZi8ycbK4xkdQCM4vv6FACEtULWTfVdmJuU7w6cKAcwn00bZf2t022');
const Payment = () => {
    return (
        <div>
            <h1>Payment</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;