import {foo} from './export1';

console.log(foo);

setTimeout(() => {
  console.log(foo);

}, 2000);