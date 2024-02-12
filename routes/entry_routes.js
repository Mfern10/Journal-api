import { Router } from "express";
import { EntryModel } from "../db.js";

const router = Router();

// creats a route to fetch  all entries
router.get("/", async (req, res) =>
  res.status(200).send(await EntryModel.find().populate("category"))
);

// Get one entry
router.get("/:id", async (req, res) => {
  const entry = await EntryModel.findById(req.params.id).populate("category");
  if (entry) {
    res.send(entry); // send back a json object
  } else {
    res.status(404).send({ error: "Entry not found" }); // send back a json object
  }
});

// create post for entries route
router.post("/", async (req, res) => {
  try {
    const insertedEntry = await (await EntryModel.create(req.body)).populate(
      "category"
    );
    // Respond with a 201 and the created entry
    res.status(201).send(insertedEntry);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedEntry) {
      res.send(updatedEntry);
    } else {
      res.status(404).send({ error: err.message });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEntry = await EntryModel.findByIdAndDelete(req.params.id);
    if (deletedEntry) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
