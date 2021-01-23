import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateSpeakerInput = Pick<Prisma.SpeakerUpdateArgs, "where" | "data">

export default async function updateSpeaker({ where, data }: UpdateSpeakerInput, ctx: Ctx) {
  ctx.session.authorize()

  const speaker = await db.speaker.update({ where, data })

  return speaker
}
