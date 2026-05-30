import dotenv from "dotenv";

import { exportDecks, saveDecks, savePublicDeck } from "./commands"

dotenv.config();

const [, , command, ...args] = process.argv;
const STORE_PATH = process.env.STORE_PATH ?? "";

if (command) {
  switch (command) {
    case "saveDecks":
      await saveDecks({ path: STORE_PATH, folder: args[0], exports: true });
      break;
    case "savePublicDeck": {
      const [publicid] = args;
      if (!publicid) throw new Error("publicid is required");
      await savePublicDeck({ path: STORE_PATH, publicid, exports: true });
      break;
    }
    case "exportDecks": {
      const [user_name, folder] = args;
      if (!user_name) throw new Error("user_name is required");
      await exportDecks({ path: STORE_PATH, user_name, folder, exports: true});
      break;
    }
    default:
      console.error(`Unknown command: ${command}`);
      console.error(
        "Usage: tsx src/main.ts <saveDecks|savePublicDeck|exportDecks> [args...]"
      );
      process.exit(1);
  }
}
