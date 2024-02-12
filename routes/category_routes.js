import { CategoryModel } from "../db.js";
import { Router } from "express";

const router = Router();

// creates route to fetch categories. CREATE FULL CRUD ROUTES
router.get("/", async (req, res) =>
  res.status(201).send(await CategoryModel.find())
);

// get one category
router.get("/:id", async (req, res) => {
  const cat = await CategoryModel.findById(req.params.id);
  if (cat) {
    res.send(cat); // send back a json object
  } else {
    res.status(404).send({ error: "Entry not found" }); // send back a json object
  }
});

// create new category
router.post("/", async (req, res) => {
  try {
    const newCat = await CategoryModel.create(req.body);
    res.status(201).send(newCat); // send back a json object
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// update a category
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedCategory) {
      res.send(updatedCategory);
    } else {
      res.status(404).send({ error: err.message });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(
      req.params.id
    );
    if (deletedCategory) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ error: "Category not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
