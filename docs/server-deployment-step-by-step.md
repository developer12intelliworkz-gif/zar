# ZAR Jewels Server Deployment (Step by Step)

This guide explains how to upload and run your Next.js app on your own Linux VPS/server (Ubuntu + Nginx + PM2).

## 1) Prepare your server

1. Buy/create a VPS (Ubuntu 22.04 or 24.04 recommended).
2. Point your domain DNS to your server public IP.
3. Connect to server with SSH:
   - `ssh root@YOUR_SERVER_IP`
4. Update system packages:
   - `apt update && apt upgrade -y`

## 2) Install Node.js and required tools

1. Install Node.js 20 LTS (or newer LTS supported by your Next.js version):
   - `curl -fsSL https://deb.nodesource.com/setup_20.x | bash -`
   - `apt install -y nodejs`
2. Verify versions:
   - `node -v`
   - `npm -v`
3. Install PM2 and Nginx:
   - `npm install -g pm2`
   - `apt install -y nginx`

## 3) Upload project to server

Choose one method.

### Method A: Git (recommended)

1. Install Git (if needed):
   - `apt install -y git`
2. Go to web directory:
   - `mkdir -p /var/www && cd /var/www`
3. Clone project:
   - `git clone YOUR_REPOSITORY_URL zar`
4. Enter project folder:
   - `cd /var/www/zar`

### Method B: Manual upload (ZIP/SFTP)

1. Zip your local project.
2. Upload zip to `/var/www/zar` using FileZilla/WinSCP.
3. SSH into server and extract:
   - `mkdir -p /var/www/zar`
   - `cd /var/www/zar`
   - `unzip your-project.zip`

## 4) Configure environment variables

1. Inside `/var/www/zar`, create `.env.production`.
2. Add all required production variables used by your app/API.
3. Keep secrets private and never commit `.env.production`.

## 5) Install dependencies and build

1. In project folder:
   - `cd /var/www/zar`
2. Install packages:
   - `npm ci`
3. Build app:
   - `npm run build`
4. Quick local server test:
   - `npm run start`
5. Stop test process with `Ctrl + C`.

## 6) Run app with PM2 (process manager)

1. Start Next.js on port 3000 using PM2:
   - `pm2 start npm --name zar-jewels -- start`
2. Save PM2 process list:
   - `pm2 save`
3. Enable PM2 auto-start on reboot:
   - `pm2 startup`
   - Run the command PM2 prints after this step.
4. Check status/logs:
   - `pm2 status`
   - `pm2 logs zar-jewels`

## 7) Configure Nginx reverse proxy

1. Create Nginx site config:
   - `nano /etc/nginx/sites-available/zar`
2. Paste this config (replace domain):

```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable the site:
   - `ln -s /etc/nginx/sites-available/zar /etc/nginx/sites-enabled/`
4. Test Nginx:
   - `nginx -t`
5. Reload Nginx:
   - `systemctl reload nginx`

## 8) Enable HTTPS (SSL)

1. Install Certbot:
   - `apt install -y certbot python3-certbot-nginx`
2. Generate and attach SSL:
   - `certbot --nginx -d yourdomain.com -d www.yourdomain.com`
3. Test auto-renew:
   - `certbot renew --dry-run`

## 9) Open firewall ports

1. If UFW is enabled:
   - `ufw allow OpenSSH`
   - `ufw allow 'Nginx Full'`
   - `ufw enable`
   - `ufw status`

## 10) Verify deployment

1. Open your domain in browser.
2. Confirm pages load and API routes work.
3. Check logs if needed:
   - `pm2 logs zar-jewels`
   - `tail -f /var/log/nginx/error.log`

## 11) Future updates (new code deployment)

1. Pull latest code:
   - `cd /var/www/zar`
   - `git pull origin main`
2. Reinstall (if lockfile changed):
   - `npm ci`
3. Rebuild:
   - `npm run build`
4. Restart app:
   - `pm2 restart zar-jewels`

## Common troubleshooting

1. Build fails:
   - Run `npm ci` again, then `npm run build`.
   - Check Node version (`node -v`) and use Node 20 LTS.
2. 502 Bad Gateway in Nginx:
   - Ensure PM2 app is running on port 3000.
   - Check `pm2 logs zar-jewels`.
3. Domain not opening:
   - Verify DNS A record points to server IP.
   - Confirm firewall and Nginx are active.

## Recommended production checklist

1. Keep `.env.production` backed up securely.
2. Enable automatic security updates.
3. Set up server backup snapshots.
4. Monitor uptime (UptimeRobot or similar).
5. Rotate logs and monitor disk usage.
