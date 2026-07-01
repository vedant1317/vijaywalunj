# Vijay Walunj Political Portfolio Website

Official political portfolio for **Vijay Walunj**, BJP Leader, Vashi, Navi Mumbai.

**Stack:** React + Tailwind CSS (frontend) | Node.js + Express (backend) | MongoDB (database)

---

## Project Structure

```
vijay-walunj-portfolio/
├── frontend/   # React + Vite + Tailwind
└── backend/    # Node.js + Express + MongoDB
```

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # Fill in your MongoDB URI and JWT secret
npm run dev            # Starts on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev            # Starts on http://localhost:5173
```

### Vercel Testing Setup

For a quick test deploy, use the repo root as the Vercel project root.

1. Set the project root to the repository root, not `frontend/` or `backend/`.
2. Set `MONGO_URI`, `JWT_SECRET`, and any `YOUTUBE_*` env vars in Vercel.
3. If you want strict CORS, set `FRONTEND_URL` or `FRONTEND_URLS` to your Vercel domain(s).
4. Deploy. Frontend routes are served from `frontend/dist`, and API routes are handled from `api/[...all].js`.

Note: file uploads use local disk storage in the backend, so they are not a good fit for permanent use on Vercel. For testing the main site, news, videos, auth, and grievance APIs, this setup works.

---

## Environment Variables (backend/.env)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | JWT expiry (default: 7d) |
| `FRONTEND_URL` | Frontend URL for CORS |
| `NODE_ENV` | development / production |
| `YOUTUBE_PLAYLIST_ID` | Optional: curated YouTube playlist ID for only Vijay Walunj videos |
| `YOUTUBE_CHANNEL_ID` | Optional: YouTube channel ID for automatic video sync |
| `YOUTUBE_RSS_URL` | Optional: direct YouTube RSS feed URL if you prefer to use one |
| `YOUTUBE_SYNC_INTERVAL_MINUTES` | How often the backend refreshes the video feed |
| `YOUTUBE_SYNC_LIMIT` | Max number of videos to sync from YouTube |
| `YOUTUBE_VIDEO_KEYWORDS` | Comma-separated keywords used to keep only relevant videos from a mixed feed |

---

## Pages

| Route | Page |
|---|---|
| `/` | Home Page |
| `/login` | Login |
| `/signup` | Citizen Registration |
| `/grievance` | Grievance Portal |
| `/facilities` | Citizen Facilities |
| `/nmmc-services` | Online NMMC Services |
| `/vashi-premier-league` | Vashi Premier League |
| `/ganraj-vashicha` | Ganraj Vashicha |
| `/testimonials` | Public Testimonials |
| `/important-contacts` | Important Contacts |

---

## Customization Checklist

Before deploying, update the following:

- [ ] Replace `SOCIAL_LINKS` in `frontend/src/data/staticLinks.js` with actual social media URLs
- [ ] Replace `CONTACT_INFO` in `frontend/src/data/staticLinks.js` with actual phone, email, address
- [ ] Replace `GOOGLE_FORM_LINKS` with actual Google Form URLs for Stree Shakti and Umang Foundation
- [ ] Add actual photo of Vijay Walunj (replace placeholder in `Home.jsx` hero section)
- [ ] Upload actual PDF files for Form 6, Senior Citizen Card, Ayushman Card, Mahila Bachatgath to `frontend/public/assets/pdfs/`
- [ ] Update gallery images in `VashiPremierLeague.jsx` and `GanrajVashicha.jsx`
- [ ] Set `MONGO_URI` in `.env` to your MongoDB Atlas connection string
- [ ] Set a strong `JWT_SECRET` in `.env`
- [ ] Add seed data for contacts and news via the admin API
- [ ] Set `YOUTUBE_PLAYLIST_ID` if you maintain a curated playlist, or set `YOUTUBE_VIDEO_KEYWORDS` for a mixed channel feed

---

## API Endpoints

```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me

POST   /api/grievances          (submit grievance)
GET    /api/grievances/track/:id (track by reference ID)
GET    /api/grievances/my        (user's own grievances)
GET    /api/grievances           (admin: all grievances)
PATCH  /api/grievances/:id/status (admin: update status)

GET    /api/news
GET    /api/news/:slug
POST   /api/news                 (admin)
PATCH  /api/news/:id             (admin)
DELETE /api/news/:id             (admin)

GET    /api/videos
POST   /api/videos/sync          (admin/staff)
POST   /api/videos               (admin)

GET    /api/testimonials         (approved only)
POST   /api/testimonials         (public submission)
PATCH  /api/testimonials/:id     (admin: approve/reject)

GET    /api/contacts
GET    /api/facilities
GET    /api/events/:type         (vashi_premier_league | ganraj_vashicha)
```

---

## Deployment

- **Frontend:** Vercel or Netlify (set `VITE_API_URL` env var)
- **Backend:** Render, Railway, or AWS EC2
- **Database:** MongoDB Atlas (free tier available)
