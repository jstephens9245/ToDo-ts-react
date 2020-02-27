import getDomain from "../../services/getDomain";

// TODO: develop more robust error handling
export const logError = (message: string) => {
  // Output errors to console only if we are in our dev environment
  if (getDomain() === "http://localhost:3000/") {
    // eslint-disable-next-line no-console
    console.error(message);
  }
};
