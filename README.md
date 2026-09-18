# JoseBlogs

JoseBlogs is a full-stack blogging platform and Content Management System (CMS) built with Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma 8 and Auth.js.

The project provides a public-facing blog experience along with a protected admin dashboard for managing blog content.

## Live Demo

[Visit JoseBlogs](https://nextjs-joseblogs-app.vercel.app)

---

## Features

### Public Blog

- Responsive homepage with featured and latest blogs
- Public blog listing page
- Individual blog pages using dynamic slugs
- Published blogs are displayed dynamically from PostgreSQL
- Blog categories and reading-time information
- Cloudinary-hosted blog images
- Responsive design for desktop, tablet, and mobile devices

### Admin CMS

- Secure admin authentication using Auth.js
- Protected admin dashboard
- Blog management interface
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Publish and unpublish blog posts
- Blog statistics including total, published, and draft posts
- Confirmation dialog before deleting blogs

### Database

- PostgreSQL database hosted on Neon
- Prisma 8 contract-based database workflow
- Persistent blog data
- Dynamic content retrieved directly from the database

### Images

- Cloudinary used for blog image hosting
- Image URLs are stored in PostgreSQL
- Next.js remote image configuration for Cloudinary

---

## Technologies Used

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- Next.js App Router
- Next.js API Routes
- Server Components
- Server Actions
- Axios

### Database

- PostgreSQL
- Neon
- Prisma 8

### Authentication

- Auth.js
- Credentials Provider
- JWT Sessions

### Image Hosting

- Cloudinary

### Deployment

- Vercel
- GitHub

---

## Project Structure

```text
joseblogs/
├── public/
│   └── images/
│       └── hero_section.png
│
├── src/
│   ├── actions/
│   │   └── admin.ts
│   │
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   │
│   │   ├── blogs/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── blogs/
│   │   │       ├── page.tsx
│   │   │       ├── new/
│   │   │       │   └── page.tsx
│   │   │       └── [id]/
│   │   │           └── edit/
│   │   │               └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       │
│   │       ├── blogs/
│   │       │   └── route.ts
│   │       │
│   │       └── admin/
│   │           └── blogs/
│   │               ├── route.ts
│   │               └── [id]/
│   │                   └── route.ts
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   └── DeleteBlogButton.tsx
│   │   │
│   │   ├── blog/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleGrid.tsx
│   │   │   ├── FeaturedArticle.tsx
│   │   │   └── RelatedBlogs.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Navbar.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── SectionHeading.tsx
│   │
│   └── prisma/
│       ├── contract.prisma
│       ├── contract.json
│       ├── contract.d.ts
│       └── db.ts
│
├── auth.ts
├── prisma.config.ts
├── prisma-8.md
├── .env.example
├── package.json
└── README.md
```

## Authentication

JoseBlogs uses Auth.js with the Credentials Provider for admin authentication.

The admin area is protected and requires authentication before users can:

- Access the admin dashboard
- View the admin blog management page
- Create blogs
- Edit blogs
- Delete blogs
- Publish or unpublish blogs

Unauthenticated users are redirected to the admin login page.

---

## Blog Management

The CMS provides a complete blog management workflow:

**Admin Login → Admin Dashboard → Blog Management → Create / Edit / Delete → Publish Blog → PostgreSQL Database → Public Blog Pages**

Each blog contains:

- Title
- Slug
- Excerpt
- Content
- Category
- Image URL
- Read time
- Published status
- Created date
- Updated date

---

## Database

The application uses PostgreSQL hosted on Neon.

The main Blog model contains:

```
id
title
slug
excerpt
content
category
imageUrl
readTime
published
createdAt
updatedAt

```

---

## Image Management

Blog images are hosted on Cloudinary.

The application does not upload images programmatically to Cloudinary.

Instead, images are manually uploaded to Cloudinary and their direct URLs are stored in the PostgreSQL database.

Example:

```
https://res.cloudinary.com/your-cloud-name/image/upload/...

```

Next.js is configured to allow images from the project's Cloudinary domain.

---

## Deployment

JoseBlogs is deployed using **Vercel**.

---

## Environment Variables

| Variable         | Description                       |
| ---------------- | --------------------------------- |
| `DATABASE_URL`   | Neon PostgreSQL connection string |
| `ADMIN_EMAIL`    | Admin login email                 |
| `ADMIN_PASSWORD` | Admin login password              |
| `AUTH_SECRET`    | Secret used by Auth.js            |

Never expose these values publicly or commit them to the repository.

---

## Responsive Design

The interface is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

Tailwind CSS responsive utilities are used throughout the application to create layouts that adapt to different screen sizes.

## Author

**Arun Joshva**

Web Developer specializing in modern web technologies and full-stack development.


