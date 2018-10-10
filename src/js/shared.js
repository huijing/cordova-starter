// Shared functions
function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else if (!hasClass(el, className)) el.className += ' ' + className
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className)
  }
  else if (hasClass(el, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

function order(a, b) {
  return a < b ? -1 : (a > b ? 1 : 0);
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function onBackKeyDown() {
  window.history.back();
}

function reloadBtnHandler() {
  window.location.reload(true);
}
