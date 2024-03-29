
import React, { useEffect, useRef, useState } from 'react'
import './Card.css'
import { useDispatchCart, useCart } from '../ContextReducer'

export default function Card(props) {
    const dispatch = useDispatchCart()
    const data = useCart()
    const priceRef = useRef()
    const { options, description } = props
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState(Object.keys(options)[0]) // Initialize size with the first option
    const foodItems = props.foodItems
    const priceOptions = Object.keys(options)

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === foodItems._id) {
                food = item
                break
            }
        }
      console.log(food)
        if(food.length!==0){
            if(food.size===size){
                console.log("Updating")
                await dispatch({ type: "UPDATE", id: foodItems._id, price: finalPrice, qty: qty })
                return
            }
            else if(food.size!==size){
                await dispatch({
                    type: "ADD",
                    id: foodItems._id,
                    name: foodItems.name,
                    price: finalPrice,
                    qty: qty,
                    size: size,
                    img: props.img
                })
                return
            }
            return
        }
        await dispatch({
            type: "ADD",
            id: foodItems._id,
            name: foodItems.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.img
        })
    }
    

    const finalPrice = qty * parseInt(options[size])

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [size]) // Add size to the dependency array

    return (
        <div>
            <div className="card mt-3 mb-3" style={{ width: "20rem", backgroundColor: "#1b1b1b" }}>
                <img src={foodItems.img} className="card-img-top image" alt="..." />
                <div className="card-body">
                    <h5 className="card-title fs-4" style={{ fontWeight: "bold" }}>{foodItems.name}</h5>
                    <p className="card-text">{description}.</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success' style={{ color: "white" }} onChange={(e) => setQty(parseInt(e.target.value))}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} style={{ color: "white" }} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map(data => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className='d-inline'>${finalPrice}/-</div>
                    </div>
                    <hr />
                    <button className="btn btn-success justify-center ms-2" style={{ fontWeight: "bold" }} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}