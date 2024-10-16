import { createClient } from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app";

import { getBaseUrl } from "./base-url";

export const client = createClient({
  tlsSecurity: process.env.NODE_ENV === "development" ? "insecure" : undefined,
});

export const auth = createAuth(client, {
  baseUrl: getBaseUrl(),
});
