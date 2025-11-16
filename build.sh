#!/bin/bash

APP_NAME="olx-fe-web-app"

echo "🔄 Pulling latest code..."
git pull

echo "🛑 Stopping PM2 app if running..."
pm2 stop $APP_NAME 2>/dev/null
pm2 delete $APP_NAME 2>/dev/null

echo "🚀 Starting Angular dev server with PM2..."
pm2 start "npm run start" --name "$APP_NAME"

echo "💾 Saving PM2 state..."
pm2 save

echo "✅ Deployment completed! App running under PM2 as: $APP_NAME"
pm2 list
