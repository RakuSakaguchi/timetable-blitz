import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateSpeakerInput = Pick<Prisma.SpeakerCreateArgs, "data">
export default async function createSpeaker({ data }: CreateSpeakerInput, ctx: Ctx) {
  ctx.session.authorize()

  const speaker = await db.speaker.create({ data })

  return speaker
}

db.event
  .create({
    data: {
      name: "props.name",
      start: "array[0].start",
      end: "array[0].end",
      place: "props.place",
      userId: 1,
      speakers: {
        create: [
          {
            name: "Prisma Day 2020",
            sub: "",
            bio: "",
            social: "",
            order: 0,
            start: "",
            end: "",
            body: "",
            img: "",
            userId: 1,
          },
          {
            name: "Prisma Day 2020",
            sub: "",
            bio: "",
            social: "",
            order: 0,
            start: "",
            end: "",
            body: "",
            img: "",
            userId: 1,
          },
        ],
      },
    },
  })
  .then(console.log)
