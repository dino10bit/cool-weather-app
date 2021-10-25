import { messages } from './core/messages';
import { run } from './core/cli';
import { checkEnvVariables } from './services/configService';

if (checkEnvVariables) {
  messages.welcome();
  run().then();
}
