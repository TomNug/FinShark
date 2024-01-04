import React from 'react'
import "./Card.css"; 

type Props = {}

const Card = (props: Props) => {
  return (
    <div className="card">
        <img 
            src="https://media.istockphoto.com/id/475676448/photo/shark-fin-above-ocean-water.jpg?s=612x612&w=0&k=20&c=DsszV0Hi_fTf1zrcI-BW19dv-81lcgXojvQ8R5KWg9U="
            alt="image"
        />

        <div className="details">
            <h2>AAPL</h2>
            <p>£110</p>
        </div>
        <p className="info">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, voluptatum.
        </p>
    </div>
  )
}

export default Card