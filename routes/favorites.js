import { Router } from 'express';

const router = Router();

let list = []

router.get('/', (req, res) => {
    try {
        res.send(JSON.stringify(list));
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/', (req, res) => {
    try {
        list = JSON.parse(JSON.stringify(req.body));
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
});

export default router;