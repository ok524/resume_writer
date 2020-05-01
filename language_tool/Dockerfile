FROM openjdk:15
WORKDIR /app
COPY . ./
CMD java -cp languagetool-server.jar org.languagetool.server.HTTPServer --port 8081 --allow-origin "*" --public