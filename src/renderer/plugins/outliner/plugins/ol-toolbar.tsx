import { ToolbarItemViewMode } from '../components/widget';

export function OlToolbarPlugin() {
  return {
    customizeToolbar(props, next) {
      const res = next();
      res.push({
        order: -1,
        element: ToolbarItemViewMode
      });
      return res;
    }
  };
}
