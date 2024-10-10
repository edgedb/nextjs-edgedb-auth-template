import { createClient } from "edgedb";
import { getBaseUrl } from "./base-url";

const client = createClient();
const baseUrl = getBaseUrl();

const SET_CONFIG = "CONFIGURE CURRENT BRANCH SET";
const INSERT_CONFIG = "CONFIGURE CURRENT BRANCH INSERT";

const UPDATE_AUTH_CONFIG = `
${SET_CONFIG} ext::auth::AuthConfig::allowed_redirect_urls := {
  "${baseUrl}",
};
`;

const SETUP_UI_CONFIG = `
${INSERT_CONFIG} ext::auth::UIConfig {
  redirect_to := "${new URL("auth/builtin/callback", baseUrl)}",
  redirect_to_on_signup := "${new URL("auth/builtin/callback?isSignUp=true", baseUrl)}",
};
`;

async function main() {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === "preview") {
    await client.execute(`
      ${UPDATE_AUTH_CONFIG}
      ${SETUP_UI_CONFIG}
      `);
    console.log(
      "NOTE: Auth config updated. Log into your EdgeDB UI and configure SMTP.",
    );
  }
  console.log("Not a Vercel preview deployment. Skipping auth config update.");
}

await main();
