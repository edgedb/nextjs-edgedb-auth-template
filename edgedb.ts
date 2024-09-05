import { createClient } from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app";

export const client = createClient();

let baseUrl = "http://localhost:3000";

const isVercel = process.env.VERCEL === "1";
if (isVercel) {
  const vercelEnv = process.env.VERCEL_ENV!;
  const vercelPreviewUrl = process.env.VERCEL_BRANCH_URL!;
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL!;

  if (vercelEnv === "preview") {
    baseUrl = `https://${vercelPreviewUrl}`;
  } else if (vercelEnv === "production") {
    baseUrl = `https://${vercelProductionUrl}`;
  }
}

export const auth = createAuth(client, {
  baseUrl,
});
