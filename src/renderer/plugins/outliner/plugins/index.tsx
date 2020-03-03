import { ToolbarPlugin } from './toolbar';
import { RenderPlugin } from './render';

export function OutlinerPlugin() {
  return [
    ToolbarPlugin(),
    RenderPlugin()
  ];
}
