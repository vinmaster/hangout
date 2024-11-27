import { type PageProps } from "$fresh/server.ts";
import Navbar from "../islands/Navbar.tsx";
import Flash from "../components/Flash.tsx";
import { State } from "../shared/interfaces.ts";

export default function App({ Component, data }: PageProps<State>) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hangout</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Navbar />
        <Flash flash={data?.flash} />
        <Component />
      </body>
    </html>
  );
}
