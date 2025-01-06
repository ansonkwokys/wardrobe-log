const multer = require("multer");

const { Router } = require("express");
const outfitRouter = Router();

//multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {} = require("../controllers/outfitController.js");

/*
outfitRouter.get("/", getAllOutfitClothingItems);

outfitRouter.get("/new", getNewWardrobeClothingItemForm);
*/
outfitRouter.post(
    "/new",
    upload.single("newOutfitImage"),
    postNewOutfit
);
/*
outfitRouter.patch("/:id", patchWardrobeClothingItem);

outfitRouter.delete("/:id", deleteWardrobeClothingItem);
*/

module.exports = outfitRouter;
