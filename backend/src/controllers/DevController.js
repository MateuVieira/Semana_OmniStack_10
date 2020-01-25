const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringasArray = require('../Utils/parseStringasArray');
const regexState = require('../Utils/regexState');
const { findConnections, sendMessage } = require('../websocket');

// Index, Show, Store, Upadte, Destroy

async function findLocation(latitude, longitude) {
    const YOUR_API_KEY = 'AIzaSyDuD92YTDD4gwxvWCNW65yvl1zwX8g3X5s';
    const apiLocation = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${YOUR_API_KEY}`);

    // console.log(apiLocation.data.results[6].formatted_address);

    const result = apiLocation.data.results[0].address_components;

    // console.log(result);

    let count = 0;
    result.forEach( element => {
        count++;
    });

    // console.log(` Teste result.leght -> ${count}`);

    if (count < 5) {
        return { state: result[2].long_name, country: result[3].long_name };
    } else {
        return { state: result[4].long_name, country: result[5].long_name };
    }
}

module.exports = {



    // Index Dev
    async index(request, response) {

        // Find all devs
        const devs = await Dev.find();

        return response.json(devs);
    },

    // Delete Dev
    async destroy(request, response) {

        // console.log(request.params);

        // Get github username from parameters
        const { github_username } = request.params;

        // Search from github_username in the database
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            return response.status(400).json({ message: "Usuário não encontrado!" });
        }

        // Delete user
        await Dev.findOneAndDelete({ github_username });

        return response.json({ message: "Dev deletado" });
    },

    async update(request, response) {

        // console.log(request.params);

        // Get github username
        const { github_username } = request.params;

        // Search from github_username in the database
        let dev = await Dev.findOne({ github_username });

        // If username do not exists
        if (!dev) {
            return request.status(400).json({ message: "Usuário não encontrado!" });
        }

        // If exists, update it
        // Using the existing data and taking the new info from body parameters 
        // to update the dev data
        const {
            name = dev.name,
            bio = dev.bio,
            longitude = dev.location.coordinates[0],
            latitude = dev.location.coordinates[1],
            avatar_url = dev.avatar_url } = request.body;

        // Check if techs were updated to transform text in Array for each tech
        const techs = request.body.techs ? parseStringasArray(request.body.techs) : dev.techs;



        // Create geolocation for lat & long (based on PointSchema)
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        // Update Dev and return the "updated" Dev
        let updatedDev = await Dev.findOneAndUpdate({ github_username },
            { name, techs, bio, avatar_url, location },
            { new: true }
        );

        return response.json(updatedDev);
    },

    async store(request, response) {

        // console.log(request.body);

        // Get info from request
        const { github_username, techs, latitude, longitude } = request.body;

        // Verified if the dev exist, using github_username from body parameters 
        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            // With github_username and github API to take data from dev
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            // Select the info from API response
            const { name = login, avatar_url, bio } = apiResponse.data;

            // console.log(apiResponse.data);

            // Call a function to parse the String techs to Array
            const techsArray = parseStringasArray(techs);



            const { country, state } = await findLocation(latitude, longitude);

            // Create geolocation for lat & long (based on PointSchema) and mongoDB parameters
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],

            };

            // Create a new Dev from the get data
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
                country,
                state,
            })

            // console.log(dev);


            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )


            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        } else {


            // If exists, update it
            // Using the existing data and taking the new info from body parameters 
            // to update the dev data
            const {
                name = dev.name,
                bio = dev.bio,
                longitude = dev.location.coordinates[0],
                latitude = dev.location.coordinates[1],
                avatar_url = dev.avatar_url } = request.body;

            // Check if techs were updated to transform text in Array for each tech
            const techs = request.body.techs ? parseStringasArray(request.body.techs) : dev.techs;

            const { country, state } = await findLocation(latitude, longitude);

            // Create geolocation for lat & long (based on PointSchema)
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };


            // Update Dev and return the "updated" Dev
            let updatedDev = await Dev.findOneAndUpdate({ github_username },
                { name, techs, bio, avatar_url, location, country, state },
                { new: true }
            );

            // console.log(updatedDev);

            return response.json(updatedDev);
        }

        return response.json(dev);
    }
};