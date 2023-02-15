FROM certbot/certbot:v2.2.0

WORKDIR /opt/certbot

COPY ./create.sh ./
RUN chmod u+x ./create.sh

COPY ./update.sh ./
RUN chmod u+x ./update.sh

EXPOSE 80
ENTRYPOINT ["sh"]
