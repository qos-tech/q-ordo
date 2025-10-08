import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    CORS_ORIGIN: z.string().default("http://localhost:3000"),
    SERVER_PORT: z.coerce.number().default(3303),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().default("http://localhost:3303"),
  },
  clientPrefix: "NEXT_PUBLIC_",
  shared: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
});
