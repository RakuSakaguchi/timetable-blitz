import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetEventInput = Pick<Prisma.FindFirstEventArgs, "where">

export default async function getEvent({ where }: GetEventInput, ctx: Ctx) {
  ctx.session.authorize()

  const event = await db.event.findFirst({ where })

  if (!event) throw new NotFoundError()

  return event
}
