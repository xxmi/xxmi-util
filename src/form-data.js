export default function (obj) {
  const map = {};
  const iteration = (data, parentKey = '') => {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          const mapKey = `${parentKey}[${i}]`;
          if (typeof item === 'object' || Array.isArray(item)) {
            iteration(item, mapKey);
          } else {
            map[mapKey] = item;
          }
        }
      }
    } else if (typeof data === 'object' && Object.keys(data).length > 0) {
      for (const [key, value] of Object.entries(data)) {
        const mapKey = parentKey !== '' ? `${parentKey}.${key}` : key;
        if ((typeof value === 'object' && !(value instanceof File)) || Array.isArray(value)) {
          iteration(value, mapKey);
        } else {
          map[mapKey] = value;
        }
      }
    }
  };
  iteration(obj);
  const formData = new window.FormData();
  for (const [key, value] of Object.entries(map)) {
    formData.append(key, value);
  }
  return formData;
}
