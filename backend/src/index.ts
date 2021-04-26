import "reflect-metadata";
import { createConnection } from "typeorm";
import UrlShortenerData from "./entity/UrlShortenerData";
import express from "express";
import rateLimit from "express-rate-limit";
import { nanoid } from 'nanoid';

(async () => {
    await createConnection();

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 

    app.use(function(_req, res, next) {
         res.setHeader('Content-Type', 'text/plain');
         res.header("Access-Control-Allow-Origin", "*");
         res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type')        
         next();
    });

    const limiter = rateLimit({
        windowMs: 30 * 1000, // 30 Reqs per 30 second Second
        max: 30 
    });

    app.use(limiter);
      
    app.get("/", (_req, res) => {
        return res.send("6nmd.us URL SHORTENER API")
    });

    app.get("/:slug", async (req, res) => {
        const slug = await UrlShortenerData.findOne(
            { where:
                { urlID: req.params.slug }
            }
        );
        if (slug){
            return res.send(slug.redirectURL)
        }
        else if(!slug) {
	        return res.status(404).send("Url Not Found");
        }
        return true;
    });

    app.post("/url-create", async (req, res) => {
        let body = req.body
        let id = nanoid(5)
        try {
            let urlRegex = /^(?:http(s)?:\/\/|(s)?ftp?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
            const urlValidator = body.url.match(urlRegex)
            if (urlValidator == null){
                throw new Error("Invalid URL")
            }
        } catch {
            return res.status(400).send("Invalid URL")
        }
        try {
            await UrlShortenerData.insert({
                urlID: id,
                redirectURL: body.url
            })
            return res.send(id)
        } catch {
           return res.status(500).send("Internal Server Error") 
        }
    });

    app.listen(process.env.PORT || 4000)
    console.log(`Running on Port ${process.env.PORT as string}`)
})();
