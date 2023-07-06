import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "../modal/topbar"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import env from "react-dotenv";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "../images/pexels-valeria-boltneva-16677741.jpg";
import Image1 from "../images/pexels-valeria-boltneva-10875298.jpg";
import Image2 from "../images/pexels-team-picsfast-8753771.jpg";
import Image3 from "../images/pexels-christina-petsos-11568775.jpg";
import Image4 from "../images/pexels-polina-tankilevitch-4109137.jpg";
//import Image5 from "../images/pexels-rene-strgar-14224747.jpg";
import Image6 from "../images/pexels-polina-tankilevitch-5848292.jpg";
import Image7 from "../images/pexels-koolshooters-7143088.jpg";

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
    {
      id: 1,
      name: "Margherita",
      price: 10,
      image: Image,
    },
    {
      id: 2,
      name: "Pepperoni",
      price: 12,
      image: Image1,
    },
    {
      id: 3,
      name: "Vegetarian",
      price: 11,
      image: Image2,
    },
    {
      id: 4,
      name: "Koroko",
      price: 21,
      image: Image3,
    },
    {
      id: 5,
      name: "Babu",
      price: 18,
      image: Image4,
    },
    {
      id: 6,
      name: "Chiken notaka",
      price: 28,
      image: Image6,
    },
    // {
    //   id: 7,
    //   name: "Side Chick",
    //   price: 200,
    //   image: Image7,
    // },
    // Add more pizza data here
  ];

 async function handleToken(token, adresses) {
   try {
     const response = await Axios.post(
       `${env.APP_API_PORT}/checkout`,
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

      <br />
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-10">
            <div className="white-heading">Pizza Menu</div>
            <Row xs={1} md={3} className="g-4">
              {pizzaData.map((pizza) => (
                <Col key={pizza.id}>
                  <Card>
                    <Card.Img variant="top" src={pizza.image} />
                    <Card.Body>
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <p>
                            <Card.Title>{pizza.name}</Card.Title>
                          </p>
                          <footer className="blockquote-footer">
                            RM {pizza.price}
                          </footer>
                        </blockquote>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          variant="outline-success"
                          onClick={() => handleAddToCart(pizza)}
                        >
                          Add to cart
                        </Button>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div className="col-lg-2">
            <div className="white-heading">Selected Pizzas</div>

            {selectedPizzas.map((pizza) => (
              <div className="card mb-3" key={pizza.id}>
                <div className="card-body">
                  <h4>{pizza.name}</h4>
                  <button
                    className="btn btn-danger remove-button"
                    onClick={() => removePizza(pizza)}
                  >
                    <span className="button-text">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            {selectedPizzas.length > 0 && (
              <>
                <h3 style={{ color: "white" }}>
                  {" "}
                  <sup> RM </sup> {calculateTotalPrice()}{" "}
                  <span class="small"> /total </span>{" "}
                </h3>

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
