exports.getRandomOutfitS3ImageKey = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");
