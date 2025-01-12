import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Outfit.css";

export default function Outfit() {

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
            <OutfitDisplayCard />
        </div>
    );
}

function OutfitDisplayCard() {
    const [prevNextDiff, setPrevNextDiff] = useState(0);

    function increasePrevNextDiff() {
        let newPrevNextDiff = prevNextDiff + 1;
        setPrevNextDiff(newPrevNextDiff);
    }

    function decreasePrevNextDiff() {
        let newPrevNextDiff = prevNextDiff - 1;
        setPrevNextDiff(newPrevNextDiff);
    }

    return (
        <div className="outfit-display-container">
            <div className="outfit-display-date">May 1, 2023</div>
            <img
                className="outfit-display-image"
                src="https://i8.amplience.net/i/naras/Adele-Vegas-2022-GettyImages-1442693496.jpg"
                alt="outfit"
            />
            <div className="outfit-display-button">
                <PrevButton isPrevButtonShown={true} onClick={decreasePrevNextDiff}/>
                <NextButton isNextButtonShow={true} onClick={increasePrevNextDiff}/>
            </div>
        </div>
    );
}

OutfitDisplayCard.propTypes = {
    date: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

function PrevButton({ isPrevButtonShown, onClick }) {
    if (isPrevButtonShown) {
        return <button onClick={onClick}>Previous</button>;
    }
    return null;
}

PrevButton.propTypes = {
    isPrevButtonShown: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

function NextButton({ isNextButtonShown, onClick }) {
    if (isNextButtonShown) {
        return <button onClick={onClick}>Next</button>;
    }
    return null;
}

NextButton.propTypes = {
    isNextButtonShown: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

/*
export function OutfitDisplayButtons({
    isPrevButtonShown,
    isNextButttonShown,
}) {
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
*/
