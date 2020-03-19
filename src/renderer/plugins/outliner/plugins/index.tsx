import { OlToolbarPlugin } from './ol-toolbar';
import { OlRenderPlugin } from './ol-render';
import { OlOpPlugin } from './ol-op';
import { ContextMenuPlugin } from './ol-context-menu';
import { OlLayoutPlugin } from './ol-layout';

export function OutlinerPlugin() {
  return [
    OlToolbarPlugin(),
    OlRenderPlugin(),
    OlOpPlugin(),
    ContextMenuPlugin(),
    OlLayoutPlugin()
  ];
}
