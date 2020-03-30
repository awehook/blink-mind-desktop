import { OlToolbarPlugin } from './ol-toolbar';
import { OlRenderPlugin } from './ol-render';
import { OlOpPlugin } from './ol-op';
import { OlContextMenuPlugin } from './ol-context-menu';
import { OlLayoutPlugin } from './ol-layout';
import { OlHotKeyPlugin } from './ol-hotkey';

export function OutlinerPlugin() {
  return [
    OlToolbarPlugin(),
    OlRenderPlugin(),
    OlOpPlugin(),
    OlContextMenuPlugin(),
    OlLayoutPlugin(),
    OlHotKeyPlugin()
  ];
}
