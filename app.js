import express from "express";
import categoryRoutes from "./routes/category_routes.js";
import entryRoutes from "./routes/entry_routes.js";
import cors from "cors";

const app = express();

// allows access to certain origins
app.use(cors());

// connect entry router

// use lets us use the middlewear makes sure items come through as JSON
app.use(express.json());

// creating a route in express. HTTP METHODS ARE USED AFTER DOT
app.get("/", (req, res) => res.send({ info: "Journal API" })); // sends response as JSON

// TODO: Move /categories to routes folder and modularize - DONE
// TODO: Complete Categories CRUD -
// TODO: ADVANCED: Modify "GET /categories/:id" to embed an array of all entries in that category

app.use("/categories", categoryRoutes);

app.use("/entries", entryRoutes);

export default app;
