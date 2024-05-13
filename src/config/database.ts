import { connect } from "mongoose";
import { Service } from "typedi";
//import { EnvironmentVariables } from "./envVariable";

@Service()
export class DatabaseModels {
    constructor() {
         connect(process.env.MONGO_URI || "")
            .then(() => {
                console.log("Mongo DB Connected");
            })
            .catch((err) => {
                console.error("Error connecting to mongo : " + err);
            });

       }
    }
