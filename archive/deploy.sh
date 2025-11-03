#!/bin/bash

# FTP Deployment Script for Allostasis
# Uploads the /out folder contents to Namecheap hosting

# Load environment variables
source .env.local

echo "🚀 Starting deployment to Namecheap hosting..."

# Use lftp to upload files
lftp -c "
set ssl:verify-certificate no
set ftp:ssl-allow yes
set ftp:ssl-force yes
set ftp:ssl-protect-data yes
open -u $NAMECHEAP_FTP_USERNAME,$NAMECHEAP_FTP_PASSWORD ftpes://server113.web-hosting.com:21
mirror --reverse --delete --verbose --parallel=4 ./out/ /public_html/
bye
"

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at https://allostasis.ai"