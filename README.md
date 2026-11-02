# Autobiography Project

Static site for PSYC& 200. No build step or dependencies.

## Filling it in

- Set your guiding theme, and rename stages or change ages, in `site-config.js`.
- In each page, replace every orange dashed box with your own writing:

  ```html
  <p>Your paragraph here.</p>
  ```

- Put photos in `images/` and replace each photo box with:

  ```html
  <figure>
    <img src="images/your-photo.jpg" alt="Describe the photo">
    <figcaption>Your caption.</figcaption>
  </figure>
  ```

The banner at the top of each page counts what is left on that page and disappears at zero.

## Deploying

In Vercel, choose Add New > Project and import this repository. Leave the framework preset as Other with no build command. Every push to `main` redeploys the site.

## Privacy

This repository is public, so anything committed here, including photos, is public. Pages are marked `noindex` to keep them out of search results, but anyone with the link can read them.
