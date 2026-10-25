# PriceChase

PriceChase is a TypeScript React storefront for browsing a product catalog, searching by keyword or image, and saving items to a wishlist. Product data, accounts, and admin actions come from a companion HTTP API. This repository is the frontend only.

Each product is shown with one price, a rating, and a link to the retailer's product page. Shoppers narrow the catalog with filters and sort options. The client does not render price history or a side-by-side comparison of the same item across stores.

## Features

### Browse

- A short splash screen plays, then the home page shows a hero carousel, a popular-products slider (`GET /products/popular`), and a discounts slider (`GET /products/discounts`).
- Categories load from `GET /categories/`. A category page loads its name and subcategories, then a cursor-paginated product grid (12 per page) for the category or a selected subcategory.
- A product page shows the image, title, price, currency, average rating, description, and top reviews returned by `GET /products/:id`. Opening the page records a view (`PUT /products/:id/view`). "Limited time deal" opens the retailer URL from the product payload. Reviews are displayed only; the unused feedback button is not mounted.
- Category, text-search, and image-search results share the same controls: minimum rating (1+ through 4+), minimum and maximum price, a popular flag, and sort by popularity, rating, price (low to high or high to low), or views.
- Category and subcategory requests always send the active rating, price, popular, and sort query parameters. Text and image search send those parameters to `GET /products/searchFilters` only when a rating, a price bound, or a sort is set. Checking popular by itself on a search does not issue that follow-up request.

### Search

- The navbar debounces text input and requests `GET /products/search`. When a sort or filter is active, the matching ids are sent to `GET /products/searchFilters`.
- Image search uploads the chosen file as multipart form data to `POST /products/search-by-image`, shows a preview, and can be cleared. The same filter request runs when sort or filters are set.

### Accounts

- Registration validates first name, last name, email, and password with Yup (8+ characters, upper and lower case, a number, and one of `@$!%*?&`), then posts to `POST /user/signup`.
- `/verify-account?token=` calls `GET /user/verify-email`. On success it stores `authToken` and `user` in `localStorage` and closes the window. The rest of the app does not read those keys.
- Login posts to `POST /user/login` with credentials. A `user` role is sent home; an `admin` role is sent to `/admin`. Logout posts to `POST /user/logout` and clears client session state.
- Session state is kept in cookies for 7 days: `auth`, `adminAuth`, and `profilePicture` (the first two are set with the Secure flag), plus `userEmail`. API calls that need the session send cookies with `withCredentials`.
- The profile page loads `GET /user/account` and can delete the account (`DELETE /user/account`). The update page can change first name, last name, and profile photo. A new photo is uploaded to Cloudinary, then sent with `PATCH /user/account`.
- "Add to Favorites" posts to `POST /wishlist/:id`. The profile lists `GET /wishlist` and can remove an item with `DELETE /wishlist/:id`.

### Admin

Admin routes are not wrapped in a client-side auth guard. After login, an admin is redirected to `/admin`.

- **Manage Users** lists accounts with cursor pagination (`GET /admin/users`) and can delete one (`DELETE /admin/users/:id`).
- **Manage Products** lists products with cursor pagination (`GET /products`) and can hide or show one (`PATCH /admin/hide/:id`).
- **Fetch New Products** and **Update Product Status** render a labeled button for Amazon. Those buttons have no click handler and do not call the API.

### Other pages

- About is static content (product copy and team profiles).
- Contact collects name, email, subject, and message in component state and logs the submit. It does not send the form anywhere.
- Unknown paths render a 404 page.
- Dark mode is class-based. The storefront toggle flips the `dark` class on the document element. The admin sidebar also reads and writes `localStorage.theme`.
- Route changes scroll the window to the top. Navigation includes a responsive menu.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 18, TypeScript, Vite 5 |
| Routing | React Router 6 |
| Styling | Tailwind CSS 3 (`darkMode: "class"`), PostCSS, Autoprefixer. Brand color `customBlue` is `#6D95EA`. Fonts are Poppins and Montserrat. |
| HTTP | Axios. The client is created in `src/config/axiosConfig.ts`. |
| Forms | React Hook Form and Yup on login and registration. Other forms use component state. |
| Session | `js-cookie` |
| Feedback | SweetAlert2 |
| Motion and carousels | Framer Motion, Swiper, React Slick |
| Icons | Heroicons, React Icons, Font Awesome |
| Lint | ESLint 9, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |
| Images | Profile uploads go to Cloudinary cloud `dqmp5l622` with upload preset `original` (hardcoded in the update-profile page). |

## Getting started

### Prerequisites

- Node.js `^18.0.0 || >=20.0.0`, which is the range required by Vite 5.4.8.
- npm. `package-lock.json` is committed, so `npm ci` installs the locked tree.
- The PriceChase API listening at `http://localhost:5000`. This repo does not include that service. Catalog, auth, wishlist, and admin screens stay empty or error without it.

### Install and run

```bash
npm install
npm run dev
```

Vite starts the dev server on port 5173 unless that port is already taken.

### Scripts

