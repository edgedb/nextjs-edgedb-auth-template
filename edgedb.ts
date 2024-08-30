import { createClient } from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app";

export const client = createClient();

const baseUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
    ? process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;

export const auth = createAuth(client, {
  baseUrl,
});
