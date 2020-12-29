/* CONFIGURATION STARTS HERE */

/* Step 1: enter your domain name like orelhassid.com */
const MY_DOMAIN = "orelhassid.com";

/*
 * Step 2: enter your URL slug to page ID mapping
 * The key on the left is the slug (without the slash)
 * The value on the right is the Notion page ID
 */
const SLUG_TO_PAGE = {
  "": "Notion ID",
  he: "Notion ID",
  "en/blog": "Notion ID",
};

/* Step 3: enter your page title and description for SEO purposes */
const PAGE_TITLE = "";
const PAGE_DESCRIPTION = "";

/* CONFIGURATION ENDS HERE */

const PAGE_TO_SLUG = {};
const slugs = [];
const pages = [];
Object.keys(SLUG_TO_PAGE).forEach((slug) => {
  const page = SLUG_TO_PAGE[slug];
  slugs.push(slug);
  pages.push(page);
  PAGE_TO_SLUG[page] = slug;
});

addEventListener("fetch", (event) => {
  event.respondWith(fetchAndApply(event.request));
});

function generateSitemap() {
  let sitemap = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  slugs.forEach(
    (slug) =>
      (sitemap +=
        "<url><loc>https://" + MY_DOMAIN + "/" + slug + "</loc></url>")
  );
  sitemap += "</urlset>";
  return sitemap;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function handleOptions(request) {
  if (
    request.headers.get("Origin") !== null &&
    request.headers.get("Access-Control-Request-Method") !== null &&
    request.headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    return new Response(null, {
      headers: corsHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, PUT, OPTIONS",
      },
    });
  }
}

async function fetchAndApply(request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request);
  }
  let url = new URL(request.url);
  url.hostname = "www.notion.so";
  if (url.pathname === "/robots.txt") {
    return new Response("Sitemap: https://" + MY_DOMAIN + "/sitemap.xml");
  }
  if (url.pathname === "/sitemap.xml") {
    let response = new Response(generateSitemap());
    response.headers.set("content-type", "application/xml");
    return response;
  }
  let fullPathname = request.url.replace("https://" + MY_DOMAIN, "");
  let response;
  if (url.pathname.startsWith("/app") && url.pathname.endsWith("js")) {
    response = await fetch(url.toString());
    let body = await response.text();
    response = new Response(
      body
        .replace(/www.notion.so/g, MY_DOMAIN)
        .replace(/notion.so/g, MY_DOMAIN),
      response
    );
    response.headers.set("Content-Type", "application/x-javascript");
    return response;
  } else if (url.pathname.startsWith("/api")) {
    // Forward API
    response = await fetch(url.toString(), {
      body: request.body,
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
      },
      method: "POST",
    });
    response = new Response(response.body, response);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "content-security-policy",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://embed.typeform.com https://admin.typeform.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:"
    );
    return response;
  } else if (slugs.indexOf(url.pathname.slice(1)) > -1) {
    const pageId = SLUG_TO_PAGE[url.pathname.slice(1)];
    return Response.redirect("https://" + MY_DOMAIN + "/" + pageId, 301);
  } else {
    response = await fetch(url.toString(), {
      body: request.body,
      headers: request.headers,
      method: request.method,
    });
    response = new Response(response.body, response);
    response.headers.delete("Content-Security-Policy");
    response.headers.delete("X-Content-Security-Policy");
  }

  return appendJavascript(response, SLUG_TO_PAGE, request);
}

class MetaRewriter {
  element(element) {
    if (PAGE_TITLE !== "") {
      if (
        element.getAttribute("property") === "og:title" ||
        element.getAttribute("name") === "twitter:title"
      ) {
        element.setAttribute("content", PAGE_TITLE);
      }
      if (element.tagName === "title") {
        element.setInnerContent(PAGE_TITLE);
      }
    }
    if (PAGE_DESCRIPTION !== "") {
      if (
        element.getAttribute("name") === "description" ||
        element.getAttribute("property") === "og:description" ||
        element.getAttribute("name") === "twitter:description"
      ) {
        element.setAttribute("content", PAGE_DESCRIPTION);
      }
    }
    if (
      element.getAttribute("property") === "og:url" ||
      element.getAttribute("name") === "twitter:url"
    ) {
      element.setAttribute("content", MY_DOMAIN);
    }
    if (element.getAttribute("name") === "apple-itunes-app") {
      element.remove();
    }
  }
}

class HeadRewriter {
  constructor(SLUG_TO_PAGE, request) {
    this.SLUG_TO_PAGE = SLUG_TO_PAGE;
    this.request = request;

    console.log("Slug HEAD", SLUG_TO_PAGE);
    console.log("request HEAD", request.url);
  }
  element(element) {
    element.append(
      `<link href="https://orelhassid.github.io/notion/css/rtl.css" rel="stylesheet" />`,
      {
        html: true,
      }
    );
    element.append(
      `<link href="https://orelhassid.github.io/notion/css/theme.css" rel="stylesheet" />`,
      {
        html: true,
      }
    );
  }
}

