/// <reference lib="deno.unstable" />

import { encodeHex } from "$std/encoding/hex.ts";
import { Group, User } from "./interfaces.ts";

export const kv = await Deno.openKv();

export async function getUsers(): Promise<User[]> {
  const result = kv.list<User>({ prefix: ["users"] });
  const users: User[] = [];

  for await (const item of result) {
    const user = item.value;
    users.push(user);
  }

  return users;
}

export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  const key = ["users", username];
  const result = await kv.get<User>(key);

  if (!result.value) return null;

  const user = result.value;
  user.versionstamp = result.versionstamp;

  return user;
}

export async function checkUser(username: string, password: string) {
  const user = await getUserByUsername(username);

  if (!user) throw new Error("User not found");

  const hash = await hashString(password);

  if (hash !== user.password) throw new Error("Wrong password");

  return user;
}

export async function addUser(user: User) {
  // if (!user.id) user.id = crypto.randomUUID();

  const userTaken = await getUserByUsername(user.username);
  if (userTaken) throw new Error(`Username taken: ${user.username}`);

  user.password = await hashString(user.password);
  const key = ["users", user.username];
  await kv.set(key, user);

  return user;
}

export async function deleteUser(id: string) {
  const key = ["users", id];
  await kv.delete(key);
}

async function hashString(str: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str),
  );
  return encodeHex(hashBuffer);
}

export async function getGroups(): Promise<Group[]> {
  const result = kv.list<Group>({ prefix: ["groups"] });
  const groups: Group[] = [];

  for await (const item of result) {
    const group = item.value;
    groups.push(group);
  }

  return groups;
}

export async function getGroupById(id: string): Promise<Group | null> {
  const key = ["groups", id];
  const result = await kv.get<Group>(key);

  if (!result.value) return null;

  return result.value;
}

export async function addGroup(group: Group) {
  if (!group.id) group.id = crypto.randomUUID();

  const groupTaken = await getGroupById(group.id);
  if (groupTaken) throw new Error(`Group taken`);

  const key = ["groups", group.id];
  await kv.set(key, group);

  return group;
}
