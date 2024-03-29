import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import MyOrdersNavBar from '../components/MyOrdersNavBar/MyOrdersNavBar'

export default function MyOrder() {
    const [orderData, setOrderData] = useState("")
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("https://mernback-em0b.onrender.com/api/myorderData", {
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log(response)
            await setOrderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])
    return (
        <>
            <div><MyOrdersNavBar/></div>
            <hr></hr>
            <div className='container'>
                <div className='row'>
                    {Object.keys(orderData).length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? 
                                                        <div className='m-auto mt-5'>
                                                            {data = arrayData.Order_date}
                                                            <hr />
                                                        </div> :
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", backgroundColor: "#1b1b1b" }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                      
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            );
                                        })
                                    );
                                }) : <div style={{"textAlign":"center"}}>Empty</div>
                        );
                    }) : <div style={{"textAlign":"center"}}>Empty</div>}
                </div>
            </div>
            <div><Footer /></div>
        </>
    );
    
}