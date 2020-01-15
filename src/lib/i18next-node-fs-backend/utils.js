export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return (key && key.indexOf('###') > -1) ? key.replace(/###/g, '.') : key;
  }

  let stack = (typeof path !== 'string') ? [].concat(path) : path.split('.');
  while(stack.length > 1) {
    if (!object) return {};

    let key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    object = object[key];
  }

  if (!object) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

export function setPath(object, path, newValue) {
  let { obj, k } = getLastOfPath(object, path, Object);

  obj[k] = newValue;
}

export function pushPath(object, path, newValue, concat) {
  let { obj, k } = getLastOfPath(object, path, Object);

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}

export function getPath(object, path) {
  let { obj, k } = getLastOfPath(object, path);

  if (!obj) return undefined;
  return obj[k];
}
