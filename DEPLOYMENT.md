# Vercel Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Create a `.env` file in your project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Vercel Configuration
The project includes:
- `vercel.json` - Handles client-side routing for React Router
- `public/_redirects` - Fallback for routing (backup)

### 3. Build Configuration
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Deployment Steps

### Step 1: Commit to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment with routing fixes"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm i -g vercel
vercel
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

### Step 3: Environment Variables in Vercel
In your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key-here`

## Common Issues & Solutions

### 1. 404 on Direct URL Access
**Problem**: Direct access to `/about`, `/programs`, etc. returns 404
**Solution**: The `vercel.json` file handles this with rewrites

### 2. Assets Not Loading
**Problem**: Images, CSS, JS files return 404
**Solution**: Check that build output is in `dist` folder

### 3. Environment Variables Not Working
**Problem**: Supabase connection fails
**Solution**: Ensure variables are prefixed with `VITE_` and set in Vercel dashboard

### 4. Build Failures
**Problem**: Build process fails
**Solution**: 
- Check Node.js version (Vercel uses 18.x by default)
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors

## Testing After Deployment

1. **Homepage**: Should load correctly
2. **Direct URLs**: Try accessing `/about`, `/programs`, `/impact` directly
3. **Admin Routes**: Test `/admin/dashboard` (requires login)
4. **Images**: Verify all images load correctly
5. **Interactive Features**: Test contact form, gallery, etc.

## Performance Optimization

The `vercel.json` includes:
- Asset caching headers for better performance
- Proper routing configuration for SPA

## Troubleshooting

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables are set
3. Test locally with `npm run build && npm run preview`
4. Check browser console for errors
