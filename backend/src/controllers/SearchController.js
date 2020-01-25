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

        // console.log(devs);

        return response.json(devs);
    },

    async locationList(request, response) {

        const info = await Dev.find({}, { _id: 0, state: 1 });


        // console.log(info);

        var countsByState = info.reduce((p, c) => {
            var name = c.state;
            if (!p.hasOwnProperty(name)) {
                p[name] = 0;
            }
            p[name]++;
            return p;
        }, {});

        //   console.log(countsByState);

        let arrCount = Object.entries(countsByState);
        arrCount = arrCount.sort(function(a,b){
            retVal=0;
            if(b[1]!=a[1]) retVal=b[1]>a[1]?1:-1;
            else if(a[0]!=b[0]) retVal=a[0]>b[0]?1:-1;
            return retVal
        } );
        
        // console.log(arrCount);

        //   const total = arrCount.map( item =>  item[1]).reduce((a,b) => a + b);
        //   console.log(total);

        const total = arrCount[0][1];

        const stateInfo = arrCount.map(item => (
            {
                info: item[0],
                dev: item[1],
                porCento: ((item[1] * 100) / total) + "%",
            }
        ))

        //   console.log(stateInfo);

        return response.json(stateInfo);
    },

    async techsList(request, response) {

        const info = await Dev.find({}, { _id: 0, techs: 1 });

        // console.log('teste');

        let countsByTechs = info.map( item => item.techs ).flat()
        .reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));;

        //   console.log(countsByTechs);

          let arrCount = Object.entries(countsByTechs);
        arrCount = arrCount.sort(function(a,b){
            retVal=0;
            if(b[1]!=a[1]) retVal=b[1]>a[1]?1:-1;
            else if(a[0]!=b[0]) retVal=a[0]>b[0]?1:-1;
            return retVal
        } );

        // console.log(arrCount);

        const total = arrCount[0][1];

        const stateInfo = arrCount.map(item => (
            {
                info: item[0],
                dev: item[1],
                porCento: ((item[1] * 100) / total) + "%",
            }
        ))

        return response.json(stateInfo);
    },
}