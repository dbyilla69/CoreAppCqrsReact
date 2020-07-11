import axios from "axios";

axios.defaults.baseURL = `http://localhost:5000/api`;

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url, body) => axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Activities = {
  list: () => requests.get(`/activities`),
  details: (id) => requests.get(`/activities/${id}`),
  create: (activity) => requests.post("/activities", activity),
  update: (activity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id) => requests.del(`/activities/${id}`),
};

export default {
  Activities,
};
