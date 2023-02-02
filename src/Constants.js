const prod = {
  url: "https://ninjashideoutserver.onrender.com/",
};

const dev = {
  url: "http://localhost:3001/",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
