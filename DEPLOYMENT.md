# Deployment Guide 🚀

## Deploy to Vercel (Recommended - Free)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Custom Domain (Optional):**
   - Go to your Vercel dashboard
   - Add your custom domain
   - Update DNS records as instructed

**Live URL:** `https://your-project-name.vercel.app/api`

---

## Deploy to Railway (Free Tier)

1. **Connect Repository:**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway will auto-detect Node.js

2. **Environment Variables:**
   - Set `PORT` environment variable (Railway provides this automatically)
   - Set `NODE_ENV=production`

3. **Deploy:**
   - Railway deploys automatically on git push

**Live URL:** `https://your-project-name.up.railway.app/api`

---

## Deploy to Render (Free Tier)

1. **Create Web Service:**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your repository

2. **Settings:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `NODE_ENV=production`

3. **Deploy:**
   - Render deploys automatically

**Live URL:** `https://your-project-name.onrender.com/api`

---

## Deploy to Heroku

1. **Install Heroku CLI and login:**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku app:**
   ```bash
   heroku create your-qibla-api
   ```

3. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy Qibla API"
   git push heroku main
   ```

**Live URL:** `https://your-qibla-api.herokuapp.com/api`

---

## Deploy to DigitalOcean App Platform

1. **Create App:**
   - Go to DigitalOcean App Platform
   - Create app from GitHub repository

2. **Configuration:**
   - Runtime: Node.js
   - Build Command: `npm install`
   - Run Command: `npm start`

3. **Environment Variables:**
   - `NODE_ENV=production`

---

## Environment Variables

For all platforms, set these environment variables:

```
NODE_ENV=production
PORT=3000
```

Most platforms automatically provide the PORT variable.

---

## Post-Deployment Checklist

### Test Your API
```bash
# Health check
curl "https://your-domain.com/api/health"

# Qibla calculation
curl "https://your-domain.com/api/qibla?lat=40.7128&lng=-74.0060"

# Documentation
curl "https://your-domain.com/api/docs"
```

### Update Documentation
- Update README.md with your live API URL
- Update API_DOCS.md with your domain
- Share your API with the community

### Monitor Usage
- Check platform analytics/logs
- Monitor for errors or abuse
- Set up alerts for downtime

---

## Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records:
   ```
   Type: CNAME
   Name: api (or your subdomain)
   Value: cname.vercel-dns.com
   ```

### For Railway:
1. Go to project settings
2. Add custom domain
3. Update DNS records as instructed

### Example Custom URLs:
- `https://api.yourwebsite.com`
- `https://qibla-api.yourwebsite.com`
- `https://islamic-api.com/qibla`

---

## Maintenance

### Keep Dependencies Updated
```bash
npm audit
npm update
```

### Monitor Performance
- Set up uptime monitoring (UptimeRobot, etc.)
- Check response times regularly
- Monitor for API abuse

### Backup
- Keep your code in version control (Git)
- Document any custom configurations
- Save deployment logs

---

## Scaling (When Needed)

### If Traffic Grows:
1. **Caching:** Add Redis for caching results
2. **CDN:** Use CloudFlare for global distribution
3. **Database:** Store popular locations for faster lookups
4. **Load Balancing:** Use multiple instances

### Premium Features (Optional):
- Batch calculations
- Historical data
- Prayer times integration
- Custom rate limits for registered users

---

**May Allah bless your efforts in serving the ummah! 🤲**