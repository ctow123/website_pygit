// this assumes for development you have an nginx server on port 80 set up
// should make variables that connect directly to backend server

// let apiprefix =  `${process.env.PUBLIC_URL}`;
let apiprefix =  `http://localhost:80`;
let wsprefix = "ws://localhost:80";
let prodapiprefix = `http://thenubes.ddns.net${process.env.PUBLIC_URL}`;
let prodwsprefix = 'ws://thenubes.ddns.net';
let notesendpoint = 'http://localhost:8100';
let redirectURL = 'http://localhost:3000'
module.exports = {
    apiprefix: apiprefix,
    wsprefix: wsprefix,
    prodapiprefix: prodapiprefix,
    prodwsprefix: prodwsprefix,
    notesendpoint: notesendpoint,
    redirectURL: redirectURL
}
// export default `http://localhost:8000`
// PROD
// let apiprefix =  `http://thenubes.ddns.net`;
// let wsprefix = "ws://thenubes.ddns.net";
// let prodapiprefix = `http://thenubes.ddns.net${process.env.PUBLIC_URL}`;
// let prodwsprefix = 'ws://thenubes.ddns.net';
// let notesendpoint = 'http://thenubes.ddns.net';
