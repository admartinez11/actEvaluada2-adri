import "./database.js"
import app from "./app.js";

async function main (){
    app.listen(4000)
    console.log("serve on port 400")
}

main();