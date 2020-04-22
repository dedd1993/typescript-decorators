import * as http from "http";
import express, { Request, Response, Express } from "express";
import bodyParser from "body-parser";

export default class APIServer {
    
    private _app: Express;

    public get app(): Express {
        return this._app;
    }

    private _server: http.Server;

    public get server(): http.Server {
        return this._server;
    }

    constructor() {
        this._app = express();

        // Set port
        this._app.set("port", process.env.PORT || 3000);

        // Add Middleware
        this.configureMiddleware();
    }

    public configureMiddleware() {
        // Setup body parsing - required for POST requests
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));

        // Setup CORS
        this.app.use(function(req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Method", "GET, HEAD, OPTION, MOST, PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Credentials");
            next();
        })
    }

    public start() {
        // Start the server instance
        this._server = this._app.listen(this._app.get("port"), () => {
            console.log("Server is running on port " + this._app.get("port"));
        });
    }

} 