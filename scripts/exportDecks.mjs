import { exportDecks } from "../dist/index.js";

const STORE_PATH = process.env.STORE_PATH;

const user_name = process.argv[2];
if (!user_name) {
  throw new Error("user_name is required");
}

try {
  await exportDecks({
    path: STORE_PATH,
    user_name,
    folder: process.argv[3],
    exports: true,
  });
} catch (e) {
  console.error(e);
  process.exitCode = 1;
}