class BodyRewriter {
  constructor(SLUG_TO_PAGE) {
    this.SLUG_TO_PAGE = SLUG_TO_PAGE;
  }

  element(element) {
    element.append(
      `<script>
          const features = document.createElement("div");
          features.className = "topbar-features";
          features.id = "topbar-features";

          features.innerHTML =
            '<div class="theme-container"><button id="dropdown-button" class="dropdown-button"><span>Theme</span></button><ul class="dropdown-content" id="dropdown-content"><li id="dark">Dark</li><li id="light">Light</li><li id="palenight">Palenight</li><li id="solarized_light">Solarized Light</li><li id="night_owl">Night Owl</li></ul></div>';

        function createDropdown(device) {
        const nav =
            device === "web"
            ? document.querySelector(".notion-topbar").firstChild
            : document.querySelector(".notion-topbar-mobile");
        nav.appendChild(features);

        const dropdownButton = document.getElementById("dropdown-button");
        const dropdownContent = document.getElementById("dropdown-content");

        dropdownButton.addEventListener("click", toggle);

        var items = Array.from(dropdownContent.children);
        items.forEach((item) => {
            item.addEventListener("click", toggle);
            item.addEventListener("click", () => setTheme(item));
        });
        }

        function toggle() {
          const dropdownContent = document.getElementById("dropdown-content");
          dropdownContent.classList.toggle("show");
        }
        function setTheme({ id }) {
          document.body.className = "notion-body " + id;
          document.body.dataset.theme = id;
          switch (id) {
            case "dark":
              onDark();
              break;
            case "light":
              onLight();
              break;
            case "palenight":
              onDark();
              break;
            case "solarized_light":
              onLight();
              break;
            case "night_owl":
              onDark();
              break;
            default:
              onLight();
          }
        }
        function onDark() {
          __console.environment.ThemeStore.setState({ mode: "dark" });
        }
        function onLight() {
          __console.environment.ThemeStore.setState({ mode: "light" });
        }

        const SLUG_TO_PAGE = ${JSON.stringify(this.SLUG_TO_PAGE)};
        const PAGE_TO_SLUG = {};
        const slugs = [];
        const pages = [];
        let redirected = false;
        Object.keys(SLUG_TO_PAGE).forEach(slug => {
          const page = SLUG_TO_PAGE[slug];
          slugs.push(slug);
          pages.push(page);
          PAGE_TO_SLUG[page] = slug;
        });
        function getPage() {
          return location.pathname.slice(-32);
        }
        function getSlug() {
          return location.pathname.slice(1);
        }
        function updateSlug() {
          const slug = PAGE_TO_SLUG[getPage()];
          if (slug != null) {
            history.replaceState(history.state, '', '/' + slug);
          }
        }

        const observer = new MutationObserver(function() {
          if (redirected) return;
          const nav = document.querySelector('.notion-topbar');
          const mobileNav = document.querySelector('.notion-topbar-mobile');
          if (nav && nav.firstChild && nav.firstChild.firstChild
            || mobileNav && mobileNav.firstChild) {
            redirected = true;
            updateSlug();
            createDropdown(nav ? 'web' : 'mobile');
            const onpopstate = window.onpopstate;
            window.onpopstate = function() {
              if (slugs.includes(getSlug())) {
                const page = SLUG_TO_PAGE[getSlug()];
                if (page) {
                  history.replaceState(history.state, 'bypass', '/' + page);
                }
              }
              onpopstate.apply(this, [].slice.call(arguments));
              updateSlug();
            };
          }
        });
        observer.observe(document.querySelector('#notion-app'), {
          childList: true,
          subtree: true,
        });
        const replaceState = window.history.replaceState;
        window.history.replaceState = function(state) {
          if (arguments[1] !== 'bypass' && slugs.includes(getSlug())) return;
          return replaceState.apply(window.history, arguments);
        };
        const pushState = window.history.pushState;
        window.history.pushState = function(state) {
          const dest = new URL(location.protocol + location.host + arguments[2]);
          const id = dest.pathname.slice(-32);
          if (pages.includes(id)) {
            arguments[2] = '/' + PAGE_TO_SLUG[id];
          }
          return pushState.apply(window.history, arguments);
        };
        const open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function() {
          arguments[1] = arguments[1].replace('${MY_DOMAIN}', 'www.notion.so');
          return open.apply(this, [].slice.call(arguments));
        };
    </script>`,
      { html: true }
    );
  }
}

async function appendJavascript(res, SLUG_TO_PAGE, request) {
  return new HTMLRewriter()
    .on("title", new MetaRewriter())
    .on("meta", new MetaRewriter())
    .on("head", new HeadRewriter(SLUG_TO_PAGE, request))
    .on("body", new BodyRewriter(SLUG_TO_PAGE))
    .transform(res);
}
