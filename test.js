import { assert } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

Deno.test("set image", () => {
  const document = new DOMParser().parseFromString(
    `<!DOCTYPE html>
        <html lang="ja">
          <head>
            <title>Hello from Deno</title>
          </head>
          <body>
          <canvas id="canvas"></canvas>
          </body>
        </html>`,
    "text/html"
  );

  const canvas = document.getElementById("canvas");
  assert(canvas);
});
