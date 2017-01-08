FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

# Install let's encrypt agent
RUN echo deb http://ftp.debian.org/debian jessie-backports main >> /etc/apt/sources.list \
    && apt-get update \
    && apt-get install certbot -y -t jessie-backports

COPY conf /etc/nginx

# RUN mkdir /usr/share/nginx/html/.well-known

COPY encrypt-script.sh /usr/local/bin/

EXPOSE 80

# Install letsencrypt
# Note: Latest version may be found on:
# https://aur.archlinux.org/packages/kubectl-bin/
ADD https://storage.googleapis.com/kubernetes-release/release/v1.5.1/bin/linux/amd64/kubectl /usr/local/bin/kubectl

ENV HOME=/config

RUN set -x && \
    apt-get install -y curl ca-certificates && \
    chmod +x /usr/local/bin/kubectl && \
    # Basic check it works.
    kubectl version --client


ENTRYPOINT ["/usr/local/bin/kubectl"]