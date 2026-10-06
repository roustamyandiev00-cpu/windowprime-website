export type RuntimeEnvironment = {
  ADMIN_EMAILS?: string;
  OPENAI_API_KEY?: string;
  WHATSAPP_ACCESS_TOKEN?: string;
};

export async function readRuntimeEnvironment(): Promise<RuntimeEnvironment> {
  try {
    const runtime = await import("cloudflare:workers");
    return runtime.env as unknown as RuntimeEnvironment;
  } catch {
    return {};
  }
}

export async function readConnectionStatus() {
  const runtime = await readRuntimeEnvironment();
  return {
    openai: Boolean(runtime.OPENAI_API_KEY),
    whatsapp: Boolean(runtime.WHATSAPP_ACCESS_TOKEN),
  };
}
