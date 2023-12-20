const Device = require("../models/device");

const createData = async (req, res) => {
  if (!req.body.title || !req.body.brand || !req.body.price || !req.body.description) {
    res.status(400).send({ message: "Please fill all the input fields" });
    return;
  }
  const { title, brand, price, description } = req.body;
  const user = new Device({
    title, brand, price, description
  });

  await user
    .save()
    .then((data) => {
      res.send({
        message: "Data added successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding data",
      });
    });
};
const getAllData = async (req, res) => {
  try {
    const states = await Device.find();
    res.send({
      Device: states,
      message: "Data Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteData = async (req, res) => {
  try {
    const deletedResource = await Device.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(200).send({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateData = async (req, res) => {
  try {
    const stateId = req.params.id;
    const { title, brand, price, description } = req.body;

    const state = await Device.findById(stateId);
    if (!state) {
      return res.status(404).send({ error: "Data not found" });
    }

    state.title = title;
    state.brand = brand;
    state.price = price;
    state.description = description;

    await state.save();

    res.status(200).send({
      state,
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createData, getAllData, deleteData, updateData };
