import { exportDecks } from "../dist/index.js";

const user_name = process.argv[2];
if (!user_name) {
  throw new Error("user_name is required");
}

exportDecks({
  path: ".store",
  user_name,
  folder: process.argv[3],
  exports: true,
});
