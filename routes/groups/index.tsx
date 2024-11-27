import { Handlers, PageProps } from "$fresh/server.ts";
import { Group, State } from "../../shared/interfaces.ts";
import * as database from "../../shared/database.ts";

const example: Group[] = [
  {
    name: "Tech Enthusiasts",
    membersCount: 500,
    location: "San Francisco, CA",
    description:
      "Join us to discuss the latest trends in tech and network with like-minded individuals!",
    imageUrl: "https://via.placeholder.com/300",
    createdAt: 0,
    updatedAt: 0,
  },
  {
    name: "Hiking Lovers",
    membersCount: 300,
    location: "Denver, CO",
    description:
      "Love hiking? Explore beautiful trails and make friends along the way!",
    imageUrl: "https://via.placeholder.com/300",
    createdAt: 0,
    updatedAt: 0,
  },
];

export const handler: Handlers<any, State> = {
  async GET(req, ctx) {
    let groups = await database.getGroups();
    // if (groups.length === 0) groups = example;
    return await ctx.render({ groups });
  },
};

export default function GroupsPage(props: PageProps<{ groups: Group[] }>) {
  return (
    <main class="container mx-auto px-4 py-8">
      <div class="flex justify-between mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Explore Groups</h1>
        <a href="/groups/new" class="btn">Create Group</a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {props.data.groups.map((group) => (
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={group.imageUrl}
              alt="Group Image"
              class="w-full h-40 object-cover"
            />
            <div class="p-4">
              <h2 class="text-xl font-bold text-gray-800">{group.name}</h2>
              <p class="text-gray-600 text-sm">
                {group.membersCount} members | {group.location}
              </p>
              <p class="text-gray-700 mt-2">
                {group.description}
              </p>
              <a href={`/groups/${group.id}`} class="mt-4 w-full">
                View Group
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
