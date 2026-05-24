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
- [ ] Add seed data for contacts, news, and videos via the admin API

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
