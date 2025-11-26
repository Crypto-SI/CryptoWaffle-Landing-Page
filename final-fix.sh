#!/bin/bash

# Create a more focused fix script that uploads directly from the correct local directory
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

# Navigate to images directory on server
send "cd /home/crypxjew/public_html/images/\r"
expect "sftp>"

# Navigate to local images directory
send "lcd out/images\r"
expect "sftp>"

# Upload using the correct filenames
send "put \"crypto waffle logo.webp\" crypto-waffle-logo.webp\r"
expect "sftp>"
send "put Cryptosi.jpg\r"
expect "sftp>"

# Ensure permissions are correct
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

# Now create an image test page to verify the images independently
cat > test-images.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Image Test</title>
    <style>
        body { font-family: sans-serif; margin: 20px; }
        .image-container { margin-bottom: 30px; }
        img { max-width: 300px; border: 1px solid #ccc; }
    </style>
</head>
<body>
    <h1>Image Test Page</h1>
    
    <div class="image-container">
        <h2>Logo Test</h2>
        <p>Original path: /images/crypto-waffle-logo.webp</p>
        <img src="/images/crypto-waffle-logo.webp" alt="Logo Test 1"><br>
        <p>Timestamp: <script>document.write(new Date().toISOString())</script></p>
    </div>
    
    <div class="image-container">
        <h2>Profile Image Test</h2>
        <p>Original path: /images/Cryptosi.jpg</p>
        <img src="/images/Cryptosi.jpg" alt="Profile Test 1"><br>
        <p>Timestamp: <script>document.write(new Date().toISOString())</script></p>
    </div>
    
    <div class="image-container">
        <h2>Alternative Image Test</h2>
        <p>Path with spaces: /images/crypto waffle logo.webp</p>
        <img src="/images/crypto waffle logo.webp" alt="Logo Test 2"><br>
        <p>Timestamp: <script>document.write(new Date().toISOString())</script></p>
    </div>

    <div class="image-container">
        <h2>Lowercase Test</h2>
        <p>Lowercase path: /images/cryptosi.jpg</p>
        <img src="/images/cryptosi.jpg" alt="Profile Test 2"><br>
        <p>Timestamp: <script>document.write(new Date().toISOString())</script></p>
    </div>
</body>
</html>
EOF

# Upload the test page
cat > upload-test.exp << 'EOF'
#!/usr/bin/expect -f

# Set variables
set password "uEugSce15Qjg"
set timeout 30

# Start sftp
spawn sftp -o "StrictHostKeyChecking=no" -P 21098 crypxjew@server133.web-hosting.com

# Wait for password prompt and send password
expect "password:"
send "$password\r"

# Wait for sftp prompt
expect "sftp>"

# Upload the test page
send "put test-images.html /home/crypxjew/public_html/test-images.html\r"
expect "sftp>"

# Exit SFTP
send "bye\r"
expect eof
EOF

chmod +x upload-test.exp
./upload-test.exp

# Clean up
rm -f fix-direct.exp upload-test.exp test-images.html

echo "Final fixes applied and image test page uploaded."
echo "Please visit https://cryptowaffle.fun/test-images.html to test the images independently."
echo "Then try clearing your browser cache (Ctrl+Shift+R or Cmd+Shift+R) and refreshing the original page."
echo "If the test page shows images but main site doesn't, check with browser developer tools for more details." 