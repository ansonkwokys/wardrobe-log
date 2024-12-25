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
} = require("../controllers/wardrobeController.js");

wardrobeRouter.get("/", getAllWardrobeClothingItems);

wardrobeRouter.get("/new", getNewWardrobeClothingItemForm);

wardrobeRouter.post(
    "/new",
    upload.single("newClothingImage"),
    postNewWardrobeClothingItem
);

//wardrobeRouter.patch("/:id", patchClothingItem);

//wardrobeRouter.delete("/:id", deleteClothingItem);

module.exports = wardrobeRouter;
