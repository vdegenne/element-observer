interface ElementObserver {
  CHILD_LIST: 1
  CHARACTER_DATA: 2
  observe: ((element:HTMLElement, type:number|string, callback:Function, subtree?:boolean|number) => MutationObserver) | ((element:HTMLElement, callback:Function, subtree?:boolean|number) => MutationObserver)
}

export const ElementObserver: ElementObserver = {
  CHILD_LIST: 1,
  CHARACTER_DATA: 2,
  observe: function(
    element: HTMLElement,
    type: number | string = ElementObserver.CHILD_LIST,
    callback: Function,
    subtree: boolean | number = ElementObserver.CHARACTER_DATA
  ) {
    if (!element || element.nodeType !== 1) {
      throw new Error('element is no valid')
    }
    if (typeof type === 'function') {
      const _callback = callback
      callback = type
      type = this.CHILD_LIST
      if (_callback) {
        subtree = <boolean | number>(<unknown>_callback)
      }
    }
    if (typeof type === 'string') {
      type = <number>(<any>{
        character_data: ElementObserver.CHARACTER_DATA,
        child_list: ElementObserver.CHILD_LIST
      })[<string>type.toLocaleLowerCase()]

      if (!type) {
        throw new Error('the type is incorrect')
      }
    }
    if (!(typeof subtree === 'boolean')) {
      subtree = type === this.CHILD_LIST ? false : true
    }
    if (!callback) {
      throw new Error('no callback')
    }

    // console.log(element, callback, type, subtree)
    const observer = new MutationObserver(mutations => {
      callback(mutations, element)
    })
    observer.observe(element, {
      characterData: type === this.CHARACTER_DATA,
      childList: type === this.CHILD_LIST,
      subtree
    })

    return observer
  },
  ...MutationObserver
}
