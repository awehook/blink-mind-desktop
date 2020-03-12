import { ToolbarPlugin } from './toolbar';
import { RenderPlugin } from './ol-render';
import { OpPlugin } from './op';

export function OutlinerPlugin() {
  return [ToolbarPlugin(), RenderPlugin(), OpPlugin()];
}
