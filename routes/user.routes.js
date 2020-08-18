// jshint esversion:6 
// ================================ creating application routes ===================================//
module.exports = app => {
    const user = require(`../controllers/user.controllers`);

// create routes
    app.route(`/authenticateUser`)
        .post(bus.createBus);

    app.route(`/buses`)
        .get(bus.getAllBus); 

    app.route(`/createPassengerReview`)
        .post(bus.createPassengerReview);

//  delete routes
    app.route(`/deleteBusById/:busId`)
        .post(bus.deleteBusById);

// get routes
    app.route(`/getAllBus`)
        .get(bus.getAllBus);

    app.route(`/getBusById/:busId`)
        .post(bus.getBusById);

    app.route(`/getBusMetaData`)
        .get(bus.getBusMetaData); 
        
    // app.route(`/getBusAndDriverInfo`)
    //     .get(bus.getBusAndDriverInfo);

    app.route(`/searchBuses`)
        .get(bus.searchBuses);

    // app.route(`/getBusByName`)
    //     .get(bus.getBusBy)
        
// update routes
    app.route(`/updateBusInfo`)
        .post(bus.uploadBusInfo);
};