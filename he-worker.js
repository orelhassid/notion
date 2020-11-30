class HeadRewriter {
  element(element) {
    element.append(
      `<link href="https://orelhassid.github.io/notion/notion-rtl.css" rel="stylesheet" />`,
      {
        html: true,
      }
    );
  }
}

async function handleRequest(req) {
  const res = await fetch(req);
  return rewriter.transform(res);
}

const rewriter = new HTMLRewriter().on("head", new HeadRewriter());

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
