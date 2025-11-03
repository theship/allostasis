#!/bin/bash

# Verbose FTP Deployment Script for Allostasis
# With detailed debugging and error checking

echo "========================================="
echo "🚀 ALLOSTASIS DEPLOYMENT SCRIPT"
echo "========================================="
echo ""

# FTP credentials (hardcoded for now to avoid parsing issues)
FTP_USER="allovhac"
FTP_PASS="*i*619tUXXRdi^2"
FTP_HOST="server113.web-hosting.com"
FTP_PORT="21"

echo "📋 Deployment Configuration:"
echo "  Host: $FTP_HOST"
echo "  Port: $FTP_PORT"
echo "  User: $FTP_USER"
echo "  Source: ./out/"
echo "  Destination: /public_html/"
echo ""

# Check if out directory exists
if [ ! -d "./out" ]; then
    echo "❌ ERROR: ./out directory not found!"
    echo "Please run 'npm run build' first"
    exit 1
fi

echo "📁 Files to upload:"
ls -la ./out/ | head -10
echo "  ... and more"
echo ""

echo "🔌 Testing FTP connection..."
echo "========================================="

# Test connection and list remote directory
lftp -c "
set ssl:verify-certificate no
set ftp:ssl-allow yes
set ftp:ssl-force no
set ftp:ssl-protect-data yes
set ftp:list-options -a
set net:timeout 10
set net:max-retries 3
set net:reconnect-interval-base 5
set xfer:clobber on
set cmd:trace on
set cmd:verbose yes
set log:enabled yes
open -u '$FTP_USER','$FTP_PASS' ftp://$FTP_HOST:$FTP_PORT || exit 1
echo '✅ Connected successfully!'
echo ''
echo '📂 Current remote directory contents:'
pwd
ls -la public_html/ | head -5
echo ''
echo '🚀 Starting upload...'
echo '========================================='
cd public_html || exit 1
echo 'Changed to public_html directory'
pwd
echo ''
echo 'Uploading files (this may take a few minutes)...'
mirror --reverse \
       --delete \
       --verbose \
       --parallel=2 \
       --log=/tmp/lftp-log.txt \
       --include-glob='*.html' \
       --include-glob='*.css' \
       --include-glob='*.js' \
       --include-glob='*.svg' \
       --include-glob='*.png' \
       --include-glob='*.ico' \
       --include-glob='*.txt' \
       --include-glob='*.json' \
       --include-glob='*.woff2' \
       ./out/ ./
echo ''
echo '📊 Verifying upload...'
ls -la | head -10
echo ''
echo '✅ Upload complete!'
bye
" 2>&1

RESULT=$?

echo ""
echo "========================================="

if [ $RESULT -eq 0 ]; then
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo ""
    echo "🌐 Your site should be live at:"
    echo "   https://allostasis.ai"
    echo ""
    echo "📝 Log file saved to: /tmp/lftp-log.txt"
    echo "   View with: cat /tmp/lftp-log.txt"
else
    echo "❌ DEPLOYMENT FAILED!"
    echo ""
    echo "Error code: $RESULT"
    echo ""
    echo "Common issues:"
    echo "  - Check FTP credentials"
    echo "  - Verify network connectivity"
    echo "  - Ensure public_html directory exists"
    echo ""
    echo "Check log: cat /tmp/lftp-log.txt"
fi

echo "========================================="