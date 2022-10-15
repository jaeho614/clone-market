import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = new PrismaClient(); // {log: ["query"]} 를 ()에 넣어주면 query의 크기를 확인할 수 있다.

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
