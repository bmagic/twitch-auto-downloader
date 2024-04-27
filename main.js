/**
 * Importing required modules and libraries
 */
import util from 'util';
import randomstring from 'randomstring';
import { exec } from 'child_process';
import { AppTokenAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { EventSubHttpListener, EnvPortAdapter } from '@twurple/eventsub-http';

/**
 * The main function that initializes the Twitch auto-downloader
 */
async function main() {
  // Load environment variables from a .env file
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const userName = process.env.USERNAME;
  const token = process.env.TOKEN;
  const hostName = process.env.HOSTNAME;
  const port = process.env.PORT;

  // Create a new AppTokenAuthProvider
  const authProvider = new AppTokenAuthProvider(clientId, clientSecret);

  // Create a new ApiClient
  const apiClient = new ApiClient({ authProvider });
  const user = await apiClient.users.getUserByName(userName);

  // Generate a secret for the subscription
  const secret = randomstring.generate(50);

  // Create a new EventSubHttpListener and start it
  const listener = new EventSubHttpListener({
    apiClient,
    adapter: new EnvPortAdapter({
      hostName: hostName,
      port: port,
    }),
    secret: secret,
  });
  listener.start();
  console.log(
    `Listening on http://localhost:${port} for incoming events on ${hostName}...`
  );

  // Subscribe to the stream.online event
  listener.onStreamOnline(user.id, async (e) => {
    console.log(`${userName} went online, start recording...`);
    await runStreamLink(authProvider, userName);
  });
}

/**
 * Function to run the streamlink command and record the stream
 * @param {string} userName - The Twitch username
 * @param {string} token - The Twitch access token
 */
async function runStreamLink(userName, token) {
  const { stdout, stderr } = await util.promisify(exec)(
    `streamlink "--twitch-api-header=Authorization=OAuth ${token}" twitch.tv/${userName} best -o /files/{author}-{time:%Y%m%d%H%M%S}.ts`
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

try {
  await main();
} catch (e) {
  console.error(e);
}
