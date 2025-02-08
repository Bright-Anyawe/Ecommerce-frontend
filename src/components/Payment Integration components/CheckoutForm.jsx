import { useState } from "react";

export const Checkout = () => {
  const [processing, setProcessing] = useState(false);

  const handleCheckout = () => {
    setProcessing(true);
    window.location.href = "https://buy.stripe.com/test_dR6bKQ5We2z9cmceUU"; 
  };

  return (
    <button 
      className="checkOutBtn" 
      disabled={processing} 
      onClick={handleCheckout}
    >
      {processing ? "Processing..." : "Pay Now!"}
    </button>
  );
};
