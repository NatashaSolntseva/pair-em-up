import { renderGameScreen } from './screens/gameScreen';
import { renderNotFoundScreen } from './screens/notFoundScreen';
import { renderResultsScreen } from './screens/resultsScreen';
import { renderRulesScreen } from './screens/rulesScreen';
import { renderSettingsScreen } from './screens/settingsScreen';
import { renderStartScreen } from './screens/startScreen';
import { saveStore } from './state/saveStore';
import { clearContainer } from './utils/clearScreen';

export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}

function handleRouteChange() {
  const app = document.body;

  clearContainer(app);

  const hash = window.location.hash || '#/';
  const [_, route, param] = hash.split('/');

  let screen;
  switch (route) {
    case '':
      screen = renderStartScreen();
      break;
    case 'settings':
      screen = renderSettingsScreen();
      break;
    case 'results':
      screen = renderResultsScreen();
      break;
    case 'rules':
      screen = renderRulesScreen();
      break;
    case 'game': {
      const rawMode = param || 'classic';
      const mode = rawMode.split('?')[0];
      const load = hash.includes('load=true');

      if (load) {
        const save = saveStore.load(mode);
        if (save) {
          screen = renderGameScreen(mode, save);
        } else {
          screen = renderGameScreen(mode);
        }
      } else {
        screen = renderGameScreen(mode);
      }
      break;
    }
    default:
      screen = renderNotFoundScreen();
  }

  if (screen) app.append(screen);
}
