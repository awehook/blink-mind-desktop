import { ToolbarPlugin } from './toolbar';
import { RenderPlugin } from './ol-render';
import { OpPlugin } from './op';
import { ContextMenuPlugin } from './ol-context-menu';

export function OutlinerPlugin() {
  return [ToolbarPlugin(), RenderPlugin(), OpPlugin(), ContextMenuPlugin()];
}
