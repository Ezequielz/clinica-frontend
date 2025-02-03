import { PaypalBtn } from '../components/payments/paypal/PaypalBtn';


export default function Home() {
  return (
    <div>

    <PaypalBtn orderId="85ae51fd-be40-4690-b2cd-22eda0f04596" amount={90}/>

    </div>
  );
}
