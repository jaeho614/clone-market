import type { NextRequest, NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log(req);
}

//middelware는 페이지 사이를 이동 할 때나 api요청을 할 때 마다 실행된다.
