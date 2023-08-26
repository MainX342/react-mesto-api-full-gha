const baseUrl = 'https://mainx.backend.nomoredomainsicu.ru';

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
}

async function request(url, method, body, token = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${url}`, options);

  if (method === 'GET') {
    return getResponseData(response);
  } else {
    return await getResponseData(response);
  }
}

export async function registration(password, email) {
  return request('/signup', 'POST', { password, email });
}

export async function authorization(password, email) {
  return request('/signin', 'POST', { password, email });
}

export async function getUserData(token) {
  return request('/users/me', 'GET', null, token);
}