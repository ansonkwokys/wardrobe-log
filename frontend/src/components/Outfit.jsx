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
                    add daily
                </a>
            </div>
            <div className="outfit-card-container">
                <OutfitDisplayCard
                    date={outfitDisplay.date}
                    imageUrl={outfitDisplay.imageUrl}
                />
            </div>
        </div>
    );
}

function OutfitDisplayCard({ date, imageUrl }) {
    return (
        <div className="outfit-display-card">
            <div className="outfit-display-date">{date}</div>
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
