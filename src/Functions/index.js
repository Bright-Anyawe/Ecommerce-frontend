import * as functions from "firebase-functions";
import admin from "firebase-admin";
import Stripe from "stripe";
import cors from "cors";

const stripe = new Stripe("your-secret-key");
admin.initializeApp();

const corsHandler = cors({ origin: true });

export const createPaymentIntent = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
});
