import "reflect-metadata";
import {createConnection} from "typeorm";
import UrlShortenerData from "./entity/UrlShortenerData";
import express from "express";
import {nanoid} from 'nanoid';
import {URL} from "url";
import dotenv from 'dotenv'

dotenv.config();

(async () => {
    await createConnection()

    const app = express()
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
      
    app.get("/", (_req, res, next) => {
        res.send("URL SHORTENER API")
        res.header("Access-Control-Allow-Origin", "https://6nmd.us");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type')        
        next();
    });

    app.get("/:id", async (req, res, next) => {
        const slug = await UrlShortenerData.findOne(
            { where:
                { UrlId: req.params.id }
            }
        );
        if (slug){
            res.send(slug.RedirectURL)
         }
        else if(!slug) {
            res.sendStatus(404);
        }
        res.header("Access-Control-Allow-Origin", "https://6nmd.us");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type')        
        next();
    });

    app.post("/register_url", async (req, res, next) => {
        let data = req.body
        let id = nanoid(5)
        try {
            new URL(data.url)
            console.log(data.url)
            await UrlShortenerData.insert({
                UrlId: id,
                RedirectURL: data.url
            })
            res.send(id)
        } catch {
            res.sendStatus(404)
        }
        res.header("Access-Control-Allow-Origin", "https://6nmd.us");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type')        
        next();
    });

    app.listen(4000)
    console.log("Running on Port 4000")
})();