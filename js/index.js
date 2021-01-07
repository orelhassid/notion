const coverImage = document.querySelector(
  "div.notion-frame > div.notion-scroller.vertical.horizontal > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > img"
);

let meta = document.querySelector("meta[property='og:image']");

meta.content = coverImage.src;
