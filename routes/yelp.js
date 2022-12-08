import { Router } from 'express';
import axios from 'axios';
import url from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const router = Router();
axios.defaults.baseURL = process.env.YELP_ENDPOINT;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.YELP_API_KEY}`;

router.get('/business', (req, res) => {
    const { term, latitude, longitude, price, open_now, open_at, sort_by, limit, offset } = url.parse(req.url, true).query;

    const options = {
        term: term,
        longitude: longitude,
        latitude: latitude,
        sort_by: sort_by ?? 'best_match',
        limit: limit ?? 25
    };

    if (price) options.price = price;
    if (open_now) options.open_now = open_now;
    if (open_at) options.open_at = open_at;
    if (limit) options.limit = limit;
    if (offset) options.offset = offset;

    axios.get('/businesses/search', {
        params: options
    })
        .then((json) => res.send(json.data))
        .catch((err) => console.log(err));
});

export default router;