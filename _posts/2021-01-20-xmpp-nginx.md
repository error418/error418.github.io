---
layout: post
title:  NGINX as a reverse proxy for Prosody
date:   2021-01-20 10:04:00 +0100
categories: server
author: Michael Gerbig
cover: 
---


This article describes a simple setup to run Prosody's `mod_http_upload` behind a NGINX reverse proxy. You will need (some) knowledge about Prosody and NGINX to follow the steps described in this article.

First things first: Install Prosody according to the [Prosody documentation][prosody-install]


## Configuring Prosody

The following settings need to be present in your configuration (replace `example.com` with your domain):

```lua
--------------------------------------------------------------------
-- This config file is truncated and not complete and just contains
-- settings relevant to this article for better readability
--------------------------------------------------------------------

-- http connection settings
https_ports = { }
http_interfaces = { "127.0.0.1" }

VirtualHost "example.com"
disco_items = {
  { "jabber.example.com" },
}


Component "jabber.example.com" "http_upload"
  http_host = "jabber.example.com"
  http_external_url = "https://jabber.example.com/"

Component "muc.example.com" "muc"
modules_enabled = {
  "vcard_muc",
  "muc_mam",
}
```

Please make yourself familiar with the security and expiry-settings of Prosody, `muc` and `mod_http_upload`.


## NGINX Site configuration

We will use NGINX to serve all files. File uploads (PUT requests in this case) are passed to `mod_http_upload` using the `proxy_pass` directive.

Create a NGINX Site configuration file for Prosody in `/etc/nginx/sites-available/prosody` and symlink it from `/etc/nginx/sites-enabled/prosody`.
Replace `example.com` with your domain name.


```nginx
# Configuration for mod_http_upload
server {
    server_tokens off;              # hide server tokens
    server_name jabber.example.com; # subdomain for http upload

    listen 443 ssl;
    listen [::]:443 ssl;

    root /var/www/html;             # your default serving directory

    location /upload {
      proxy_buffering off;
      proxy_set_header Host $host;

      # pass PUT requests to mod_http_upload for processing
      if ($request_method = PUT) {
        proxy_pass http://127.0.0.1:5280;
      }

      alias /var/lib/prosody/http_upload;  # storage path of mod_http_upload. NGINX will serve these files to the clients.
    }

    client_max_body_size 10m;

    # certificate management here
}


# Optional http placeholder site for mod_muc subdomain
# You can remove this block if you do not want to deliver a page on the domain.
server {
    server_tokens off;           # hide server tokens
    server_name muc.example.com; # subdomain for MUC

    listen 443 ssl;
    listen [::]:443 ssl;

    root /var/www/html;          # your default serving directory

    # certificate management here
}
```

## Update permissions

At this point NGINX will not be able to read files in the Prosody data directory due to missing permissions.
We need to perform following steps to allow read access to the uploaded files written by `mod_http_upload` to the file upload directory:

1. Create Group for XMPP Web Data `www-data-xmpp`
2. Add `prosody` to group `www-data-xmpp`
3. Add NGINX User `www-data` to group `www-data-xmpp`
4. Modify directory owners


```bash
# create a dedicated group
groupadd www-data-xmpp

# add prosody to group
usermod -a -G www-data-xmpp prosody

# add www-data to grouo
usermod -a -G www-data-xmpp www-data

# change owner group of mod_http_upload directory
chgrp -R www-data-xmpp /var/lib/prosody/http_upload/

# change owner group of prosody file system storage
chgrp www-data-xmpp /var/lib/prosody

# set setgid flag for mod_http_upload directory
chmod g+s /var/lib/prosody/http_upload/
```

## Wrapping it up

1. Restart your prosody server `service prosody restart`
2. Reload your NGINX server `nginx -s reload`
3. Have fun



[prosody-install]: https://prosody.im/download/start