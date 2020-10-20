const {getAuth} = require("./getAuth");

async function auth() {
    console.log("Auth ====>", await getAuth())
}
