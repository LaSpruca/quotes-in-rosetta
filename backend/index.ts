import {
  Application,
  Router,
  hasFlash,
  FlashServer,
} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { z } from "https://deno.land/x/zod@v3.19.1/mod.ts";

const quoteType = z.object({
  person: z.string(),
  quote: z.string(),
  date: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

export type Quote = z.TypeOf<typeof quoteType>;

const router = new Router();
router
  .get("/quotes", ({ response, state: { quotes } }) => {
    response.headers.set("content-type", "application/json");
    response.body = JSON.stringify(quotes);
  })
  .post("/quote", async ({ request, response, state: { quotes } }) => {
    const { value } = await request.body({
      type: "json",
    });

    try {
      const data = quoteType.parse(await value);

      quotes.push(data);

      const index = quotes.length - 1;

      response.body = JSON.stringify({
        index,
      });

      response.headers.set("content-type", "application/json");
    } catch (ex) {
      console.log(ex);
      response.body = JSON.stringify(ex);

      response.headers.set("content-type", "application/json");

      response.status = 400;
    }
  })
  .delete("/quote/:id", ({ response, params: { id }, state: { quotes } }) => {
    const resulting = (quotes as Quote[]).splice(parseInt(id), 1);
    response.headers.set("content-type", "application/json");
    response.body = JSON.stringify(resulting);
  });

const appOptions = hasFlash() ? { serverConstructor: FlashServer } : undefined;

const app = new Application(appOptions);

app.use(async (ctx, next) => {
  console.log(
    `${new Date().toISOString()} ${ctx.request.method} ${ctx.request.url}`
  );

  ctx.state["quotes"] = JSON.parse(await Deno.readTextFile("./quotes.json"));

  await next();

  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET,POST,DELETE");
  if (ctx.request.method != "GET") {
    await Deno.writeTextFile(
      "./quotes.json",
      JSON.stringify(ctx.state["quotes"])
    );
  }
});
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
