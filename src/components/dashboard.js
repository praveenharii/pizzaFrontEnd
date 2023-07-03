import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "../modal/topbar"

export default function Dashboard() {
  const [selectedPizzas, setSelectedPizzas] = useState([]);
  const [totalPrice]= useState('');
  const localtoken = localStorage.getItem("token");
  // const [totalPriceCheckout, setTotalPriceCheckout] = useState('');
  //toast.configure()

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedPizzas.forEach((pizza) => {
      totalPrice += pizza.price;
      
    });
    // setTotalPriceCheckout(totalPrice);
    return totalPrice;
  };

  const [product] = useState({
    name: "Sample Pizza",
    price: calculateTotalPrice(),
    description: "This is a sample transaction",
  });

  const handleAddToCart = (pizza) => {
    setSelectedPizzas([...selectedPizzas, pizza]);
  };

  const removePizza = (pizza) => {
    const updatedPizzas = selectedPizzas.filter(
      (selectedPizza) => selectedPizza.id !== pizza.id
    );
    setSelectedPizzas(updatedPizzas);
  };

  const pizzaData = [
    { id: 1, name: "Margherita", price: 10 },
    { id: 2, name: "Pepperoni", price: 12 },
    { id: 3, name: "Vegetarian", price: 11 },
    // Add more pizza data here
  ];

 async function handleToken(token, adresses) {
   try {
     const response = await Axios.post(
       "http://localhost:3001/checkout",
       {
         token,
         product,
         totalPrice,
       },
       {
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
           "Access-Control-Allow-Origin": "*",
           Authorization: `Bearer ${localtoken}`,
         },
       }
     );

     if (response.status === 200) {
       toast("Success Payment is completed", { type: "success" });
       console.log(response.status);
     } else if (response.status === 401) {
       toast("Unauthorized", { type: "error" });
       console.log(response.data.message);
     } else if (response.status === 403) {
       toast("Invalid token", { type: "error" });
       console.log(response.data.message);
     } else {
       toast("Failure payment is not completed", { type: "error" });
       console.log(response.status);
     }
   } catch (error) {
     console.error(error);
     toast("Error occurred during payment", { type: "error" });
   }
 }


  return (
    <>
      <Topbar />
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="white-heading">Pizza Menu</div>
            <div className="list-group">
              {pizzaData.map((pizza) => (
                <div className="list-group-item" key={pizza.id}>
                  <h4>{pizza.name}</h4>
                  <p>Price: ${pizza.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(pizza)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="white-heading">Selected Pizzas</div>
            {selectedPizzas.map((pizza) => (
              <div className="card mb-3" key={pizza.id}>
                <div className="card-body">
                  <h4>{pizza.name}</h4>
                  <button
                    className="btn btn-danger"
                    onClick={() => removePizza(pizza)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {selectedPizzas.length > 0 && (
              <>
                <p>Total Price: ${calculateTotalPrice()}</p>
                <div>
                  <StripeCheckout
                    stripeKey="pk_test_51NHtYKET8OWZGN7dMkhcXDM78ULZfiGS14vODEwkPQok4GiaBoPikrX1re8mwJYL6tV7xeDVKfStod56IzSGCFz700HlrdUGGB"
                    token={handleToken}
                    amount={product.price * 100}
                    name={product.name}
                    billingAddress
                    shippingAddress
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
