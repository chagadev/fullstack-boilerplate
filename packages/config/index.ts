export interface Config {
  env: "development" | "production";
}

export const config = {
  env: process.env.NODE_ENV === "production" ? "production" : "development",
};
