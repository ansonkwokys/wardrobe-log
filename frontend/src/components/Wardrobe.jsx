//import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./Wardrobe.css";

export default function Wardrobe() {
    const [wardrobeClothingList, setWardrobeClothingList] = useState([]);
    const [isAddNewClothesClicked, setIsAddNewClothesClicked] = useState(0);
    /*
    useEffect(() => {
        fetch("http://localhost:3000/wardrobe")
            .then((response) => response.json())
            .then((data) => {setWardrobeClothingList(data)})
            .catch((error) => console.error(error));
    }, []);
    */

    function clickAddNewClothesDialog(event) {
        event.preventDefault();
        setIsAddNewClothesClicked(1);
    }

    return (
        <div className="flex flex-col h-full w-full">
            <AddNewClothesDialog />
            <div className="flex justify-between items-center p-4 h-10 w-full text-black border-b-1 border-gray-300">
                <div className="wardrobe-title">Wardrobe</div>
                <button
                    className="hover:underline hover:underline-offset-4"
                    onClick={clickAddNewClothesDialog}
                >
                    add new clothes
                </button>
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

    // Add New Clothes Dialog Component
    function AddNewClothesDialog() {
        function addNewClothes(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);

            //const clothesType = event.target.value.type
            //console.log(clothesName)

            setIsAddNewClothesClicked(0);
        }

        function cancelAddNewClothes() {
            setIsAddNewClothesClicked(0);
        }

        if (isAddNewClothesClicked) {
            return (
                <form
                    onSubmit={addNewClothes}
                    className="rounded-2xl border-2 border-gray-300 p-5 bg-white margin w-1/3 absolute flex flex-col z-10 left-[50%] top-[50%] -translate-1/2"
                >
                    <label>Name:</label>
                    <input name="name" />
                    <label>Type:</label>
                    <input name="type" />
                    <div className="flex flex-row justify-around">
                        <button type="submit" onSubmit={addNewClothes}>
                            Add New Clothes!
                        </button>
                        <button type="button" onClick={cancelAddNewClothes}>
                            Cancel
                        </button>
                    </div>
                </form>
            );
        } else {
            return null;
        }
    }
}

function WardrobeClothingCard({ description, status, imageUrl }) {
    function WardrobeClothingCardDescription({ description, status }) {
        const [latestDescription, saveLatestDescription] =
            useState(description);
        const [isInEditMode, setInEditMode] = useState(false);

        function editClothingItem() {
            setInEditMode(true);
            saveLatestDescription(latestDescription);
        }

        function cancelEditClothingItem(e) {
            e.preventDefault();
            setInEditMode(false);
        }

        function submitClothingItemEdit(e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);

            saveLatestDescription(formJson.description);

            //add some fetching logic here

            setInEditMode(false);
        }

        if (isInEditMode) {
            return (
                <form
                    method="post"
                    onSubmit={submitClothingItemEdit}
                    onReset={cancelEditClothingItem}
                    className="w-full; h-[30%] rounded-b-2xl border-b-2 border-l-2 border-r-2 border-gray-200 flex flex-col p-2"
                >
                    <input
                        type="text"
                        name="description"
                        defaultValue={latestDescription}
                        className="grow-[2.5] basis-0 w-full text-center text-[1.1rem] rounded-sm  border-2 border-blue-600"
                    />
                    <div className="grow-[0.5] basis-0 w-full text-center text-xs">
                        {status}
                    </div>
                    <div className="grow-[2] basis-0 w-full flex justify-around align-center text-[0.8rem]">
                        <button
                            type="submit"
                            className="grow-1 basis-0 hover:underline hover:underline-offset-2"
                        >
                            Done
                        </button>
                        <button
                            type="reset"
                            className="grow-1 basis-0 hover:underline hover:underline-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            );
        } else {
            return (
                <div className="w-full; h-[30%] rounded-b-2xl border-b-2 border-l-2 border-r-2 border-gray-200 flex flex-col p-2">
                    <div className="grow-[2.5] basis-0 w-full text-center text-[1.1rem]">
                        {latestDescription}
                    </div>
                    <div className="grow-[0.5] basis-0 w-full text-center text-xs">
                        {status}
                    </div>
                    <div className="grow-[2] basis-0 w-full flex justify-around align-center text-[0.8rem]">
                        <button className="grow-1 basis-0 hover:underline hover:underline-offset-2">
                            Laundry
                        </button>
                        <button
                            className="grow-1 basis-0 hover:underline hover:underline-offset-2"
                            onClick={editClothingItem}
                        >
                            Edit
                        </button>
                        <button className="grow-1 basis-0 hover:underline hover:underline-offset-2">
                            Delete
                        </button>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="flex flex-col rounded-2xl w-48 h-72 hover:shadow-lg">
            <img
                className="w-full h-[70%] border-2 border-gray-200 object-cover rounded-t-2xl"
                src={imageUrl}
                alt="placeholder"
            />
            <WardrobeClothingCardDescription
                description={description}
                status={status}
            />
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
