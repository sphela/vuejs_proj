#!/usr/bin/env bash

nginx
certbot certonly --quiet --webroot --agree-tos -d www.sphela.com --webroot-path /usr/share/nginx/html
if (( $? > 0 ));
then
    echo "Job failed because of some certbot error"
    exit 0
fi
kubectl delete secret letsencrypt
cd /etc/letsencrypt/live/www.sphela.com/

# Just using a directory with --from-file should work but doesn't, so listing each file.
 kubectl create secret generic letsencrypt \
     --from-file=/etc/letsencrypt/live/www.sphela.com/cert.pem \
     --from-file=/etc/letsencrypt/live/www.sphela.com/chain.pem \
     --from-file=/etc/letsencrypt/live/www.sphela.com/fullchain.pem \
     --from-file=/etc/letsencrypt/live/www.sphela.com/privkey.pem \
     --from-file=/etc/letsencrypt/live/www.sphela.com/dhparam.pem

# This is temporary to help with debugging certbot for now.
sleep 4000