import { Handlers } from "$fresh/server.ts";
// import { button } from "../../components/Button.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    console.log("---", email);

    // Add email to list.

    // Redirect user to thank you page.
    // const headers = new Headers();
    // headers.set("location", req.url);
    return new Response(null, {
      status: 303, // See Other
      headers: { Location: req.url },
    });
  },
};

export default function Subscribe() {
  return (
    <>
      <form method="post">
        <input type="text" name="email" value="" />
        <button type="submit">Subscribe</button>
      </form>
    </>
  );
}
