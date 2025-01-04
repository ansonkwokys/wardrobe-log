import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Wardrobe.css";

export default function Wardrobe() {
    const [wardrobeClothingList, setWardrobeClothingList] = useState([]);
    /*
    useEffect(() => {
        fetch("http://localhost:3000/wardrobe")
            .then((response) => response.json())
            .then((data) => {setWardrobeClothingList(data)})
            .catch((error) => console.error(error));
    }, []);
    */

    return (
        <div className="wardrobe-container">
            <div className="wardrobe-header-container">
                <h1>Wardrobe</h1>
                <button>Add Clothing</button>
            </div>
            <div className="wardrobe-card-container">
                {wardrobeClothingList.map((item) => (
                    <div key={item.clothing_id}>
                        <WardrobeClothingCard
                            description={item.description}
                            status={item.status}
                            imageUrl={item.imageUrl}
                        />
                    </div>
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
