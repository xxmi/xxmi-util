import qs from 'qs';

function query() {
  return qs.parse(location.search);
}

export {
  query,
};
export default {
  query,
};
