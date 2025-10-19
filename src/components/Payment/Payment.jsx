// import { useParams } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import axiosInstance from "../../api"; // ✅ import your axios instance

// // ✅ Stripe public key (test mode)
// const stripePromise = loadStripe(
//   "pk_test_51SBdn03jiwAOhwXnkhPv4OaucEVlsrJO7VEjt1oFjOWWl0ogzZsTlOucPJcKoXtTo6dXBO9wMIj1nYFnQzHl3MTT00tIB7YT9E"
// );

// function PaymentForm({ bookingId }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(true);
//   console.log("clientSecret:", clientSecret);
//   // ✅ Fetch clientSecret from backend
//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       try {
//         const res = await axiosInstance.post(
//           `/payment/create-intent/${bookingId}`
//         );
//         // If backend just returns the string, handle accordingly
//         const secret =
//           typeof res.data === "string"
//             ? res.data
//             : res.data.clientSecret || res.data.client_secret;
//         setClientSecret(secret);
//       } catch (err) {
//         console.error("❌ Failed to create payment intent:", err);
//         alert("Failed to create payment intent. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     createPaymentIntent();
//   }, [bookingId]);

//   // ✅ Handle Stripe payment
//   const handlePayment = async () => {
//     if (!stripe || !elements || !clientSecret) return;

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       alert("Payment failed: " + result.error.message);
//     } else if (result.paymentIntent.status === "succeeded") {
//       try {
//         await axiosInstance.post(`/payment/confirm/${bookingId}`);
//         alert("✅ Payment successful! Booking confirmed.");
//       } catch (err) {
//         console.error("Error confirming payment:", err);
//         alert("Payment succeeded, but confirmation failed. Contact support.");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center text-gray-600">Loading payment details...</p>
//     );
//   }

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h3 className="text-xl font-semibold mb-2">
//         Payment for Booking #{bookingId}
//       </h3>
//       <CardElement className="border p-2 mb-4" />
//       <button
//         onClick={handlePayment}
//         disabled={!stripe || !clientSecret}
//         className="bg-blue-600 text-white p-2 rounded w-full mt-2 disabled:bg-gray-400"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// }

// // ✅ Parent component
// export default function Payment() {
//   const { bookingId } = useParams();

//   return (
//     <div className="container mx-auto p-4 max-w-md">
//       <h2 className="text-2xl font-bold mb-4">Payment</h2>
//       <Elements stripe={stripePromise}>
//         <PaymentForm bookingId={bookingId} />
//       </Elements>
//     </div>
//   );
// }
//---------------------------------------------------------------------------------------------------------
// import { useParams, useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import axiosInstance from "../../api";
// import PropTypes from "prop-types"; // ✅ Import PropTypes

// // ✅ Stripe public key (test mode)
// const stripePromise = loadStripe(
//   "pk_test_51SBdn03jiwAOhwXnkhPv4OaucEVlsrJO7VEjt1oFjOWWl0ogzZsTlOucPJcKoXtTo6dXBO9wMIj1nYFnQzHl3MTT00tIB7YT9E"
// );

// // Component that handles the payment logic
// function PaymentForm({ bookingId }) {
//   // Convert bookingId to a number immediately for consistency
//   const currentBookingId = parseInt(bookingId);
//   const navigate = useNavigate();

//   // Guard against invalid/missing bookingId before fetching
//   if (isNaN(currentBookingId) || currentBookingId <= 0) {
//     return (
//       <div className="p-4 bg-red-100 text-red-700 rounded">
//         Invalid booking ID provided.
//       </div>
//     );
//   }

//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // ✅ Added error state

//   // ✅ Fetch clientSecret from backend
//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       try {
//         const res = await axiosInstance.post(
//           // Use the validated ID
//           `/payment/create-intent/${currentBookingId}`
//         );

//         const secret =
//           typeof res.data === "string"
//             ? res.data
//             : res.data.clientSecret || res.data.client_secret;

//         if (!secret) {
//           throw new Error("Client Secret not received from backend.");
//         }

//         setClientSecret(secret);
//       } catch (err) {
//         console.error("❌ Failed to create payment intent:", err);
//         setError(
//           "Failed to initialize payment. Please check your backend connection."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     createPaymentIntent();
//   }, [currentBookingId]); // Depend on currentBookingId

//   // ✅ Handle Stripe payment
//   const handlePayment = async () => {
//     setError(null);
//     if (!stripe || !elements || !clientSecret) return;

