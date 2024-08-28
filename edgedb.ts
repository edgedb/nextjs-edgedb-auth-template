import { createClient } from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app";

export const client = createClient();

export const auth = createAuth(client, {
  baseUrl: "http://localhost:3000",
});
