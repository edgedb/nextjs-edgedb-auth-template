"use server";

import { auth } from "@/edgedb";
import { createHash, randomBytes } from "node:crypto";

const authActions = auth.createServerActions();

export const { signout } = authActions;

/**
 * Get the user's profile information from Google
 */
export async function getUserProfile(providerToken: any) {
    const openIDResponse = await fetch(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    const discoveryDocument = await openIDResponse.json();
    const userInfoResponse = await fetch(discoveryDocument.userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${providerToken}`,
        Accept: "application/json",
      },
    });
    return await userInfoResponse.json();
  }

export async function generatePKCE() {
    const verifier = randomBytes(32).toString("base64url");
 
    const challenge = createHash("sha256")
       .update(verifier)
       .digest("base64url");
 
    return { verifier, challenge };
 };
