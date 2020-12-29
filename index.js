const MY_DOMAIN = "orelhassid.com";
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  console.log("request 2", request.url);
  fetchAndApply();

  return new Response("Hello worker!", {
    headers: { "content-type": "text/plain" },
  });
}
async function fetchAndApply(req) {
  let url = new URL(req.url);
  url.hostname = "www.notion.so";

  let website = req.url.replace("https://" + MY_DOMAIN, "");
  console.log("website", { website, req, url });
}
