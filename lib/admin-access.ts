import type { RuntimeEnvironment } from "./runtime-env";

// The authentication gateway must overwrite both identity and secret headers.
// An email header on its own is never proof of identity.
export async function hasTrustedIdentity(
  requestHeaders: Headers,
  runtime: RuntimeEnvironment,
): Promise<boolean> {
  // Sites dispatch verifies the session and supplies these headers. This mode
  // must only be enabled on Sites, where visitors cannot bypass dispatch.
  if (runtime.AUTH_PROVIDER === "sites") {
    return Boolean(requestHeaders.get("oai-authenticated-user-id")?.trim()
      && requestHeaders.get("oai-authenticated-user-email")?.trim());
  }
  const expected = runtime.AUTH_PROXY_SECRET;
  const supplied = requestHeaders.get("x-windowprime-auth-secret");
  if (!expected || expected.length < 32 || !supplied || supplied.length > 1024) return false;

  const encoder = new TextEncoder();
  const [left, right] = await Promise.all(
    [expected, supplied].map((value) => crypto.subtle.digest("SHA-256", encoder.encode(value))),
  );
  const leftBytes = new Uint8Array(left);
  const rightBytes = new Uint8Array(right);
  let difference = 0;
  for (let index = 0; index < leftBytes.length; index++) difference |= leftBytes[index] ^ rightBytes[index];
  return difference === 0;
}

export function isAllowedAdmin(email: string, runtime: RuntimeEnvironment): boolean {
  const admins = runtime.ADMIN_EMAILS?.split(",").map((value) => value.trim().toLowerCase()).filter(Boolean) ?? [];
  return admins.length > 0 && admins.includes(email.trim().toLowerCase());
}
