# ElementObserver

Element similar to MutationObserver but more easy to use.

## usage

Include the script in the page

```html
<script type="module" src="/node_modules/element-observer.js"></script>
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

By default the observer only watches the children of the element.  
To watch the subtree pass `true` to the 3rd argument :

```javascript
ElementObserver.observe(
  elementToWatch,
  (mut, el) => { /* callback */ },
  true
)
```

### child_list & character_data

By default the observer only responds when nodes are added or removed.  
If you want to watch for textual changes only provide the type as the 2nd argument :

```javascript
/* character data */
ElementObserver.observe(elementToWatch, ElementObserver.CHARACTER_DATA, callback)
// same as
ElementObserver.observe(elementToWatch, 'character_data', callback)
// same as
ElementObserver.observe(elementToWatch, 2, callback)

/* child list (default) */
ElementObserver.observe(elementToWatch, ElementObserver.CHILD_LIST, callback)
// same as
ElementObserver.observe(elementToWatch, 'child_list', callback)
// same as
ElementObserver.observe(elementToWatch, 1, callback)
// same as
ElementObserver.observe(elementToWatch, callback) // default
```

## Installation

```npm i element-observer```