import { NextResponse } from "next/server";
import { generatePKCE } from "@/app/actions";

import { auth } from "@/edgedb";

export async function GET(request: Request) {
  const { verifier, challenge } = await generatePKCE();

  const redirectUrl = new URL(auth.getBuiltinUISignUpUrl());
  redirectUrl.searchParams.set("challenge", challenge);

  const response = NextResponse.json({ }, { status: 301});
  response.cookies.set("edgedb-pkce-verifier", verifier, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict"
  });
  response.headers.set("Location", redirectUrl.toString());

  return response;
}