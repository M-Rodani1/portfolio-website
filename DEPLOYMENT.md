# Netlify Deployment Guide

**Benefits of Netlify:**
- ✅ Works with **private repositories** (free tier)
- ✅ Automatic deployments on every push
- ✅ Free custom domain support
- ✅ Free SSL/HTTPS certificates
- ✅ Fast global CDN
- ✅ Simple setup process

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name it (e.g., `portfolio-website` or `mohamed-rodani-portfolio`)
4. Make it **Public** or **Private** (both work with Netlify!)
5. **Don't** initialize with README, .gitignore, or license (we already have files)
6. Click **Create repository**

## Step 2: Push Your Code to GitHub

Run these commands in your terminal (from the project directory):

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit - portfolio website"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify

1. Go to [Netlify](https://www.netlify.com) and sign up (free account)
   - You can sign up with your GitHub account for easier integration
2. Once logged in, click **Add new site** → **Import an existing project**
3. Click **Deploy with GitHub**
4. Authorize Netlify to access your GitHub account (if needed)
   - **Important:** When authorizing, Netlify will ask for permission to access your repositories
   - Grant access to **all repositories** (or select specific ones)
   - This allows Netlify to access **both public AND private repositories**
5. Select your repository from the list (private repos will appear too!)
6. Configure build settings:
   - **Branch to deploy**: `main`
   - **Build command**: (leave empty - no build needed for static site)
   - **Publish directory**: `/` (root directory)
7. Click **Deploy site**

Your site will be live at:
- `https://random-name-123456.netlify.app` (Netlify generates a random name)
- You can customize this in **Site settings** → **Change site name**

## Step 4: Set Up Custom Domain (Optional)

If you own `mohamedrodani.com` (or `mr.io`):

1. In Netlify, go to your site dashboard
2. Click **Domain settings** (or **Site configuration** → **Domain management**)
3. Click **Add custom domain**
4. Enter your domain: `mohamedrodani.com` (or `mr.io`)
5. Netlify will show you two options for DNS setup:

### Option A: Use Netlify DNS (Recommended - Easier)

This lets Netlify manage your DNS automatically:

1. On the "Set up Netlify DNS" screen, click **Continue** (you can skip adding DNS records for now)
2. Click **Activate Netlify DNS** on the next screen
3. Netlify will provide you with **nameservers** (usually 4 nameservers like `dns1.p01.nsone.net`)
4. Go to your domain registrar (where you bought the domain)
5. Find the **Nameservers** or **DNS** settings
6. Replace the existing nameservers with Netlify's nameservers
7. Save and wait 10-60 minutes for DNS to propagate
8. Netlify will automatically:
   - Configure all DNS records
   - Provision SSL certificate (HTTPS)
   - Set up wildcard certificates for subdomains

**Note:** If you use your domain for email or other services, you can add those DNS records later in Netlify's DNS settings.

### Option B: Manual DNS Configuration

If you prefer to keep DNS management at your registrar:

1. On the setup screen, choose to configure DNS manually
2. In your domain registrar, add these DNS records:

   **For root domain:**
   - **Type**: `CNAME`
   - **Name**: `@` (or leave blank for root domain)
   - **Value**: `YOUR-SITE-NAME.netlify.app` (Netlify will show you the exact value)
   - **TTL**: `3600` (or default)

   **OR use A records:**
   - **Type**: `A`
   - **Name**: `@`
   - **Value**: `75.2.60.5` (Netlify will show you the current IPs - they may change)
   - **TTL**: `3600`

3. For `www` subdomain (optional):
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Value**: `YOUR-SITE-NAME.netlify.app`
   - **TTL**: `3600`

4. Wait 10-60 minutes for DNS to propagate
5. Netlify will automatically provision SSL certificate (HTTPS)

6. Update `index.html` line 16 with your custom domain URL

## Step 5: Update HTML with Your Domain

After deployment, update line 16 in `index.html`:
- If using Netlify default: `https://YOUR-SITE-NAME.netlify.app`
- If using custom domain: `https://mohamedrodani.com` (or `https://mr.io`)

## Future Updates

**Yes!** Once you've connected your GitHub repo to Netlify, updates are automatic - **even if your repo is private!**

1. Make changes to your website files locally
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update website"
   git push
   ```
3. **That's it!** Netlify will automatically:
   - Detect the push to your GitHub repo (works with private repos too!)
   - Start a new deployment
   - Build and deploy your site
   - Update your live website

Changes will be live in **1-2 minutes**! You can watch the deployment progress in your Netlify dashboard under the **Deploys** tab.

**Note:** Your repository can be private - Netlify has access through the GitHub authorization you granted during setup, so it can detect changes and deploy automatically.

## Additional Netlify Features

- **Deploy Previews**: Every pull request gets a preview URL
- **Split Testing**: Test different versions of your site
- **Form Handling**: Built-in form submissions (free tier: 100 submissions/month)
- **Analytics**: Optional site analytics (paid feature)

---

## Alternative: GitHub Pages (Public Repos Only)

If you prefer GitHub Pages and don't mind keeping your repo public, see the previous version of this guide.

