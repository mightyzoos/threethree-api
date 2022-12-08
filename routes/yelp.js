import { Router } from 'express';
import api from 'api';
import url from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const router = Router();
const sdk = api('@yelp-developers/v1.0');
sdk.server(process.env.YELP_API_URL);
sdk.auth(`Bearer ${process.env.YELP_API_KEY}`);

router.get('/autocomplete', (req, res) => {
    const { text, latitude, longitude } = url.parse(req.url, true).query;

    return sdk.v3_autocomplete({
        text: text,
        latitude: latitude,
        longitude: longitude
    })
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
});

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

    return sdk.v3_business_search(options)
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
});

export default router;