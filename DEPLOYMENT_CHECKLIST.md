# Backend Wake-up Deployment Checklist

## Issues & Solutions

If the backend is still slow on first visit, it means the deployment hasn't been completed. Follow this checklist:

---

## ✅ STEP 1: Backend Deployment to Render

### Verify Backend Has Health Endpoint

Check if `/api/health` endpoint exists:
1. Open `backend/server.js`
2. Look for this code (should be present):
```javascript
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'Server is active',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Push Backend to GitHub
```bash
cd d:\Dev\Github\prashant-portfolio-pro
git add backend/server.js
git commit -m "Add /api/health endpoint"
git push origin main
```

### Check Render Deployment
1. Go to https://dashboard.render.com
2. Click on your backend service
3. Check "Deployments" tab
4. Wait for deployment to complete (green checkmark)
5. Copy your service URL (e.g., https://your-service-name.onrender.com)

### Test Health Endpoint
- Open in browser: `https://your-service-name.onrender.com/api/health`
- Should return:
```json
{
  "status": "Server is active",
  "timestamp": "2026-05-01T...",
  "uptime": 123.456
}
```

---

## ✅ STEP 2: Frontend Deployment to Vercel

### Verify Frontend Has Wake-up Code

Check if frontend is using wakeUpBackend:
1. Open `frontend/src/App.jsx`
2. Should import: `import { setupBackendHeartbeat } from './utils/wakeUpBackend';`
3. Should call in useEffect: `const cleanup = setupBackendHeartbeat();`

Check if wakeUpBackend utility exists:
1. File should exist: `frontend/src/utils/wakeUpBackend.js`
2. Should have aggressive pinging logic

### Push Frontend to GitHub
```bash
git add frontend/src/
git commit -m "Improve backend wake-up with aggressive pinging"
git push origin main
```

### Set Environment Variable on Vercel
1. Go to https://vercel.com/dashboard
2. Click on your portfolio project
3. Go to Settings → Environment Variables
4. Add/Update: `VITE_API_URL`
5. Value: `https://your-render-url/api` (replace with actual Render URL)
6. Save
7. **Redeploy** the project after setting env var

---

## ✅ STEP 3: Test the Solution

### Test 1: Direct Health Check
```bash
# Replace with your actual Render URL
curl https://your-render-service.onrender.com/api/health
```

Expected response:
```json
{
  "status": "Server is active",
  "timestamp": "...",
  "uptime": ...
}
```

### Test 2: Website Load
1. Close all tabs
2. Wait 20 minutes (let Render sleep the backend)
3. Visit your website: https://your-portfolio.vercel.app
4. Open browser console (F12)
5. Look for messages:
   - `🚀 Setting up backend heartbeat...`
   - `✅ Backend is awake: Server is active`
6. Navigate to Archive or Dashboard
7. **Should load instantly without delay**

### Test 3: Check Logs
- **Vercel logs:** https://vercel.com/dashboard → Select project → Deployments → Logs
- **Render logs:** https://dashboard.render.com → Select service → Logs
- Look for successful health endpoint calls

---

## 🔧 New Aggressive Pinging Strategy

The updated `wakeUpBackend.js` now does:

1. **Immediate ping** when app loads
2. **Retry after 3 seconds** if first ping fails
3. **Aggressive pings every 2 minutes** for first 5 minutes
4. **Regular pings every 4 minutes** after that
5. **Smart console logging** to verify it's working

This ensures:
- ✅ Backend wakes up immediately when user visits
- ✅ Backend stays active during user session
- ✅ No cold starts on first access

---

## Common Issues & Fixes

### Issue: "Backend wake-up attempt failed"
**Solution:**
1. Check VITE_API_URL is set correctly in Vercel
2. Verify `/api/health` endpoint exists in backend
3. Check Render service is running
4. Wait for Render to auto-redeploy

### Issue: Still slow on first visit
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Open in incognito/private window
3. Check browser console for error messages
4. Verify Render service URL is correct

### Issue: Can't test /api/health endpoint
**Solution:**
1. Go to Render dashboard
2. Copy exact service URL
3. Test in browser: `https://service-url.onrender.com/api/health`
4. If 404, the endpoint doesn't exist (backend not deployed)

---

## ⚠️ Critical Checklist

Before claiming it's working, verify:

- [ ] Backend `/api/health` endpoint deployed to Render
- [ ] Frontend code with `setupBackendHeartbeat()` deployed to Vercel
- [ ] `VITE_API_URL` environment variable set on Vercel
- [ ] Vercel project redeployed after setting env var
- [ ] Can visit `/api/health` endpoint directly in browser
- [ ] Browser console shows wake-up messages
- [ ] Website loads instantly after 20+ minute wait

---

## Need Help?

Check these resources:
1. Render logs: https://dashboard.render.com
2. Vercel logs: https://vercel.com/dashboard
3. Browser console: F12 → Console tab
4. Network tab: F12 → Network tab (check API calls)
