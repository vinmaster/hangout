import { Handlers, PageProps } from "$fresh/server.ts";
import * as database from "../shared/database.ts";
import * as session from "../shared/session.ts";
import { State, User } from "../shared/interfaces.ts";

export const handler: Handlers<any, State> = {
  async GET(req, ctx) {
    return await ctx.render(ctx.state);
  },
  async POST(req, ctx) {
    try {
      const formData = await req.formData();
      if (!formData.get("username") || !formData.get("password")) {
        throw new Error("Username and password is required");
      }

      const username = formData.get("username")?.toString()!;
      const password = formData.get("password")?.toString()!;

      const user = await database.checkUser(username, password);

      const headers = session.setFlash(
        "success",
        `Welcome back ${user.username}`,
      );
      headers.set("Location", req.url);
      return new Response(null, { status: 303, headers });
    } catch (error) {
      const headers = session.setFlash("error", (error as Error).message);
      headers.set("Location", req.url);

      return new Response(null, { status: 303, headers });
    }
  },
};

export default function RegisterPage(props: PageProps<State>) {
  return (
    <div class="flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md bg-white rounded shadow-md p-8 space-y-4">
        <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

        <form method="POST" class="space-y-4">
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              class="mt-1 w-full"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="mt-1 w-full"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full"
          >
            Login
          </button>
        </form>

        <div class="flex flex-col space-y-4">
          <span class="flex items-center justify-center space-x-2">
            <span class="h-px bg-gray-400 w-14"></span>
            <span class="font-normal text-gray-500">Or</span>
            <span class="h-px bg-gray-400 w-14"></span>
          </span>
          <a href="/register" class="btn bg-fuchsia-600 hover:bg-fuchsia-700">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
