import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Outfit.css";

export default function Outfit() {
    const [outfitDisplay, setOutfitDisplay] = useState([]);
    /*
    useEffect(() => {
        fetch("http://localhost:3000/outfit")
            .then((response) => response.json())
            .then((data) => {setOutfitClothingList(data)})
            .catch((error) => console.error(error));
    }, []);
    */

    return (
        <div className="outfit-container">
            <div className="outfit-header-container">
                <div className="outfit-title">Outfit |</div>
                <a className="add-item-title" href="#">
                    add daily outfit
                </a>
            </div>
            <OutfitDisplayCard
                date="May 1, 2023"
                imageUrl="https://i8.amplience.net/i/naras/Adele-Vegas-2022-GettyImages-1442693496.jpg"
            />
        </div>
    );
}

function OutfitDisplayCard({ date, imageUrl }) {
    return (
        <div className="outfit-display-container">
            <div className="outfit-display-date">May 1, 2023</div>
            <img className="outfit-display-image" src={imageUrl} alt="outfit" />
            <div className="outfit-display-button">
                <button>Previous</button>
                <button>Next</button>
            </div>
        </div>
    );
}

OutfitDisplayCard.propTypes = {
    date: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
