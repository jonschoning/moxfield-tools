import got from "got";

export const RATE_LIMIT_INTERVAL = 1000;

let last_request_time: Date | undefined = undefined;

export function getMoxfieldGot(require_access_token = true) {
  const moxfield_access_token = process.env.MOXFIELD_ACCESS_TOKEN;
  if (require_access_token && !moxfield_access_token)
    throw new Error("missing MOXFIELD_ACCESS_TOKEN");
  const api = got.extend({
    http2: true,
    hooks: {
      beforeRequest: [
        async (options) => {
          while (
            last_request_time &&
            new Date().valueOf() <
              last_request_time.valueOf() + RATE_LIMIT_INTERVAL
          ) {
            await new Promise((resolve) =>
              setTimeout(resolve, RATE_LIMIT_INTERVAL + 50)
            );
          }
          if (process.env.MOXFIELD_TOOLS_DEBUG === "1" && options.url) {
            console.log(`requesting ${options.url.toString()}`);
          }
          options.headers["user-agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36";
          if (moxfield_access_token)
            options.headers["authorization"] = `Bearer ${moxfield_access_token}`;
          last_request_time = new Date();
        },
      ],
      afterResponse: [
        (response) => {
          last_request_time = new Date();
          return response;
        },
      ],
    },
  });
  return api;
}