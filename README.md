# Web Server / Application utilising NodeJS
## Dependencies
* NodeJS
* NodeJS Modules
    * Express
    * Nodemon
    * EJS
    * Requests
* MongoDB
* Debian Based Server for this example: Ubuntu server 20.04.3 LTS Pi Edition (Note: This is only required if you intend to run this on a server)

## Installing Dependencies
Navigate to the repository and go into the src folder in terminal and run the following:
`npm install`

## Version Advice
If wanting to utilise this repository I suggest cloning off the master branch as this is the most stable version of the Application. Dev could contain potential bugs leading to errors.

---

## Running the Server Locally
Navigate to the repository and go into the src folder in terminal and run the following:
`npm run dev`
You will then be able to reach the website by hitting localhost:8000 on your Browser

## Installing the server
Navigate into the config folder and find the Linux/setup folder. Once here run the following command `chmod +x setup.sh`. You can then run the following command `sudo setup.sh`. The server should now be running on your server and should be able to be hit by going to the machines IP in your browser. To access the site remotely port 80 should be Port Forwarded on your router and your machine should be set to a static IP.

---

Author: Harry Vince
