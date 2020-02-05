export async function makeAPICall(method, url, body) {
  const headers = {
    'Content-Type': 'application/json'
  };
  const token = localStorage.token;
  // const token = 'kasdknksnkjankjenlknlnlkwnfwel';
  if (token != null) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  console.log(headers);
  try {
    let req = fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    });
    return req;
  } catch (er) {
    throw er;
  }
}
