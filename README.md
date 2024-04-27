# twitch-auto-downloader
This program allows you to monitor a Twitch channel and automatically trigger the recording of it using streamlink when it goes live.

# Utilisation 
 1. Create a twitch application https://dev.twitch.tv/console/apps and get the CLIENT_ID, CLIENT_SECRET and URL. 
 2. To get Authorization token, connect on twitch website and open the browser's console on page and run `document.cookie.split("; ").find(item=>item.startsWith("auth-token="))?.split("=")[1]`
 3. Run docker 
```
docker run -v /[YOURLOCALPATH]:/files -p 8080:8080 -e CLIENT_ID=[CLIENT_ID] -e CLIENT_SECRET=[CLIENT_SECRET] -e USERNAME=[CHANNEL_NAME] -e HOSTNAME=[URL] -e PORT=8080 -e TOKEN=[TOKEN] bmagic/twitch-auto-downloader:0.0.2
```
 4. Then, you need to redirect the URL https://[URL] to port http 8080 of your docker. This docker need to be used behind a reverse proxy with a valid certificate.