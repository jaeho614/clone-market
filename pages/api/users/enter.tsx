import mail from "@sendgrid/mail";
import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

mail.setApiKey(process.env.SENDGRID_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null; //phone가 있다면 phone: +phone를 return 한다. 아니면 eamil을 return 한다. e6 기능으로 객체 안에서 if else와 같은 기능을 사용 할 수 있다.
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + ""; // 뒤에 "" 를 더해주면 숫자가 문자열로 바뀐다.
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID, // id 설정
      to: process.env.MY_PHONE!, //누구에게 보낼지, 뒤에 !는 타입스크립트에 MY_PHONE이라는 변수가 확실히 존재한다는 것을 알리는 것.
      body: `Your login token is ${payload}`,
    });
    console.log(message);
  } else if (email) {
    const email = await mail.send({
      from: "jaeho614a@gmail.com",
      to: "milkyway614@naver.com",
      subject: "Your Carrot Market Verification Email",
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(email);
  }
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
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
//next js 에서 실행 될 function을 맞춤 설정한것.