These are the scripts in `package.json`:

| Script | Command | What it does |
| --- | --- | --- |
| `npm run dev` | `vite` | Start the dev server with hot reload. |
| `npm run build` | `tsc -b && vite build` | Typecheck the project, then write a production build to `dist/`. |
| `npm run lint` | `eslint .` | Lint TypeScript and TSX files. `dist` is ignored. |
| `npm run preview` | `vite preview` | Serve the production build locally (Vite's default preview port is 4173). |

There is no test script.

### Configuration

The app does not read environment variables. No source file references `import.meta.env`.

`src/config/axiosConfig.ts` sets the Axios `baseURL` to `http://localhost:5000`. Change that value to point the client at another API origin.

`.env` is gitignored. A local `.env` may define `VITE_API_BASE_URL`, but the client never reads it, so editing that variable does not change requests.

The Cloudinary cloud name and upload preset used for profile photos are string literals in `src/Pages/ProfilePage/UpdateProfilePage.tsx`, not environment variables.

### API the client calls

| Method | Path | Used for |
| --- | --- | --- |
| `POST` | `/user/signup` | Register |
| `POST` | `/user/login` | Log in |
| `POST` | `/user/logout` | Log out |
| `GET` | `/user/verify-email?token=` | Confirm an email link |
| `GET` | `/user/account` | Load the signed-in profile |
| `PATCH` | `/user/account` | Update name or photo |
| `DELETE` | `/user/account` | Delete the account |
| `GET` | `/categories/` | Navbar categories |
| `GET` | `/categories/:id/subcategories` | Category name and subcategories |
| `GET` | `/categories/:id/products` | Products in a category |
| `GET` | `/subcategories/:id/products` | Products in a subcategory |
| `GET` | `/products/popular` | Home popular slider |
| `GET` | `/products/discounts` | Home discounts slider |
| `GET` | `/products/:id` | Product detail, description, and reviews |
| `PUT` | `/products/:id/view` | Record a product view |
| `GET` | `/products` | Admin product list |
| `GET` | `/products/search?query=` | Text search |
| `POST` | `/products/search-by-image` | Image search |
| `GET` | `/products/searchFilters` | Sort and filter a set of product ids |
| `POST` | `/wishlist/:id` | Add a favorite |
| `GET` | `/wishlist` | List favorites |
| `DELETE` | `/wishlist/:id` | Remove a favorite |
| `GET` | `/admin/users` | Admin user list |
| `DELETE` | `/admin/users/:id` | Delete a user |
| `PATCH` | `/admin/hide/:id` | Toggle product visibility |

List endpoints for categories, subcategories, users, and admin products accept `limit` and a `cursor` query parameter. Search and category filters append `rating`, `minPrice`, `maxPrice`, `popular`, `sortBy`, and `order` when those controls are set.

## Project structure

```
.
├── index.html                 # Document shell and font links
├── package.json
├── vite.config.ts             # React plugin only; no custom server or env wiring
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
│   └── vite.svg
└── src/
    ├── main.tsx               # BrowserRouter and carousel CSS
    ├── App.tsx                # Splash gate and route table
    ├── index.css
    ├── config/axiosConfig.ts  # Shared Axios instance
    ├── context/context.tsx    # Auth, admin, and profile-picture state
    ├── validation/            # Yup schemas and the verify-account page
    ├── admin/                 # Sidebar and admin screens
    ├── assets/                # Logo, hero art, category art, team photos
    └── Pages/
        ├── HomePage/          # Navbar, hero, sliders, search, footer
        ├── CategoryPage/
        ├── ProductPage/
        ├── ProfilePage/
        ├── Login.tsx
        ├── Register.tsx
        ├── AboutUs.tsx
        ├── Contacts.tsx
        ├── NotFound.tsx
        ├── ScrollToTop.tsx
        └── SplachScreen.tsx
```

### Routes

| Path | Screen |
| --- | --- |
| `/` | Home |
| `/register` | Create account |
| `/login` | Sign in |
| `/verify-account` | Email verification (`?token=`) |
| `/categories/:id` | Category and its products |
| `/productPage/:id` | Product detail |
| `/profile-page` | Profile and wishlist |
| `/update-profile-page` | Edit profile |
| `/about` | About |
| `/contacts` | Contact |
| `/admin` | Admin shell (nested outlet) |
| `/admin/users` | Manage users |
| `/admin/products` | Manage products |
| `/admin/fetch-products` | Fetch-new-products layout |
| `/admin/product-status` | Update-status layout |
| any other path | 404 |

## Screenshots

These files are interface assets shipped with the app (logo, a hero slide, and the sign-in artwork). They are not captures of the running screens.

![PriceChase logo](src/assets/images/new_logo.png)

![Hero artwork used on the home carousel](src/assets/images/shopping-vpNvhQDE.png)

![Artwork shown beside the sign-in and registration forms](src/assets/images/whiteLogin.png)

<!-- TODO: Add captured screens of the home page, text and image search, a product page, and the admin tables. Do not treat src/assets/images as a substitute for those captures. -->
