#!/bin/bash

# Create an expect script to create a lowercase copy of the profile image
cat > lowercase-fix.exp << 'EOF'
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

# Create a lowercase copy of the profile image
send "cd /home/crypxjew/public_html/images/\r"
expect "sftp>"
send "get Cryptosi.jpg /tmp/cryptosi.jpg\r"
expect "sftp>"
send "put /tmp/cryptosi.jpg\r"
expect "sftp>"
send "chmod 644 cryptosi.jpg\r"
expect "sftp>"

# Exit SFTP
send "bye\r"
expect eof
EOF

chmod +x lowercase-fix.exp
./lowercase-fix.exp
rm lowercase-fix.exp

echo "Added lowercase version of the profile image. All images should now display correctly."
echo "Remember to clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R) if necessary." 