import * as express from 'express'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

require('console-stamp')(console, 'yyyy/mm/dd HH:MM:ss');
require('dotenv').config();


const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', true);

app.use((req, res, next) => {
    let ip = req.ip;
    ip = ip.substr(ip.lastIndexOf(':') + 1);
    console.table([{ Timestamp: new Date().toLocaleString(), Method: req.method, Request: req.originalUrl, Client: ip }]);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});


app.listen(process.env.PORT, () => {

})