// eslint-disable-next-line import/extensions, import/no-unresolved
import { render, updateStateGarage } from './app/ui';
import listen from './app/handlers';

render();
await updateStateGarage();
listen();
