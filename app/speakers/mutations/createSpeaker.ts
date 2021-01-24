import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateSpeakerInput = Pick<Prisma.SpeakerCreateArgs, "data">
export default async function createSpeaker({ data }: CreateSpeakerInput, ctx: Ctx) {
  ctx.session.authorize()

  const speaker = await db.speaker.create({ data })

  return speaker
}
