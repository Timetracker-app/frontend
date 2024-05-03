import axios from "axios";

const testUrl = "http://localhost:5000";

export const customFetch = axios.create({
  baseURL: testUrl,
});
