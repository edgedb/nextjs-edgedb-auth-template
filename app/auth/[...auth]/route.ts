import { redirect } from "next/navigation";
import { auth } from "@/edgedb";
import e from "@/dbschema/edgeql-js";
import { getUserProfile } from "@/app/actions";

const EDGEDB_AUTH_BASE_URL = process.env.EDGEDB_AUTH_BASE_URL;

export const { GET, POST } = auth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, tokenData, isSignUp }, req) {
    if (error) {
      console.error("Authentication failed: ", error);
      redirect("/error?error=auth-failed");
    }

    if (!tokenData) {
      console.error("Email verification required.");
      redirect("/error?error=email-verification-required");
    }

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      const searchParamsError = url.searchParams.get("error");
      console.error("Code not found: ", searchParamsError, error);
      redirect("/error?error=code-not-found");
    }

    const verifierCookie = req.cookies.get("edgedb-pkce-verifier");
    if (!verifierCookie) {
      console.error("Could not find 'verifier' in the cookie store. Is this the same user agent/browser that started the authorization flow?");
      redirect("/error?error=verifier-not-found");
    }

    const codeExchangeUrl = new URL("token", EDGEDB_AUTH_BASE_URL);
    codeExchangeUrl.searchParams.set("code", code);
    codeExchangeUrl.searchParams.set("verifier", verifierCookie.value);

    const codeExchangeResponse = await fetch(codeExchangeUrl.href, {
      method: "GET",
    });

    if (codeExchangeResponse.status !== 200) {
      console.error("Code exchange failed: ", codeExchangeResponse.status, codeExchangeResponse.statusText);
      redirect("/error?error=code-exchange-failed");
    }

    const { auth_token, provider_token } = await codeExchangeResponse.json();

    const profile = await getUserProfile(provider_token);

    if (isSignUp) {
      const client = auth.getSession().client;

      const emailData = await client.querySingle<{ email: string }>(`
        SELECT ext::auth::EmailFactor {
          email
        } FILTER .identity = (global ext::auth::ClientTokenIdentity)
      `);

      await client.query(`
        INSERT User {
          name := '',
          email := '${emailData?.email || profile?.email}',
          userRole := 'user',
          identity := (global ext::auth::ClientTokenIdentity)
        } UNLESS CONFLICT
      `);
    }
    redirect("/");
  },
  onSignout() {
    redirect("/");
  },
});
