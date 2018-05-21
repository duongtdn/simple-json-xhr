"use strict"

function postJSON({ endPoint, header, data,  onSuccess, onFailure }) {
  const request = new XMLHttpRequest();
  request.open('POST', endPoint, true);
  request.setRequestHeader('Content-Type', 'application/json');
  if (header) {
    for (let name in header) {
      request.setRequestHeader(name, header[name]);
    }
  }
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      onSuccess({
        status: request.status,
        data: JSON.parse(request.responseText)
      });
    } else {
      onFailure({
        status: request.status,
        err: request.responseText
      });
    }
  }
  request.send(JSON.stringify(data));
}

function getJSON({ endPoint, bearer, query, onSuccess, onFailure }) {
  const url = query? `${endPoint}?${query}` : endPoint;
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.setRequestHeader('Authorization', `Bearer ${bearer}`);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      onSuccess({
        status: request.status,
        data: JSON.parse(request.responseText)
      });
    } else {
      onFailure({
        status: request.status,
        err: request.responseText
      });
    }
  }
  request.send();
}

module.exports = { postJSON, getJSON };