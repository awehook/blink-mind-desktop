import { ToolbarItemTheme } from './toolbar-item-theme';
import './toolbar.css';

export function ToolbarPlugin() {
  return {
    customizeToolbar(props, next) {
      const res = next();
      res.push({
        order: 1,
        element: ToolbarItemTheme
      });
      return res;
    }
  };
}
