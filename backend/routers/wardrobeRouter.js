const multer = require("multer");

const { Router } = require("express");
const wardrobeRouter = Router();

//multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const {getNewClothingItemForm, postNewClothingItem} = require("../controllers/wardrobeController.js")

//wardrobeRouter.get("/", getAllClothingItems)

wardrobeRouter.get("/new", getNewClothingItemForm);

wardrobeRouter.post("/new", upload.single('newClothingImage'), postNewClothingItem);

//wardrobeRouter.patch("/:id", patchClothingItem);

//wardrobeRouter.delete("/:id", deleteClothingItem);

module.exports = wardrobeRouter;
