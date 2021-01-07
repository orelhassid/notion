if (document.readyState === "complete") {
  let scripts = document.querySelectorAll("script"); // Analytics
  scripts = Array.from(scripts);
  let anaylitcScript = scripts.find((s) => s.async);
  anaylitcScript.remove();

  const coverImage = document.querySelector(
    `div.notion-frame > div.notion-scroller.vertical.horizontal > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > img`
  );
  console.log("DOM fully loaded and parsed: coverImage", coverImage);

  let meta = document.querySelector("meta[property='og:image']");

  meta.content = coverImage.src;
}
