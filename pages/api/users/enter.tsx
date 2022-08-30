import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    //method 확인
    //req.method는 POST가 아니면 bad request로 응답할것이다.
    res.status(401).end(); //원하는 method가 아닐경우 오류를 보냄
  }
  console.log(req.body.email); //req.body가 req의 인코딩을 기준으로 인코딩된다. 그래서 req.body.email을 하면 undifined가 나오는데 이를 해결하기 위해 프론트엔드에 headers를 설정해줘야 한다.
  res.status(200).end();
}
