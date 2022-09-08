import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body; //req.body에 token을 담아 보냈다.
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  }); //token을 찾아보고,
  if (!foundToken) return res.status(404).end(); //token이 없으면 404 not found를 return할것이다.
  req.session.user = {
    id: foundToken.userId,
  }; //만약 token이 있다면, 그 token을 보유한 유저의 id를 req.session.user에 넣는다.
  await req.session.save(); //그리고 나서 session을 저장하고,
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  }); // 여기서 찾은 token의 userid와 같은 userid를 가진 token을 전부 삭제한다.
  res.json({ ok: true });
}

export default withApiSession(withHandler("POST", handler));
