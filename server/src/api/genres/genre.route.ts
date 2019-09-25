import {Router} from 'express';
import objectIdValidator from '../../middleware/objectId.validator';
import trimmer from '../../middleware/whiteSpaceTrimmer';
import photo from '../photos/photo.route';
import Controller from './genre.controller';
// import rateLimit from 'express-rate-limit';
// import RateLimiter from '../../middleware/rateLimiter';

const genre: Router = Router();
const controller = new Controller();
// const limit = 15 * 60 * 1000; // 15 minutes
// const max = 900; // 1 req per s
// const rateLimiter = new RateLimiter(limit, max);

// const apiLimiter15_900 = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 900, // 1req per s
//     message: 'Too many accounts created from this IP, please try again after 15 min'
// });

// Retrieve all Genres
genre.get('/', controller.findAll);
genre.get('/admin', controller.findAll);

// Retrieve a Specific Genre
genre.get('/:id', objectIdValidator, controller.findOne);
genre.get('/admin/:id', objectIdValidator, controller.findOne);

// Retrieve a Specific Photo By Genre
genre.get('/:id/photos', objectIdValidator, controller.findPhotosByGenre);
genre.get('/admin/:id/photos', objectIdValidator, controller.findPhotosByGenre);

/* ADMIN ONLY */
// Create a Genre
genre.post('/admin/', trimmer, controller.create);

// Update a Genre with Id
genre.put('/admin/:id', objectIdValidator, trimmer, controller.update);

// Delete a Genre with Id
genre.delete('/admin/:id', objectIdValidator, controller.remove);

export default genre;
