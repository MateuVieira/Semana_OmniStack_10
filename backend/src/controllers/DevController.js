const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringasArray = require('../Utils/parseStringasArray');
const { findConnections, sendMessage } = require('../websocket');

// Index, Show, Store, Upadte, Destroy

module.exports = {

    // Index Dev
    async index(request, response) {

        // Find all devs
        const devs = await Dev.find();

        return response.json(devs);
    },

    // Delete Dev
    async destroy(request, response) {

        console.log(request.params);

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

        console.log(request.params);

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

        console.log(request.body);

        // Get info from request
        const { github_username, techs, latitude, longitude } = request.body;

        // Verified if the dev exist, using github_username from body parameters 
        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            // With github_username and github API to take data from dev
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            // Select the info from API response
            const { name = login, avatar_url, bio } = apiResponse.data;

            // Call a function to parse the String techs to Array
            const techsArray = parseStringasArray(techs);

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
                location
            })

            console.log(name, avatar_url, bio, github_username);


            const sendSocketMessageTo = findConnections(
                { latitude, longitude},
                techsArray
            )

            
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    }
};