//     try {
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         setError("Payment failed: " + result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         // STEP 1: Stripe succeeded

//         // STEP 2: Call backend confirmation
//         await axiosInstance.post(`/payment/confirm/${currentBookingId}`);

//         // STEP 3: Final success notification
//         alert("✅ Payment successful! Booking confirmed.");
//         navigate("/booking-history");

//         // TODO: Redirect user to the final confirmation page
//         // navigate(`/confirmation/${currentBookingId}`);
//       } else {
//         setError(
//           `Payment status is ${result.paymentIntent.status}. Please check your Stripe dashboard.`
//         );
//       }
//     } catch (err) {
//       console.error("Error during confirmation:", err);
//       setError("Payment succeeded, but confirmation failed. Contact support.");
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center text-gray-600">Loading payment details...</p>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>
//     );
//   }

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h3 className="text-xl font-semibold mb-2">
//         Payment for Booking #{currentBookingId}
//       </h3>
//       <CardElement className="border p-2 mb-4" />
//       <button
//         onClick={handlePayment}
//         // Disable if Stripe is not loaded, or if clientSecret is missing
//         disabled={!stripe || !clientSecret}
//         className="bg-blue-600 text-white p-2 rounded w-full mt-2 disabled:bg-gray-400 hover:bg-blue-700 transition"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// }

// PaymentForm.propTypes = {
//   bookingId: PropTypes.string.isRequired,
// };

// // Parent component (exports the default component)
// export default function Payment() {
//   const { bookingId } = useParams();

//   // Ensure bookingId is available before rendering Elements
//   if (!bookingId) {
//     return (
//       <div className="container mx-auto p-4 max-w-md">
//         <div className="p-4 bg-red-100 text-red-700 rounded">
//           Missing booking ID in URL. Cannot proceed with payment.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-md">
//       <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
//       <Elements stripe={stripePromise}>
//         {/* Pass the string bookingId from URL param directly */}
//         <PaymentForm bookingId={bookingId} />
//       </Elements>
//     </div>
//   );
// }





















import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axiosInstance from "../../api";
import PropTypes from "prop-types";

const stripePromise = loadStripe(
  "pk_test_51SBdn03jiwAOhwXnkhPv4OaucEVlsrJO7VEjt1oFjOWWl0ogzZsTlOucPJcKoXtTo6dXBO9wMIj1nYFnQzHl3MTT00tIB7YT9E"
);

function PaymentForm({ bookingId }) {
  const currentBookingId = parseInt(bookingId);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axiosInstance.post(
          `/payment/create-intent/${currentBookingId}`
        );
        const secret =
          typeof res.data === "string"
            ? res.data
            : res.data.clientSecret || res.data.client_secret;

        if (!secret) throw new Error("Client Secret not received");

        setClientSecret(secret);
      } catch (err) {
        console.error("Failed to create payment intent:", err);
        setError("Failed to initialize payment. Please check your backend.");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [currentBookingId]);

  const handlePayment = async () => {
    setError(null);
    if (!stripe || !elements || !clientSecret) return;

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError("Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await axiosInstance.post(`/payment/confirm/${currentBookingId}`);
        alert("✅ Payment successful! Booking confirmed.");
        navigate("/booking-history");
      } else {
        setError(`Payment status is ${result.paymentIntent.status}.`);
      }
    } catch (err) {
      console.error("Error during confirmation:", err);
      setError("Payment succeeded, but confirmation failed. Contact support.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading payment details...</p>;

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">
        Payment for Booking #{currentBookingId}
      </h3>
      <div className="border rounded p-3 mb-6">
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      <button
        onClick={handlePayment}
        disabled={!stripe || !clientSecret}
        className="w-full bg-blue-600 disabled:bg-gray-400 text-white py-3 font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
}

PaymentForm.propTypes = {
  bookingId: PropTypes.string.isRequired,
};

export default function Payment() {
  const { bookingId } = useParams();

  if (!bookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-red-50">
        <div className="max-w-md w-full bg-red-100 text-red-700 p-6 rounded-md shadow-md text-center font-medium">
          Missing booking ID in URL. Cannot proceed with payment.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 select-none">
          Complete Your Payment
        </h2>
        <Elements stripe={stripePromise}>
          <PaymentForm bookingId={bookingId} />
        </Elements>
      </div>
    </div>
  );
}
