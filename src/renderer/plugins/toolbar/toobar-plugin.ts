import { ToolbarItemTheme } from './toolbar-item-theme';

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
