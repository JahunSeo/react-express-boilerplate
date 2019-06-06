const fetchRequest = (url, method, params) => {
  if (params) {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(params)
    });
  } else {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  }
};

export const getVertex = params => {
  return fetchRequest(`/vertices/get/${params.id}`, "GET");
};

export const addVertex = params => {
  return fetchRequest(`/vertices/add`, "POST", params);
};
