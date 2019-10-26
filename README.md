# ElementObserver

Element similar to MutationObserver but more easy to use.

## usage

Include the script in the page

```html
<script type="module" src="/node_modules/element-observer/element-observer.js"></script>
```

then on one of your element

```javascript
const elementToWatch = document.getElementById('myElement')
const observer = ElementObserver.observe(elementToWatch, (mutations, element) => {
  console.log(`myElement changed`)
})
```

### disconnecting
```javascript
observer.disconnect()
```

### subtree

By default the callback (*2nd argument*) is called everytime the children of the element (*1st argument*) change, that is when new children are added or existing children are removed.  
If you wish to watch the children of the children recursively (all the subtree), pass `true` as the last argument :

```javascript
ElementObserver.observe(
  elementToWatch,
  (mut, el) => { /* callback */ },
  true
)
```

### child_list & character_data

By default the observer only reacts when nodes are added or removed (as stated above).  
If you wish to watch for textual changes only provide the type as the 2nd argument :

```javascript
ElementObserver.observe(
  elementToWatch,
  ElementObserver.CHARACTER_DATA,
  (mut, el) => {
    /* called everytime text changes in the element */
  }
)
```

*NOTICE: the last argument is omitted and implicitily `true` when using `character_data` because internally `MutationObserver` expects a text node to be provided.  
If you want to prevent all the subtree to be watched you will have to provide `false` for the last argument and a text node as the first argument.*

## Summary

```javascript
/* CHARACTER DATA */
ElementObserver.observe(elementToWatch, ElementObserver.CHARACTER_DATA, callback, true) // subtree: true
// same as
ElementObserver.observe(elementToWatch, ElementObserver.CHARACTER_DATA, callback) // subtree: true
// same as
ElementObserver.observe(elementToWatch, 'character_data', callback) // short version (string)
// same as
ElementObserver.observe(elementToWatch, 2, callback) // short version (number)

/* CHILD LIST (default) */
ElementObserver.observe(elementToWatch, ElementObserver.CHILD_LIST, callback, false) // subtree: false
// same as
ElementObserver.observe(elementToWatch, ElementObserver.CHILD_LIST, callback) // subtree: false
// same as
ElementObserver.observe(elementToWatch, 'child_list', callback) // short version (string)
// same as
ElementObserver.observe(elementToWatch, 1, callback) // short version (number)
// same as
ElementObserver.observe(elementToWatch, callback) // default very short version
```

## Installation

```npm i element-observer```