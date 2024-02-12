import { closeConnection, EntryModel, CategoryModel } from "./db.js";

const categories = [
  {
    name: "Food",
  },
  {
    name: "Gaming",
  },
  {
    name: "Coding",
  },
  {
    name: "Other",
  },
];

await CategoryModel.deleteMany();
console.log("Deleted categories");

const cats = await CategoryModel.insertMany(categories);
console.log("Added categories");

const entries = [
  { category: cats[0], content: "Pizza is yummy!" },
  { category: cats[2], content: "Skyrim is for the Nords" },
  { category: cats[1], content: "Coding is fun!" },
];

// // deletes all entries when seeded
await EntryModel.deleteMany();
console.log("Deleted entries");

await EntryModel.insertMany(entries);
console.log("Added entries");

// disonnects the seed
closeConnection();
