import { FreshContext } from "$fresh/server.ts";
import { State } from "../shared/interfaces.ts";
import * as session from "../shared/session.ts";

export async function handler(req: Request, ctx: FreshContext<State>) {
  ctx.state.data = "myData";
  ctx.state.flash = session.getFlash(req.headers);
  // console.log(req.method, req.url);

  const resp = await ctx.next();

  session.deleteFlash(resp.headers);
  // resp.headers.set("server", "fresh server");
  return resp;
}
