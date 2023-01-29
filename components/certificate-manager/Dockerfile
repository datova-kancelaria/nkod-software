FROM certbot/certbot:v2.2.0

WORKDIR /opt/certbot

COPY ./initialize.sh ./
RUN chmod u+x ./initialize.sh

COPY ./update.sh ./
RUN chmod u+x ./update.sh

EXPOSE 80
ENTRYPOINT ["bash"]
