import { useState } from 'react';
import './paymentFormstyle.css';
// import spatula from './assets/spatula.jpg';
import StripeContainer from './StripeContainer';

function Stripe() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className='App'>
			<h1>Payment details</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>$10.00</h3>
					<img src="https://nimbbl.biz/blog/wp-content/uploads/2022/02/Checkout-Process.jpg" alt='checkout' />
					<button onClick={() => setShowItem(true)}>Order</button>
				</>
			)}
		</div>
	);
}

export default Stripe;