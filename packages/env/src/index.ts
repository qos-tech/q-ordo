import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().default(3303),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
  },
  client: {},
  clientPrefix: "NEXT_PUBLIC_",
  shared: {},
  runtimeEnv: {
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  emptyStringAsUndefined: true,
});
