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
            <OutfitDisplayButtons />
        </div>
    );
}

OutfitDisplayCard.propTypes = {
    date: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export function OutfitDisplayButtons() {
    let newBackClickDifference = 0;
    const [backClickDifference, setBackClickDifference] = useState(
        newBackClickDifference
    );

    function handlePrevClick() {
        newBackClickDifference = backClickDifference + 1;
        setBackClickDifference(newBackClickDifference);
        //console.log("in rendering new: " + newBackClickDifference);
        //console.log("in rendering original: " + backClickDifference);
        //need to do sth else when is told that is the last item
    }

    function handleNextClick() {
        //the button should not appear if the backClickDifference is 0
        newBackClickDifference = backClickDifference - 1;
        setBackClickDifference(newBackClickDifference);
        //console.log("in rendering new: " + newBackClickDifference);
        //console.log("in rendering original: " + backClickDifference);
    }

    //console.log("before if - newbackClickDifference " + newBackClickDifference);
    //console.log("before if - backClickDifference: " + backClickDifference);

    if (backClickDifference === 0) {
        return (
            <div className="outfit-display-button">
                <button onClick={handlePrevClick}>Previous</button>
                {console.log("After rendering: " + backClickDifference)}
            </div>
        );
    }
    return (
        <div className="outfit-display-button">
            <button onClick={handlePrevClick}>Previous</button>
            {console.log("After rendering: " + backClickDifference)}
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
}
