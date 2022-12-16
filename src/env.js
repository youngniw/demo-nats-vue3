let baseURL;
const host = window.location.host;
const protocol = window.location.protocol;

const natsURL = 'ws://localhost:8000';    // nats 서버 연동 url
const natsConnectionAccount = {
  user: 'client',
  password: 'client_'
}

if (process.env.NODE_ENV === 'production') {
  baseURL = '';
} else {
  baseURL = 'http://localhost:8080';
}
export default {
  baseURL,
  host,
  protocol,
  natsURL,
  natsConnectionAccount,
}
