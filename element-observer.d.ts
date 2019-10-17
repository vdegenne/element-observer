interface ElementObserver {
    CHILD_LIST: 1;
    CHARACTER_DATA: 2;
    observe: Function;
}
declare const ElementObserver: ElementObserver;
export { ElementObserver };
