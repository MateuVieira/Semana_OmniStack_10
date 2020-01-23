const Dev = require('../models/Dev');
const parseStringasArray = require('../Utils/parseStringasArray');

module.exports = {

    async index(request, response) {

        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringasArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            }
        })

        console.log(devs);

        return response.json(devs);
    },

    async locationList(request, response) {

        // Find all devs
        const  info  = await Dev.find({ }, { _id: 0,  state: 1 });

        console.log(info);

        return response.json(info);
    },
}