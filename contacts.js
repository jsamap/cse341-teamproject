const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const result = await mongodb.getDatabase().db("project1").collection("contacts").find()
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(contacts)
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contactId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db("project1").collection("contacts").find({ _id: contactId})
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(contacts[0])
    })
}

const createContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    }
    const response = await mongodb.getDatabase().db("project1").collection("contacts").insertOne(contact)
    if (response.acknowledged)
        res.status(201).json({ id: response.insertedId })
    else
        res.status(500).json(response.error || "Some error ocurred while creating the contact.")
}

const updateContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contactId = new ObjectId(req.params.id)
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    }
    const response = await mongodb.getDatabase().db("project1").collection("contacts").replaceOne({_id: contactId}, contact)
    if (response.modifiedCount > 0)
        res.status(204).send()
    else
        res.status(500).json(response.error || "Some error ocurred while updating the contact.")
}

const deleteContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contactId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db("project1").collection("contacts").deleteOne({ _id: contactId})
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(204).send(); // or res.status(200).json(result);
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
}