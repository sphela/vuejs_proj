server {
    listen 443 default_server;
    server_name www.sphela.com;
    sendfile        on;
    keepalive_timeout  65;
    server_name    localhost;
    root   /usr/share/nginx/html;

    # Until the good ssl is working with lets encrypt do just basic ssl:

    ssl on;
    server_name         www.sphela.com;
    ssl_certificate /etc/letsencrypt/live/certs/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/certs/privkey.pem;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;

    ssl_prefer_server_ciphers on;
    ssl_ecdh_curve secp384r1; # Requires nginx >= 1.1.0
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off; # Requires nginx >= 1.5.9
    ssl_stapling on; # Requires nginx >= 1.3.7
    ssl_stapling_verify on; # Requires nginx => 1.3.7

    # To turn this on and remove the above once let's encrypt actually works:
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_dhparam /etc/letsencrypt/live/dhparam/dhparam.pem;

    resolver_timeout 5s;
    ssl_session_timeout 5m;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;

    gzip on;

    gzip_http_version 1.1;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_proxied any;
    gzip_types  text/plain
                text/html
                text/css
                application/json
                application/x-javascript
                text/xml
                application/xml
                application/xml+rss
                text/javascript
                application/javascript
                text/x-js;
    gzip_buffers 16 8k;

    location /static {
        etag on;
        expires 1y;
        add_header Cache-Control "public";
        root /www/sphela/app;
    }

    location / {
        proxy_pass http://app:9100;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header Connection "";
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
        send_timeout 300;
    }
}

server {

    sendfile on;
    keepalive_timeout 65;
    listen 80;
    server_name www.sphela.com;
    root /usr/share/nginx/html;

    location ~ /.well-known {
        proxy_pass http://letsencrypt:80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    location / {
        return         301 https://$server_name$request_uri;
    }
}