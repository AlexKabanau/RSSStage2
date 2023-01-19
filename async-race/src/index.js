// eslint-disable-next-line import/extensions, import/no-unresolved
import { listen, render, updateStateGarage } from './pages/app/ui';

render();
await updateStateGarage();
listen();
