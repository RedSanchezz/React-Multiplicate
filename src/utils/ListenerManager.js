

//класс для управления слушателями событий
// нужен для того, что бы сохранять слушатели
export default class ListenerManager{

    constructor(listenersArr){
        this._listeners = listenersArr;
    }

    addListener(element, event, func){
        let obj = {
            element,
            event,
            func
        }
        this._listeners.push(obj);
        element.addEventListener(event, func);
    }
    removeLastListener(){
        let obj= this._listeners.pop();
        obj.element.removeEventListener(obj.event, obj.func);
    }
    removeListenersByEvent(element, event){
        for(let i=0; i< this._listeners.length; i++){
            if(this._listeners[i].event===event && this._listeners[i].element===element){
                let obj = this._listeners[i];
                obj.element.removeEventListener(obj.event, obj.func);
                this._listeners.splice(i, 1);
            }
        }
    }
    removeListener(element, event, func){
        for(let i=0; i< this._listeners.length; i++){
            if(this._listeners[i].event===event 
                && this._listeners[i].element===element 
                && JSON.stringify(this._listeners[i].func)===JSON.stringify(func)){
                    let obj = this._listeners[i];
                    obj.element.removeEventListener(obj.event, obj.func);
                    this._listeners.splice(i, 1);
            }
        }
    }
    removeAllListener(){
        while(this._listeners.length!=0){
            let obj= this._listeners.pop();
            obj.element.removeEventListener(obj.event, obj.func);
        }
    }
}