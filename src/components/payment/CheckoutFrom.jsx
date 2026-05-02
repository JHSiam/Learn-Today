import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ classData }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { _id, price, title, name } = classData;
  const totalPrice = price;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosPublic
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axiosPublic, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Confirm error:", confirmError);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        classId: _id,
        title,
        image: classData.image,
        name,
      };

      const res = await axiosPublic.post("/payments", payment);
      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment successful! You are enrolled.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/student-dashboard/my-enrolled-classes");
      }
    }
  };

  return (
    <div className="bg-transparent p-8 rounded-2xl max-w-lg mx-auto border border-purple-500/40 shadow-lg backdrop-blur-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-300">
        Complete Your Payment
      </h2>

      <div className="mb-4 text-center">
        <p className="text-lg font-semibold text-white">{title}</p>
        <p className="text-purple-400 text-xl font-bold">${totalPrice}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 border border-purple-500/40 rounded-lg shadow-inner bg-black/30">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#E5E7EB",
                  fontFamily: "Arial, sans-serif",
                  "::placeholder": { color: "#9CA3AF" },
                },
                invalid: { color: "#F87171" },
              },
            }}
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {transactionId && (
          <p className="text-green-400 text-sm">
            Transaction ID: {transactionId}
          </p>
        )}

        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
