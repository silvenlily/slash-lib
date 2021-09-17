// setup
function doSetup() {
  try {
    require("dotenv").config();
  } catch {}

  if (!process.env.DISCORD_TOKEN) {
    throw "Missing required enviorment varable: DISCORD_TOKEN";
  }

  if (!process.env.DEBUG_SERVER) {
    throw "Missing required enviorment varable: DEBUG_SERVER";
  }
}

export default doSetup;
