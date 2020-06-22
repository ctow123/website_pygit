import { makeAPICall } from "../api/api.js";
import {apiprefix} from "../api/apiprefix.js";

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const buff = new Buffer(base64, 'base64');
  const payloadinit = buff.toString('ascii');
  const payload = JSON.parse(payloadinit);
  return payload;
}

/*

*/
export async function createAccount(username, email, password, fromgoogle){
  let res = await makeAPICall(
    "POST",
    `${apiprefix}/apidb/create`,
    {'username':username, 'email': email, 'password':password, 'fromgoogle': ((fromgoogle) ? true : false)}
  );
  let status = res.status
  let body = await res.json();
  if(status !== 200 && status !== 201){
    return {body: body, status: status}
  }
  else{
    return {body: body, status: status}
  }

}

export async function checkAccountCreated(username){
  let res = await makeAPICall(
    "GET",
    `${apiprefix}/apidb/create?username=${username}`
  );
  let status = res.status
  let body = await res.json();
  if(status !== 200 && status !== 201){
    return {body: body, status: status}
  }
  else{
    return {body: body, status: status}
  }
}


export function getQueryStringParams (query) {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce((params, param) => {
                    let [key, value] = param.split('=');
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                    return params;
                }, {}
            )
        : {}
};
// module.exports = {
//     parseJwt: parseJwt(),
//     createAccount: createAccount()
// }
