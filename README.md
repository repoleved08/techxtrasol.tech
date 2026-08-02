# blackspike Nuxt landing page

[<img src="public/theme-preview/github-preview.jpg" alt="screens showing theme parts on iPads" style="max-width: 100%; height: auto; width: 100%;" width="1600">](public/theme-preview/github-preview.jpg)

## A free, modern, [nuxt](https://nuxt.com/) landing page theme made with [Tailwind](https://tailwindcss.com/) to help kick start your next Nuxt project

We built this page as the first version of our own website, [blackspike.com](https://www.blackspike.com), but switched to a different design later.

Rather than let it gather dust, we decided to modernise it, try out some fresh new CSS features and give it back to the Nuxt community.

You can read more about how we built it and the cool new tech we used [on our blog post](https://www.blackspike.com/blog/converting-an-astro-website-to-nuxt-4/).


## Live demo https://nuxt-theme.blackspike.com

We hope you find it useful!

## Production site

This project is deployed as the live TechXtrasol website at https://www.techxtrasol.tech. Content (blog posts, projects, case studies, services) is managed through the admin panel at `/admin` and stored in Supabase.

## SEO

- Schema.org structured data (Organization, LocalBusiness, Article, Service, Product, FAQPage) via `@nuxtjs/seo`
- Dynamic sitemap at `/sitemap.xml` powered by Supabase content
- `robots.txt` including an LLMs group allowing `/llms.txt` and `/llms-full.txt`
- IndexNow key file at `/b08246a0ebe24302893bd17ea8edb2af.txt`; URL notifications submitted on publish via `/api/indexnow`

## License

Theme and 3D images are licensed under a [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/).

Created by blackspike [blackspike design](https://www.blackspike.com) – a web design & development team specialising in Nuxt, Vue, Nuxt & Wordpress websites

## CSS & HTML Features

- [Tailwind 4](https://tailwindcss.com/blog/tailwindcss-v4)
- HTML modal dialog
- JS-free scroll-linked animations
- JS-free exclusive accordions with details/summary (animated!)
- Container queries
- Linear easing for bouncing / springing
- Text wrap pretty / balance

## JS Features

- [swiper.js](https://swiperjs.com/) carousel

## Previews

[<img src="public/theme-preview/blackspike-theme-1.jpg" alt="screenshot of dark theme landing page on desktop and on ipad browsers" style="max-width: 100%; height: auto; width: 100%;" width="1600">](public/theme-preview/blackspike-theme-1.jpg)

[<img src="public/theme-preview/blackspike-theme-2.jpg" alt="screenshot of dark theme carousel slides with 3D backgrounds" style="max-width: 100%; height: auto; width: 100%;" width="1600">](public/theme-preview/blackspike-theme-2.jpg)

[<img src="public/theme-preview/blackspike-theme-4.jpg" alt="screens showing theme parts" style="max-width: 100%; height: auto; width: 100%;" width="1600">](public/theme-preview/blackspike-theme-4.jpg)

[<img src="public/theme-preview/blackspike-theme-5.jpg" alt="dark theme pricing section on laptop and iPhone browsers" style="max-width: 100%; height: auto; width: 100%;" width="1600">](public/theme-preview/blackspike-theme-5.jpg)

[<img src="public/theme-preview/blackspike-theme-full.webp" alt="full page preview" style="max-width: 100%; height: auto; width: 100%;" width="1600">](public/theme-preview/blackspike-theme-full.webp)

## Credits

- Fake logos by [uicontent.co](https://uicontent.co/svg-dummy-logo/)
- Quote avatar person by [thispersondoesnotexist.com](https://thispersondoesnotexist.com/)
- Misc icons and logo from [icones.js.org](https://icones.js.org/) by [@antfu](https://github.com/antfu)
- Carousel powered by [swiperjs.com](https://swiperjs.com/)
- Inter font by [rsms.me](https://rsms.me/inter/)

## Tags

#tailwind #tailwind4 #nuxt #landingPage #css #html #swiper #dark #theme

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run Nuxt ...`       | Run CLI commands like `nuxt add`, `nuxt check` |
| `npm run Nuxt -- --help` | Get help using the Nuxt CLI                     |

