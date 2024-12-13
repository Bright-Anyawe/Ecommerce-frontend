import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";

export const Checkout = ({ totalAmount }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();


  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const response = await fetch(
        "https://us-central1-ecommerce-2d416.cloudfunctions.net/createPaymentIntent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalAmount }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create Payment Intent");
      }

      const { clientSecret } = await response.json();

      const { error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        <CardElement />
      </div> */}
      {error && <div>{error}</div>}
      <button className="checkOutBtn" disabled={processing} type="submit">
        {processing ? "Processing..." : "Pay Now!"}
      </button>
    </form>
  );
};
