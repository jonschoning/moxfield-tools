import ky from "ky";

export const RATE_LIMIT_INTERVAL = 1000;

let last_request_time: Date | undefined = undefined;

export function getMoxfieldKy(require_access_token = true) {
  const moxfield_access_token = process.env.MOXFIELD_ACCESS_TOKEN;
  if (require_access_token && !moxfield_access_token)
    throw new Error("missing MOXFIELD_ACCESS_TOKEN");
  const api = ky.extend({
    hooks: {
      beforeRequest: [
        async (request) => {
          while (
            last_request_time &&
            new Date().valueOf() <
              last_request_time.valueOf() + RATE_LIMIT_INTERVAL
          ) {
            await new Promise((resolve) =>
              setTimeout(resolve, RATE_LIMIT_INTERVAL + 50)
            );
          }
          if (process.env.MOXFIELD_TOOLS_DEBUG == "1") {
            console.log(`requesting ${request.url}`);
          }
          if (moxfield_access_token)
            request.headers.set(
              "Authorization",
              `Bearer ${moxfield_access_token}`
            );
          last_request_time = new Date();
        },
      ],
      afterResponse: [()=>{
          last_request_time = new Date();
      }],
    },
  });
  return api;
}
