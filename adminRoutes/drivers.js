/*
const express = require('express');
const router = express.Router();

let drivers = [{ id: 1, name: 'Driver 1'}];
 
//all drivers 
router.get("/", (req, res) => {
    console.log("drivers list");
    res.send(drivers);
    console.log("Drivers: ", drivers);
});

//create driver
router.post("/", (req, res) => {
    const { name } = req.body;
        if ( !name ) {
            return res.status(400).send({message: "name is required"});
        }
    const newDriver = {
        id: drivers.length + 1, name
    };
    drivers.push(newDriver);
    console.log("New driver created", newDriver);
    res.status(201).send(newDriver);
});

//Get driver by id
router.get("/:id", (req, res) => {
    console.log("choosing driver by id");

    const driverId = parseInt(req.params.id);

    const driver = drivers.find(c => c.id === driverId);

        if (!driver) {
            return res.status(404).send('The driver was not dound');

        } else {
            const {id, ...driverWithoutId } = driver;
            console.log("The driver with id:", driverId, "is:", driverWithoutId);
            res.status(200).send(driverWithoutId);
        }
});

//Update driver by id
router.put("/:id", (req, res) => {
    console.log("Update driver by id");

    const driver = drivers.find(c => c.id === parseInt(req.params.id));
    if (!driver) return res.status(404).send('Driver not found.');

    driver.name = req.body.name;
    res.status(200).send(driver);
});



module.exports = router;
*/