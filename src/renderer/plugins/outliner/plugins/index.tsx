import { ToolbarPlugin } from './toolbar';
import { RenderPlugin } from './ol-render';

export function OutlinerPlugin() {
  return [
    ToolbarPlugin(),
    RenderPlugin()
  ];
}
