# Notion RTL and Theme
Customize Notion Pages and Blocks

You can use it in two diffrent ways:
1. Local using Chrome extension called Stylish

2. Global using Cloudflare Workers

# Quick Start
Replace your worker code with the current.
workers/worker.js
https://github.com/orelhassid/notion/blob/master/workers/worker.js

Then configure your website with the following variables:
1. MY_DOMAIN
2. SLUG_TO_PAGE
3. PAGE_TITLE
4. PAGE_DESCRIPTION

# How this is works?
In the worker file we are importing/Inject the styling.
if you want to disable theme or rtl just remove them from the worker. BUT in the future I will make a button that toggle between rtl support.
`<link href="https://orelhassid.github.io/notion/css/rtl.css" rel="stylesheet" />`,
`<link href="https://orelhassid.github.io/notion/css/theme.css" rel="stylesheet" />`
