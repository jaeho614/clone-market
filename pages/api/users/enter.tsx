import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email }; //phone가 있다면 phone: +phone를 return 한다. 아니면 eamil을 return 한다. e6 기능으로 객체 안에서 if else와 같은 기능을 사용 할 수 있다.
  const user = await client.user.upsert({
    //upsert는 뭔가 만들 때 사용하지 않고, 생성하거나 수정할 때 사용한다.
    where: {
      //phone 정보를 갖고있는 user를 찾고
      ...payload,
    },
    create: {
      // 만약 찾지 못하면 새 user를 만들 것이다.
      name: "Anonymous",
      ...payload,
    },
    update: {}, //update는 하지 않을것이기 떄문에 그냥 둔다.
  });
  console.log(user);
  /* if (email) {
    user = await client.user.findUnique({
      //findUnique로 user를 찾는다
      where: {
        email,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        //user가 없는 경우 만든다.
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({
      //findUnique로 user를 찾는다
      where: {
        phone: +phone, //+를 붙여주면 숫자로 바뀐다.
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        //user가 없는 경우 만든다.
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
    console.log(user);
  } */
  //Next js에서 api route를 만들 때는 export default해줘야 한다. 그렇지 않으면 누군가 api에 접속했을 때 next js에 의해 호출되지 않는다. HOF 참조
  console.log(req.body); //req.body가 req의 인코딩을 기준으로 인코딩된다. 그래서 req.body.email을 하면 undifined가 나오는데 이를 해결하기 위해 프론트엔드에 headers를 설정해줘야 한다.
  return res.status(200).end();
}

export default withHandler("POST", handler);
//next js 에서 실행 될 function을 맞춤 설정한것.
