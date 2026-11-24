import { authorizeAdmin } from "@/app/admin-access";
import { listQuoteRequests } from "@/db/leads";

const privateHeaders = { "cache-control": "no-store" };

export async function GET() {
  const auth = await authorizeAdmin();
  if ("error" in auth) {
    return Response.json(
      { error: auth.error },
      { status: auth.status, headers: privateHeaders },
    );
  }

  try {
    return Response.json(
      { leads: await listQuoteRequests() },
      { headers: privateHeaders },
    );
  } catch {
    return Response.json(
      { error: "Offerteaanvragen konden niet worden geladen" },
      { status: 500, headers: privateHeaders },
    );
  }
}
