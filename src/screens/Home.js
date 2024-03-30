import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Card from '../components/Card/Card'

export default function () {
  const [search, setSearch] = useState("")
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("https://mernback-c7hd.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    response = await response.json()
    setFoodItem(response[0])
    setFoodCat(response[1])
    //console.log(response[0], response[1])
  }
  useEffect(() => {
    loadData()
  }, [])

  const onSearch = (event) => {
    { setSearch(event.target.value) }
  }

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={onSearch} />
                {/*<button className="btn btn-outline-success bg-success text-white" type="submit">Search</button>*/}
              </div>
            </div>
            <div className="carousel-item active">
              <img src=" https://img.freepik.com/free-photo/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai_188544-13382.jpg?w=1060&t=st=1711212326~exp=1711212926~hmac=7e4a464e1cc07fe1dd7fb406aa14409989bcafc7dfa803c0f0dcc43b6f930835" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src=" https://img.freepik.com/premium-photo/table-full-food-including-rice-curry-plate-food_900958-7307.jpg?size=626&ext=jpg&ga=GA1.1.1159154395.1698661005&semt=sph" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src=" https://img.freepik.com/free-photo/flame-grilled-meat-cooking-flames-generative-ai_188544-12355.jpg?w=1060&t=st=1711212273~exp=1711212873~hmac=0c473b4e61c92e0409bf0fdf72b20b9c7f41c0c7d9d8836920ab25aef40a7c16" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat.length !== 0 ? foodCat.map(data => {
            return (
              <div className='row mt-3'>
                <div key={data._id} className='fs-3 mb-3'>{data.CategoryName}</div>
                <hr></hr>
                {foodItem.length !== 0 ? foodItem.filter(item => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filteredItems => {
                    return (
                      <div key={filteredItems.id} className='col-12 col-md-6 col-lg-4'>
                        <Card foodItems={filteredItems} options={filteredItems.options[0]} 
                          description={filteredItems.description} />
                      </div>
                    )
                  }) : <div>No such data found</div>}
              </div>
            )
          }) : ""
        }

      </div>
      <div><Footer /></div>
    </div>
  )
}
