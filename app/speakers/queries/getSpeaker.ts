import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetSpeakerInput = Pick<Prisma.FindFirstSpeakerArgs, "where">

export default async function getSpeaker({ where }: GetSpeakerInput, ctx: Ctx) {
  // ctx.session.authorize()

  const speaker = await db.speaker.findFirst({ where })

  if (!speaker) throw new NotFoundError()

  return speaker
}
