export default {
  apiUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://ccl-waivers-test.herokuapp.com',
  signingBaseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cclwaivers.netlify.app/',
};
