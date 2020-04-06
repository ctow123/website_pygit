// this assumes for development you have an nginx server on port 80 set up
// should make variables that connect directly to backend server

// let apiprefix =  `${process.env.PUBLIC_URL}`;
let apiprefix =  `http://localhost:80`;
let wsprefix = "ws://localhost:80";
let prodapiprefix = `http://thenubes.ddns.net${process.env.PUBLIC_URL}`;
let prodwsprefix = 'ws://thenubes.ddns.net';
module.exports = {
    apiprefix: apiprefix,
    wsprefix: wsprefix,
    prodapiprefix: prodapiprefix,
    prodwsprefix: prodwsprefix
}
// export default `http://localhost:8000`
