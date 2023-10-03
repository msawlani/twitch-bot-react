const prod = {
  url: "http://localhost:3001",
};

const dev = {
  url: "http://localhost:3001",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
