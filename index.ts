import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

const scores = [{value: 0, id: 0}];
router.get('/scores', (ctx) => {
    ctx.response.body = scores;
})

router.post('/score', async (ctx) => {
    const body = ctx.request.body({ type: 'form' })
    const value = await body.value
    const v = value.get('value');
    const newScore = {value: parseInt(v ?? '0'), id: 0};
    newScore.id = scores.length;
    scores.push(newScore);
    
    ctx.response.body = newScore;
})

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen({ port: 8000 });
