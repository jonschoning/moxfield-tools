import dotenv from "dotenv";
import ky from "ky";

// Load the variables from the .env file into process.env
dotenv.config();

export function getMoxfieldKy(require_access_token = true) {
  const moxfield_access_token = process.env.MOXFIELD_ACCESS_TOKEN;
  if (require_access_token && !moxfield_access_token)
    throw new Error("missing MOXFIELD_ACCESS_TOKEN");
  const api = ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          if (process.env.MOXFIELD_TOOLS_DEBUG == "1") {
            console.log(`requesting ${request.url}`);
          }
          if (moxfield_access_token)
            request.headers.set(
              "Authorization",
              `Bearer ${moxfield_access_token}`
            );
        },
      ],
    },
  });
  return api;
}
