import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// opened connection via mongoose, connection string from atlas and add Db name after .net/
// add then and catch errors.
const m = await mongoose.connect(process.env.DB_URI);
try {
  console.log(
    m.connection.readyState === 1
      ? "MongoDB connected!"
      : "MongoDB failed to connect!"
  );
} catch (err) {
  console.log(err);
}

// when you do ctrl - c it disconnects mongoose connection

const closeConnection = () => {
  console.log("Mongoose disconnecting ...");
  mongoose.disconnect();
};

// creates categories schema and model
const categoriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const CategoryModel = mongoose.model("Category", categoriesSchema);

// creates schema for the entries in database
const entriesSchema = new mongoose.Schema({
  category: { type: mongoose.ObjectId, ref: "Category" }, // links the relationship to category
  content: { type: String, required: true },
});

// creates model for the entries schema
const EntryModel = mongoose.model("Entry", entriesSchema);

export { closeConnection, EntryModel, CategoryModel };
