#!/bin/bash

# Create a script to verify the image files and check their permissions
cat > verify.exp << 'EOF'
#!/usr/bin/expect -f

# Set variables
set password "uEugSce15Qjg"
set timeout 60

# Start sftp
spawn sftp -o "StrictHostKeyChecking=no" -P 21098 crypxjew@server133.web-hosting.com

# Wait for password prompt and send password
expect "password:"
send "$password\r"

# Wait for sftp prompt
expect "sftp>"

# Navigate to images directory
send "ls -la /home/crypxjew/public_html/images/\r"
expect "sftp>"

# Try downloading the problematic images to verify they exist
send "get /home/crypxjew/public_html/images/crypto-waffle-logo.webp /tmp/test-logo.webp\r"
expect "sftp>"
send "get /home/crypxjew/public_html/images/Cryptosi.jpg /tmp/test-profile.jpg\r"
expect "sftp>"

# Get the HTML file to check references
send "get /home/crypxjew/public_html/index.html /tmp/index.html\r"
expect "sftp>"

# Exit SFTP
send "bye\r"
expect eof
EOF

chmod +x verify.exp
./verify.exp

# Check if the test files were successfully downloaded
echo "Checking if files were successfully downloaded..."
if [ -f "/tmp/test-logo.webp" ]; then
    echo "Logo file exists on server"
    file_size=$(stat -f%z "/tmp/test-logo.webp")
    echo "Logo file size: $file_size bytes"
else
    echo "ERROR: Logo file not found on server or couldn't be downloaded"
fi

if [ -f "/tmp/test-profile.jpg" ]; then
    echo "Profile image exists on server"
    file_size=$(stat -f%z "/tmp/test-profile.jpg")
    echo "Profile image size: $file_size bytes"
else
    echo "ERROR: Profile image not found on server or couldn't be downloaded"
fi

# Extract and check image references in HTML
echo "Checking image references in HTML..."
grep -o 'src="/images/[^"]*"' /tmp/index.html | head -10

# Try a more direct approach - upload local images with renamed files
cat > fix-direct.exp << 'EOF'
#!/usr/bin/expect -f

# Set variables
set password "uEugSce15Qjg"
set timeout 60

# Start sftp
spawn sftp -o "StrictHostKeyChecking=no" -P 21098 crypxjew@server133.web-hosting.com

# Wait for password prompt and send password
expect "password:"
send "$password\r"

# Wait for sftp prompt
expect "sftp>"

# Navigate to images directory 
send "cd /home/crypxjew/public_html/images/\r"
expect "sftp>"

# Ensure proper permissions (-rw-r--r--)
send "chmod 644 *\r"
expect "sftp>"

# Upload the logo and profile images again directly from local files
send "lcd ../../out/images\r"
expect "sftp>"

# Upload using the correct filenames
send "put \"crypto waffle logo.webp\" crypto-waffle-logo.webp\r"
expect "sftp>"
send "put Cryptosi.jpg\r"
expect "sftp>"

# Set appropriate permissions
send "chmod 644 crypto-waffle-logo.webp\r"
expect "sftp>"
send "chmod 644 Cryptosi.jpg\r"
expect "sftp>"

# Exit SFTP
send "bye\r"
expect eof
EOF

chmod +x fix-direct.exp
./fix-direct.exp

# Clean up
rm -f verify.exp fix-direct.exp /tmp/test-logo.webp /tmp/test-profile.jpg /tmp/index.html

echo "Image files were re-uploaded directly from local source with proper permissions."
echo "Try clearing your browser cache (Ctrl+Shift+R or Cmd+Shift+R) and refreshing the page." 