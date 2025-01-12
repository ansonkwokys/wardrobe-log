import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Outfit.css";

export default function Outfit() {

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
    const [isPrevButtonShown, setIsPrevButtonShown] = useState(true);
    const [isNextButtonShown, setIsNextButtonShown] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    //control the 'previous' button
    useEffect(() => {
        async function fetchData() {
            console.log("check env: " + import.meta.env.BACKEND_URL);
            const response = await fetch(
                `${
                    import.meta.env.BACKEND_URL
                }/outfit?clickCount=${prevNextDiff}`
            );
            if (response.status === 0) {
                //no item in db
                setIsPrevButtonShown(false);
                setImageUrl()
            } else if (response.status === 1) {
                //oldest item in db
                setIsPrevButtonShown(false);
                setImageUrl(response.outfit.imageUrl)
            } else {
                setIsPrevButtonShown(true);
                setImageUrl(response.outfit.imageUrl)
            }
        }

        try {
            fetchData();
        } catch (error) {
            console.error("Error fetching data: ", error);
        }

    }, [prevNextDiff]);

    //control the 'next' button
    function increasePrevNextDiff() {
        let newPrevNextDiff = prevNextDiff + 1;
        setPrevNextDiff(newPrevNextDiff);
    }

    function decreasePrevNextDiff() {
        let newPrevNextDiff = prevNextDiff - 1;
        setPrevNextDiff(newPrevNextDiff);
        if (newPrevNextDiff === 0) {
            setIsNextButtonShown(false);
        }
    }

    return (
        <div className="outfit-display-container">
            <div className="outfit-display-date">May 1, 2023</div>
            <img
                className="outfit-display-image"
                src={imageUrl}
                alt="if you are seeing this, prob no picture"
            />
            <div className="outfit-display-button">
                <PrevButton
                    isPrevButtonShown={isPrevButtonShown}
                    onClick={decreasePrevNextDiff}
                />
                <NextButton
                    isNextButtonShown={isNextButtonShown}
                    onClick={increasePrevNextDiff}
                />
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