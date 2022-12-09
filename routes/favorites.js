import { Router } from 'express';

const router = Router();

let list = [];
let lastChanged = 0;

router.get('/', (_, res) => {
    try {
        res.send(JSON.stringify(list));
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/lastChanged', (_, res) => {
    try {
        res.send(JSON.stringify({ lastChanged: lastChanged }));
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/reset', (_, res) => {
    try {
        list = [];
        lastChanged = 0;
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/', (req, res) => {
    try {
        list = JSON.parse(JSON.stringify(req.body));
        lastChanged = Date.now();
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
});

export default router;