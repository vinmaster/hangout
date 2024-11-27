import { Handlers, PageProps } from "$fresh/server.ts";
import { Group, State } from "../../shared/interfaces.ts";
import * as database from "../../shared/database.ts";

export const handler: Handlers<any, State> = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const group = await database.getGroupById(id);
    return await ctx.render({ group });
  },
};

export default function GroupViewPage(props: PageProps<{ group: Group }>) {
  return (
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white shadow rounded-lg p-6 mb-8 space-y-4">
        <div class="flex items-center space-x-4">
          <img
            src={props.data.group.imageUrl}
            alt="Group Logo"
            class="w-24 h-24 object-cover"
          />
          <div>
            <h1 class="text-3xl font-bold text-gray-800">
              {props.data.group.name}
            </h1>
            <p class="text-gray-600">
              500 Members | {props.data.group.location}
            </p>
            <p class="text-gray-700 mt-2">
              {props.data.group.description}
            </p>
          </div>
        </div>
        <button class="btn">Join Group</button>
      </div>

      <h2 class="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/300"
            alt="Event Image"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800">Tech Trends 2024</h3>
            <p class="text-gray-600 text-sm">March 15, 2024 | 5:00 PM</p>
            <p class="text-gray-700 mt-2">
              A deep dive into the latest trends in AI, blockchain, and more.
              Don't miss it!
            </p>
            <button class="btn mt-4 w-full">
              RSVP Now
            </button>
          </div>
        </div>
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/300"
            alt="Event Image"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800">Networking Night</h3>
            <p class="text-gray-600 text-sm">April 10, 2024 | 7:00 PM</p>
            <p class="text-gray-700 mt-2">
              Meet fellow tech enthusiasts and expand your professional network.
            </p>
            <button class="btn mt-4 w-full">
              RSVP Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
