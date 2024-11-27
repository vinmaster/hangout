// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_joke from "./routes/api/joke.ts";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $register from "./routes/register.tsx";
import * as $test_form from "./routes/test/form.tsx";
import * as $test_greet_name_ from "./routes/test/greet/[name].tsx";
import * as $test_groups from "./routes/test/groups.ts";
import * as $test_search from "./routes/test/search.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Navbar from "./islands/Navbar.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/joke.ts": $api_joke,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/register.tsx": $register,
    "./routes/test/form.tsx": $test_form,
    "./routes/test/greet/[name].tsx": $test_greet_name_,
    "./routes/test/groups.ts": $test_groups,
    "./routes/test/search.tsx": $test_search,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/Navbar.tsx": $Navbar,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
