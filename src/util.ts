import { keys, filter, pick, equals, compose, isEmpty, isNil } from 'ramda';
import env from './env';
/**
 * Empty function.
 * Points to nothing.
 * Runs nothing.
 */
export const limbo = () => {};

/**
 * Calls an function.
 * @param {Function} fn Function to call.
 * @return {*} Returns of fn execution. 
 */
export const invoke = <T extends CallableFunction>(fn: T) => fn();

/**
 * Receives and value and returns it.
 * @param {*} i Item. 
 * @return {*} Item.
 */
export const identity = <T>(i: T) => i;

/**
 * @param {*} obj Any object that have an id.
 * @return Id value or obj otherwise.
 */
export const id = <T extends {id: string}>(obj: T) => ((obj || {}).id || obj);

/**
 * Curries an function to compare another items (j) to an item (i) by id property.
 * Ex:
 * const foo = { id: 'foo' }
 * const foo2 = { id: 'foo' }
 * const bar = { id: 'bar' }
 * const cmpFoo = byId(foo)
 * cmpFoo(foo2) // true
 * cmpFoo(bar) // false
 * cmpFoo(null) // false
 * 
 * @param {*} i Item comparable.
 * @return {Function} function to compare another items (j) to an item (i).
 */
export const byId = <T extends {id: string}>(i: T) => <J extends {id: string}>(j:J) => id(i) === id(j);

/**
 * Curries an function to invert your value.
 * Ex:
 * const fn = () => true;
 * const notFn = not(fn);
 * notFn() // false
 * not(notFn)() // true
 * 
 * @param {Function} fn Function to invert.
 * @return {Function} inverse of function.
 */
export const not = <T extends CallableFunction>(fn: T) => (...args: any) => !fn(...args);

/**
 * Converts a value to a integer.
 * Created to avoid pass '10' in every convertion.
 * @param {*} value A value.
 */
export const toInt = (value: string) => parseInt(value, 10);

export const isArray = (value: any) => value instanceof Array;

/**
 * Removes an item from an list based on your id property.
 * @param {Array} list List to remove from.
 * @param {Object} item Item to remove.
 * @return {Array} A new list without item (if exists).
 */
export const removeById = <F extends {id: string}>(list: Array<F>, item: F, idFn = byId) => 
  (list || []).filter(not(idFn(item)));

/**
 * Repalces an item from an list based on your id property.
 * @param {Array} list List to replace in.
 * @param {Object} item Item to replace.
 * @return {Array} A new list with items replaced if id match occurs.
 */
export const replaceById = <F extends {id: string}>(list: Array<F>, item: F) => 
  (list || []).map((jtem: F) => (id(jtem) === id(item) && item) || jtem);

/** 
 * Works like replaceById, but instead of replace totally, 
 * it spread properties (merge).
 * @param {Array} list List to spread in.
 * @param {Object} item Item to spread.
 * @return {Array} A new list with items updated if id match occurs.
*/
export const spreadById = <F extends {id: string}>(list: Array<F>, item: F) =>
  (list || []).map((jtem: F) => (id(jtem) === id(item) && {...jtem, ...item}) || jtem);

/**
 * Computes the difference from one object to another.
 * Ex:
 * objectDiff({a: 2}, {a: 3}) // {a: 2}
 * objectDiff({a: 3}, {b: 4}) // {a: 3}
 * objectDiff({}, {o: 9}) // {}
 * @param {Object} from Origin of analysis.
 * @param {Object} to Use to check.
 * @return {Object} Object that contains the differences { prop: value of from }.
 */
type GenericObject = { [key: string]: any };
export const objectDiff = (from: GenericObject, to: GenericObject) => {
  const eq = (k: number) => equals(from[k], to[k]);
  const pickFrom = (keys: readonly number[]) => pick(keys, from);
  return compose(
    pickFrom,
    filter(not(eq)),
    keys
  )(from)
};

/**
 * Throws an exception when argument is not present.
 * 
 * Hot to user:
 * const method = ( arg = requiredArg('arg') ) => doStuff(arg);
 * 
 * @param {String} argName Name of argument. 
 */
export const requiredArg = (argName: string | 'argument'): Error => {
  throw new Error(`${argName} is required`);
};

/**
 * @param {string} path Path to be relative.
 * @return A relative path based on a base taked from environment.
 */
export const relativePath = path => `${env.basename || ''}${
  path && ( (path.charAt(0) === '/' && path) || `/${path}` )
}`;

/**
 * @param {string} rawBase64 Base 64 string with extension.
 * @return An object with extension and a clean base64 of image.
 */
export const parseBase64 = (rawBase64: string) => {
  const arr: string[] = rawBase64.split(',')
  const match = arr[0].match(/:(.*?);/)
  const extension = match && match[1]
  const base64 = arr[1]
  return { base64, extension }
}

export function isNilOrEmpty(value: any) { 
  return isNil(value) || isEmpty(value)
}