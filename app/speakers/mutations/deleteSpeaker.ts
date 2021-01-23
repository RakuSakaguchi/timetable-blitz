import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteSpeakerInput = Pick<Prisma.SpeakerDeleteArgs, "where">

export default async function deleteSpeaker({ where }: DeleteSpeakerInput, ctx: Ctx) {
  ctx.session.authorize()

  const speaker = await db.speaker.delete({ where })

  return speaker
}
