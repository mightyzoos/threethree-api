import { Router } from 'express';
import api from 'api';
import url from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const router = Router();
const sdk = api('@yelp-developers/v1.0#a2embhlb4wb4ot');
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
    const { term, latitude, longitude, price, open_now, open_at, sort_by } = url.parse(req.url, true).query;

    return sdk.v3_business_search({
        term: term,
        longitude: longitude,
        latitude: latitude,
        price: price,
        open_now: open_now,
        open_at: open_at,
        sort_by: sort_by
    })
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
});

export default router;