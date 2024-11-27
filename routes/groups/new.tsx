import { Handlers, PageProps } from "$fresh/server.ts";
import { Group, State } from "../../shared/interfaces.ts";
import * as database from "../../shared/database.ts";
import * as session from "../../shared/session.ts";

type GroupField = keyof Group;

export const handler: Handlers<any, State> = {
  async GET(req, ctx) {
    return await ctx.render(ctx.state);
  },
  async POST(req, ctx) {
    try {
      const formData = await req.formData();
      const fields: GroupField[] = [
        "name",
        "location",
        "description",
        "imageUrl",
      ];
      const group = fields.reduce((g, field) => {
        g[field] = formData.get(field)?.toString();
        return g;
      }, {} as Record<GroupField, any>);

      const newGroup = await database.addGroup(group);
      return new Response(null, {
        status: 303,
        headers: { Location: `/groups/${newGroup.id}` },
      });
    } catch (error) {
      const headers = session.setFlash("error", (error as Error).message);
      headers.set("Location", req.url);

      return new Response(null, { status: 303, headers });
    }
  },
};

export default function GroupFormPage(props: PageProps<State>) {
  return (
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Create a New Group</h1>

      <div class="bg-white shadow-md rounded-lg p-6">
        <form action="#" method="POST" class="space-y-6">
          <div>
            <label for="name" class="block text-gray-700 font-medium">
              Group Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter group name"
              class="w-full"
            />
          </div>

          <div>
            <label for="location" class="block text-gray-700 font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              placeholder="City, State"
              class="w-full"
            />
          </div>

          <div>
            <label for="description" class="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              placeholder="Tell us about your group..."
              class="w-full"
            >
            </textarea>
          </div>

          <div>
            <label for="imageUrl" class="block text-gray-700 font-medium">
              Group Image Url
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              required
              placeholder="https://"
              class="w-full"
            />
          </div>

          {
            /*
          <div>
            <label class="block text-gray-700 font-medium">Privacy</label>
            <div class="mt-2 space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  required
                  class="form-radio text-blue-600"
                />
                <span class="ml-2 text-gray-700">Public</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  required
                  class="form-radio text-blue-600"
                />
                <span class="ml-2 text-gray-700">Private</span>
              </label>
            </div>
          </div>
          */
          }

          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Group
          </button>
        </form>
      </div>
    </main>
  );
}
