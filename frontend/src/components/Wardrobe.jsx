import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Wardrobe.css";

export default function Wardrobe() {
    const [wardrobeClothingList, setWardrobeClothingList] = useState([]);

    
    useEffect(() => {
        fetch("http://localhost:3000/wardrobe")
            .then((response) => response.json())
            .then((data) => setWardrobeClothingList(data))
            .catch((error) => console.error(error));
    }, []);
    
    

    return (
        <div className="wardrobe-container">
            <div className="wardrobe-header-container">
                <h1>Wardrobe</h1>
                <button>Add Clothing</button>
            </div>
            <div className="wardrobe-card-container">
                <WardrobeClothingCard
                    description="Levi's Jeans"
                    status="wardrobe"
                    imageUrl="https://lsco.scene7.com/is/image/lsco/005010193-back-pdp-ld?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1840"
                />
                <WardrobeClothingCard
                    description="Chanel Long Sleeve T-shirt"
                    status="laundry basket"
                    imageUrl="https://upload.wikimedia.org/wikipedia/commons/5/52/Adele_for_Vogue_in_2021.png"
                />
                {wardrobeClothingList.map((item) => (
                    <WardrobeClothingCard
                        key={item.id}
                        description={item.description}
                        status={item.status}
                        imageUrl={item.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}

function WardrobeClothingCard({ description, status, imageUrl }) {
    return (
        <div className="wardrobe-card">
            <img className="card-image" src={imageUrl} alt="placeholder" />
            <div className="card-text-container">
                <div className="card-description">{description}</div>
                <div className="card-status">in {status}</div>
                <div className="card-button-container">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
}

WardrobeClothingCard.propTypes = {
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};
