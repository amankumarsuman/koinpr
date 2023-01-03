import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51MCNkxSFsMTnmESM7SDVwYsYGI4JZExcJ4GLkP2034gGK70mlzP43CwdOxtuCqcxXKK0tlQ0LCqKeYMBrWz3qjBJ00vYdDixbV"
    );
  }
  return stripePromise;
};

export default getStripe;
