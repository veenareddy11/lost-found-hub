const express = require("express");

const Item = require("../models/Item");

const upload = require("../middleware/upload");

const router = express.Router();


// Get All Items
router.get("/", async (req, res) => {

  try {

    const items = await Item.find().sort({ createdAt: -1 })
  
.populate("claimedBy", "name");

    res.json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// Create Item
router.post("/create", upload.single("image"), async (req, res) => {

  try {

    const {
  title,
  description,
  category,
  location,
  owner
} = req.body;

    const image = req.file.path;

    const item = await Item.create({
      title,
      description,
      category,
      location,
      image,
      owner: req.body.owner
    });

    res.status(201).json({
      message: "Item posted successfully",
      item
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// Get All Items
router.get("/", async (req, res) => {

  try {

    const items = await Item.find()
.populate("claimedBy", "name");

    res.status(200).json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// Mark Item as Claimed
router.put("/claim/:id", async (req, res) => {

  try {

    const { userId } = req.body;

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    // already claimed
    if (item.status === "Claimed") {

      // same user undoing claim
      if (
        item.claimedBy &&
        item.claimedBy.toString() === userId
      ) {

        item.status = "Unclaimed";
        item.claimedBy = null;
        item.claimedAt = null;

        await item.save();

        return res.json({
          message: "Claim removed",
          item
        });

      }

      return res.status(400).json({
        message: "Already claimed"
      });

    }

    // claim item
    item.status = "Claimed";

    item.claimedBy = userId;

    item.claimedAt = new Date();

    await item.save();

    res.json({
      message: "Item claimed successfully",
      item
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// Get User Items
router.get("/user/:id", async (req, res) => {

  try {

    const items = await Item.find({
      owner: req.params.id
    });

    res.json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// Delete Item
router.delete("/:id", async (req, res) => {

  try {

    await Item.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// Update Item
router.put("/:id", async (req, res) => {

  try {

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedItem);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;