export function get(url, options) {
  return fetch(url, options)
    .then(response => response.json())
}

export function post(url, options) {
  const postOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const config = {
    ...postOptions,
    ...options,
    ...{body: JSON.stringify(options.body)}
  }

  return fetch(url, config)
    .then(response => response.json());
}