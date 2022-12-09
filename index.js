import express from 'express';
import cors from 'cors';
import routes from './routes/index.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
    return res.send("Nothing to see here...");
});

app.get('/health', (_, res) => {
    return res.send("Healthy!");
});

app.use('/favorites', routes.favorites);
app.use('/yelp', routes.yelp);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});