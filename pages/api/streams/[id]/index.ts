import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      //** include는 포함되는 모든 object를 가져오지만 select는 보여줄 object를 특정해줘야 한다. 즉, 공개되서는 안 될 정보를 가지고 있는경우 select를 사용해야 한다.
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  });
  const isOwner = stream?.userId === user?.id;
  if (stream && !isOwner) {
    //** 위에 select 대신 include를 사용했을 경우에 이와 같은 방식으로  Key와 Url을 감출수 있다. 이 방법을 사용하는 것이 database에 한 번만 접근해도 되기 떄문에 효율적이다.
    stream.cloudflareKey = "xxxx";
    stream.cloudflareUrl = "xxxx";
  }
  res.json({ ok: true, stream });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
