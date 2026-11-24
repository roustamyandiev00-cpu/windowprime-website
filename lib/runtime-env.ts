export type RuntimeEnvironment = {
  ADMIN_EMAILS?: string;
  AUTH_PROXY_SECRET?: string;
  AUTH_PROVIDER?: string;
  OPENAI_API_KEY?: string;
  WHATSAPP_ACCESS_TOKEN?: string;
};

export async function readRuntimeEnvironment(): Promise<RuntimeEnvironment> {
  return {
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    AUTH_PROVIDER: process.env.AUTH_PROVIDER,
    AUTH_PROXY_SECRET: process.env.AUTH_PROXY_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
  };
}

export async function readConnectionStatus() {
  const runtime = await readRuntimeEnvironment();
  return {
    openai: Boolean(runtime.OPENAI_API_KEY),
    whatsapp: Boolean(runtime.WHATSAPP_ACCESS_TOKEN),
  };
}
