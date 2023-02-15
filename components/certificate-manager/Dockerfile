FROM certbot/certbot:v2.2.0

WORKDIR /opt/certbot

COPY ./create.sh ./
RUN chmod u+x ./create.sh

COPY ./initialize.sh ./
RUN chmod u+x ./initialize.sh

EXPOSE 80
ENTRYPOINT ["sh"]
