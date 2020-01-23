const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Métodos HTPP: GET, POST, PUT, DELETE

// Tipos de parâmetros: 

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Indentifica um recurso na alteração ou remoção)
// Body: request.body (Dados para a alterção ou criação de um registro)

// Dev

// Route to list all developers from the database
routes.get('/devs', DevController.index);

// Route to add a new dev to the database
routes.post('/devs', DevController.store);

// Route to update the info of a dev
routes.put('/devs/:github_username', DevController.update);

// Route to delete a dev from the database
routes.delete('/devs/:github_username', DevController.destroy);

// Search

// Route to list all developers within 10 km and by technical knowledge
routes.get('/search', SearchController.index);

routes.get('/search-location-list', SearchController.locationList);

module.exports = routes;