const ElementObserver = Object.assign({ CHILD_LIST: 1, CHARACTER_DATA: 2, observe: function (element, type = ElementObserver.CHILD_LIST, callback, subtree = ElementObserver.CHARACTER_DATA) {
        if (!element || element.nodeType !== 1) {
            throw new Error('element is no valid');
        }
        if (typeof type === 'function') {
            const _callback = callback;
            callback = type;
            type = this.CHILD_LIST;
            if (_callback) {
                subtree = _callback;
            }
        }
        if (typeof type === 'string') {
            type = {
                character_data: ElementObserver.CHARACTER_DATA,
                child_list: ElementObserver.CHILD_LIST
            }[type.toLocaleLowerCase()];
            if (!type) {
                throw new Error('the type is incorrect');
            }
        }
        if (!(typeof subtree === 'boolean')) {
            subtree = type === this.CHILD_LIST ? false : true;
        }
        if (!callback) {
            throw new Error('no callback');
        }
        // console.log(element, callback, type, subtree)
        const observer = new MutationObserver(mutations => {
            callback(mutations, element);
        });
        observer.observe(element, {
            characterData: type === this.CHARACTER_DATA,
            childList: type === this.CHILD_LIST,
            subtree
        });
        return observer;
    } }, MutationObserver);
// @ts-ignore
window.ElementObserver = ElementObserver;
export { ElementObserver };
