const multer = require("multer");

const { Router } = require("express");
const wardrobeRouter = Router();

//multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
    getNewWardrobeClothingItemForm,
    postNewWardrobeClothingItem,
    getAllWardrobeClothingItems,
    patchWardrobeClothingItem,
    deleteWardrobeClothingItem
} = require("../controllers/wardrobeController.js");

wardrobeRouter.get("/", getAllWardrobeClothingItems);

wardrobeRouter.get("/new", getNewWardrobeClothingItemForm);

wardrobeRouter.post(
    "/new",
    upload.single("image"),
    postNewWardrobeClothingItem
);

wardrobeRouter.patch("/:id", patchWardrobeClothingItem);

wardrobeRouter.delete("/:id", deleteWardrobeClothingItem);

module.exports = wardrobeRouter;
