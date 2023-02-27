This is a starter template for [Learn Next.js](https://nextjs.org/learn).

nextjs & graphql

@getStaticProps:
- is used when The data required to render the page is available at build time ahead of a user’s request
- is used when The data comes from a headless CMS
- is used when The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance
- is used when The data can be publicly cached (not user-specific). This condition can be bypassed in certain specific situation by using a Middleware to rewrite the path.
- always runs on the server and never on the client (you can validate via https://next-code-elimination.vercel.app/ will not show body of getStaticProps)

@tus.io & formidalbe
- in component (relaese-form.js) should not define header content-type, its automatically recognized as multipart/form-data. defining it manually will causing formidable cant find boundary that generate by browser each form submitted 


