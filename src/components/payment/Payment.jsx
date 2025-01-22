import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
//import CheckoutForm from "./CheckoutForm";
import CheckoutForm from "./CheckoutFrom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// TODO: add publishable key
const stripePromise = loadStripe('pk_test_51Qjiu5G87L8W2FOoTSWqmEchadl0BOW1ltzFzMpHfUxwPZi8ycbK4xkdQCM4vv6FACEtULWTfVdmJuU7w6cKAcwn00bZf2t022');
const Payment = () => {
    const { id } = useParams();
    const [classData, setClassData] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic
            .get(`/all-class/${id}`)
            .then((response) => setClassData(response.data))
            .catch((error) => console.error("Error fetching class details:", error));
    }, [id, axiosPublic]);

    if (!classData) {
        return <div>Loading...</div>;
    }
    //const {price} = classData;
    

    return (
        <div className="max-w-[800px] mx-auto">
            <h1>Payment</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm classData ={classData}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;