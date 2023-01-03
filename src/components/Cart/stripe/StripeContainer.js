import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "sk_test_51MCNkxSFsMTnmESMMeFsJbVQlrzLJG5cxdRY0wdVkKRC2o6Mxf26l3NHNqwyRJM3Z2SonsleG2DADRNWuWdUXbnM0063HsLtsk"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}