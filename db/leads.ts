import { desc } from "drizzle-orm";
import { getDb } from ".";
import { quoteRequests } from "./schema";

export type QuoteRequest = {
  id: number;
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
  createdAt: Date;
};

export async function createQuoteRequest(input: Omit<QuoteRequest, "id" | "createdAt">) {
  const db = await getDb();
  const [created] = await db
    .insert(quoteRequests)
    .values(input)
    .returning();
  return created;
}

export async function listQuoteRequests(limit = 100): Promise<QuoteRequest[]> {
  const db = await getDb();
  return db
    .select()
    .from(quoteRequests)
    .orderBy(desc(quoteRequests.createdAt))
    .limit(Math.min(500, Math.max(1, limit)));
}
