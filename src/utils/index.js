import axios from "axios";

const testUrl = "http://localhost:5000";

export const customFetch = axios.create({
  baseURL: testUrl,
});

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return formattedDate;
};
