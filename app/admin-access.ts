import { getChatGPTUser } from "@/app/chatgpt-auth";
import { isAllowedAdmin } from "@/lib/admin-access";
import { readRuntimeEnvironment } from "@/lib/runtime-env";

export async function authorizeAdmin() {
  const user = await getChatGPTUser();
  if (!user) return { error: "Aanmelding vereist", status: 401 } as const;
  if (!isAllowedAdmin(user.email, await readRuntimeEnvironment())) {
    return { error: "Geen beheerrechten", status: 403 } as const;
  }
  return { user } as const;
}
