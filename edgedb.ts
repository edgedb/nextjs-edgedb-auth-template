import { createClient } from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app";

export const client = createClient();

function getBaseUrl() {
  const vercel_env = process.env.NEXT_PUBLIC_VERCEL_ENV;
  const vercel_url = process.env.NEXT_PUBLIC_VERCEL_URL;
  const vercel_prod_url = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  const local_url = 'http://localhost:3000';

  if (!vercel_env || vercel_env !== 'production') {
    if (vercel_url) {
      return vercel_url;
    }

    return local_url;

  } else {
    if (vercel_prod_url) {
      return vercel_prod_url;
    }

    if (vercel_url) {
      return vercel_url;
    }

    return local_url;
  }
}

const baseUrl = getBaseUrl();

export const auth = createAuth(client, {
  baseUrl,
});
