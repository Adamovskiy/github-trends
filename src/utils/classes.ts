/**
 * Shorthand for conditionally adding a CSS class.
 * @param condition - Truthy value adds a class.
 * @param className - CSS class name.
 * @return CSS class name string, or empty string if condition is falsy.
 */
export function clsIf(condition: any, className: string) {
  return !!condition ? className : '';
}

/**
 * Shorthand for combining multiple CSS class names into a string.
 * Falsy class names are skipped - this is useful for using with clsIf.
 * @param classNames List of CSS names to join.
 * @return Joined string that is used in className attribute.
 */
export function clss(...classNames: (string | undefined)[]) {
  return classNames.filter((val) => val).join(' ')
}