import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const handleCheckOut = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
      let response = await fetch("https://mernback-em0b.onrender.com/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });
  
      if (response.status === 200) {
        // Clear the cart only after successful checkout
        dispatch({ type: "DROP" });
        alert("Order placed successfully!");
      } else {
        // Handle other response statuses, such as errors
        console.error("Error occurred during checkout:", response.statusText);
        alert("Failed to place order. Please try again later.");
      }
    } catch (error) {
      console.error("Error occurred during checkout:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

 
  

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover'>
          <thead className='fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><i class="fa fa-trash" aria-hidden="true" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}></i> </button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>



    </div>
  )
}