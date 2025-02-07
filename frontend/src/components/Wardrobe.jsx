//import React from "react";
import { useState } from "react";
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
        <div className="flex flex-col h-full w-full">
            <div className="flex justify-between items-center p-4 h-10 w-full text-black border-b-1 border-gray-300">
                <div className="wardrobe-title">Wardrobe</div>
                <a
                    className="hover:underline hover:underline-offset-4"
                    href="#"
                >
                    add new clothes
                </a>
            </div>
            <div className="flex h-full w-full flex-wrap justify-around items-start p-4 gap-x-10 gap-y-7">
                {wardrobeClothingList.map((item) => (
                    <div key={item.clothing_id}>
                        <WardrobeClothingCard
                            description={item.description}
                            status={item.status}
                            imageUrl={item.imageUrl}
                        />
                    </div>
                ))}
                <WardrobeClothingCard
                    description="Black Cotton T-Shirt"
                    status="Clean"
                    imageUrl="https://ca-times.brightspotcdn.com/dims4/default/56ca74f/2147483647/strip/true/crop/2100x3000+0+0/resize/1200x1714!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fd7%2Fec%2F9c6103094901b6351f07c96550c9%2Fla-ca-adele-one-night-only-196.JPG"
                />

                <WardrobeClothingCard
                    description="Blue Denim Jeans"
                    status="Dirty"
                    imageUrl="/images/jeans.jpg"
                />

                <WardrobeClothingCard
                    description="Blue Denim Jeans"
                    status="Dirty"
                    imageUrl="/images/jeans.jpg"
                />

                <WardrobeClothingCard
                    description="Blue Denim Jeans"
                    status="Dirty"
                    imageUrl="/images/jeans.jpg"
                />

                {/*
 
               

                <WardrobeClothingCard
                    description="White Hoodie"
                    status="Clean"
                    imageUrl="/images/hoodie.jpg"
                />

                <WardrobeClothingCard
                    description="Red Sweater"
                    status="Clean"
                    imageUrl="/images/sweater.jpg"
                />

                <WardrobeClothingCard
                    description="Gray Sweatpants"
                    status="Dirty"
                    imageUrl="/images/sweatpants.jpg"
                />

                */}
            </div>
        </div>
    );
}

function WardrobeClothingCard({ description, status, imageUrl }) {

    function WardrobeClothingCardDescription({description, status}) {
        const [latestDescription, saveLatestDescription] = useState(description);
        const [isInEditMode, setInEditMode] = useState(true);

        function editClothingItem(){
            setInEditMode(true);
            saveLatestDescription(description);
        }

        function cancelEditClothingItem(){
            setInEditMode(false);
        }

        if (isInEditMode){
            return (
            <form action="add action later" className="w-full; h-[30%] rounded-b-2xl border-b-2 border-l-2 border-r-2 border-gray-200 flex flex-col p-2">
                <input type="text" defaultValue={latestDescription} className="grow-[2.5] basis-0 w-full text-center text-[1.1rem] rounded-sm  border-2 border-blue-600"/>
                <div className="grow-[0.5] basis-0 w-full text-center text-xs">{status}</div>
                <div className="grow-[2] basis-0 w-full flex justify-around align-center text-[0.8rem]">
                    <button type="submit" className="grow-1 basis-0 hover:underline hover:underline-offset-2">Done</button>
                    <button className="grow-1 basis-0 hover:underline hover:underline-offset-2" onClick={cancelEditClothingItem}>Cancel</button>
                </div>
            </form>
            )
        }
        else {
            return (
            <div className="w-full; h-[30%] rounded-b-2xl border-b-2 border-l-2 border-r-2 border-gray-200 flex flex-col p-2">
                <div className="grow-[2.5] basis-0 w-full text-center text-[1.1rem]">{description}</div>
                <div className="grow-[0.5] basis-0 w-full text-center text-xs">{status}</div>
                <div className="grow-[2] basis-0 w-full flex justify-around align-center text-[0.8rem]">
                    <button className="grow-1 basis-0 hover:underline hover:underline-offset-2">Laundry</button>
                    <button className="grow-1 basis-0 hover:underline hover:underline-offset-2" onClick={editClothingItem}>Edit</button>
                    <button className="grow-1 basis-0 hover:underline hover:underline-offset-2">Delete</button>
                </div>
            </div>
            )
        }
    }

    
    return (
        <div className="flex flex-col rounded-2xl w-48 h-72 hover:shadow-lg">
            <img
                className="w-full h-[70%] border-2 border-gray-200 object-cover rounded-t-2xl"
                src={imageUrl}
                alt="placeholder"
            />
            <WardrobeClothingCardDescription description={description} status={status}/>
        </div>
    );
}

/*
function WardrobeClothingCardDescription({isInEditMode, description}){
    if (idInEditMode){
        return (
            
        )
    }
    else {
        return (
            <div className="grow-[2.5] basis-0 w-full text-center text-[1.1rem]">{description}</div>
        )
    }
}

WardrobeClothingCardDescription.propTypes ={
    isInEditMode: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
}
*/

WardrobeClothingCard.propTypes = {
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};
