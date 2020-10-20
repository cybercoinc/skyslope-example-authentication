require("dotenv").config();
const crypto = require("crypto");
const moment = require("moment");
const fetch = require("node-fetch");

/****Set user access-Key****/
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const accessKey = process.env.ACCESS_KEY_PROD;
const accessSecret = process.env.ACCESS_SECRET_PROD;

/***************************/
const timestamp = moment().utc().format();
// console.log("TimeStamp:", timestamp);

// console.log("******************");
// console.log("AccessKey: ", accessKey);
// console.log("Access Secret:", accessSecret);
// console.log("******************");

// Generate HMAC
const hmac = crypto
	.createHmac("sha256", accessSecret)
	.update(clientId + ":" + clientSecret + ":" + timestamp)
	.digest("base64");

console.log(hmac);

// authheader using access key and hmac
const authHeader = "ss " + accessKey + ":" + hmac;

console.log(authHeader);

// the auth body requires the clientId and Secret in JSON
const data = JSON.stringify({
	ClientId: clientId,
	ClientSecret: clientSecret,
});

// Method to authenticate with SkySlope directly
const getAuth = async () => {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: authHeader,
			Timestamp: timestamp,
		},
		body: data,
    };

    let response = null;

    try {
			response = await fetch(process.env.URL, options);
			console.log(response.status);
            console.log(response.statusText);
			console.log(response);
		} catch(error) {
        console.log(error);
    }

    try {
            const jsonResponse = await response.json();
            return jsonResponse;
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
	getAuth,
};
