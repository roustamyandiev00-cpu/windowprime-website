import { createQuoteRequest } from "@/db/leads";

const MAX_BODY = 8192;

export async function POST(request: Request) {
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    return Response.json({ error: "JSON vereist" }, { status: 415 });
  }

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    const decoder = new TextDecoder();
    let size = 0;
    let raw = "";
    if (reader) {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > MAX_BODY) {
            await reader.cancel();
            return Response.json(
              { error: "Verzoek te groot" },
              { status: 413 },
            );
          }
          raw += decoder.decode(value, { stream: true });
        }
        raw += decoder.decode();
      } finally {
        reader.releaseLock();
      }
    }
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Ongeldig verzoek" }, { status: 400 });
  }

  const { name, email, phone, project, message } = body as Record<
    string,
    unknown
  >;

  // Validate required fields
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 100
  ) {
    return Response.json({ error: "Naam is verplicht" }, { status: 400 });
  }
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    email.length > 254
  ) {
    return Response.json(
      { error: "Geldig e-mailadres is verplicht" },
      { status: 400 },
    );
  }
  if (phone !== undefined && (typeof phone !== "string" || phone.length > 40)) {
    return Response.json(
      { error: "Ongeldig telefoonnummer" },
      { status: 400 },
    );
  }
  if (
    project !== undefined &&
    project !== "" &&
    project !== "renovatie" &&
    project !== "nieuwbouw"
  ) {
    return Response.json({ error: "Ongeldig projecttype" }, { status: 400 });
  }
  if (
    typeof message !== "string" ||
    !message.trim() ||
    message.length > 2000
  ) {
    return Response.json(
      { error: "Projectomschrijving is verplicht (max 2000 tekens)" },
      { status: 400 },
    );
  }

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { error: "Offerteopslag is niet beschikbaar" },
      { status: 503 },
    );
  }

  try {
    await createQuoteRequest({
      name: name.trim(),
      email: email.trim(),
      phone: typeof phone === "string" ? phone.trim() : "",
      project: typeof project === "string" ? project : "",
      message: message.trim(),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "De aanvraag kon niet worden opgeslagen" },
      { status: 503 },
    );
  }
}
