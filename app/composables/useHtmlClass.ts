export function useHtmlClass() {
  const documentElement = document.documentElement

  const addClass = (className: string) => {
    documentElement.classList.add(className)
  };

  const removeClass = (className: string) => {
    documentElement.classList.remove(className)
  };

  const replaceClass = (oldClassName: string, newClassName: string) => {
    documentElement.classList.replace(oldClassName, newClassName)
  };

  const getClasses = () => {
    return documentElement.classList
  };

  return { addClass, removeClass, replaceClass, getClasses };
}