//Вспомогательный класс для управления базой данных
export default class IndexedDB{
    constructor(){
        this._db = null;
    }
    //имя базы данных, версия, 
    open(name, version){
        return new Promise((resolve, reject) => {
            let openRequest = indexedDB.open(name, version);
            this._openRequest= openRequest;

            openRequest.onupgradeneeded = () =>{
                console.log("Базы данных нет, или надо обновлять");
                this._db = openRequest.result;
                if (!this._db.objectStoreNames.contains(name)) { // если хранилище "books" не существует
                    console.log("создаем хранилище");
                    this._db.createObjectStore(name, {keyPath: 'id'}); // создаем хранилище
                }
            };

            openRequest.onerror = ()=> {
                console.error("Error", openRequest.error);
                reject();
            };
            
            openRequest.onsuccess = ()=> {
                this._db = openRequest.result;
                // продолжить работу с базой данных, используя объект db
                console.log("Все ok ! Можно работать с БД");
                // console.log(this._db);
                resolve();
            };
        });
    }
    save(storageName, obj) {
        return new Promise((resolve, reject) => {
            let transaction = this._db.transaction(storageName, "readwrite"); 
            let storage = transaction.objectStore(storageName); 
            let request = storage.put(obj);

            request.onsuccess = function() {
                resolve();
            };
            request.onerror = function() {
                console.log("Ошибка", request.error);
                reject();
            };
        });
    }
    getByKey(key, storageName){
        return new Promise((resolve, reject) => {
            let transaction = this._db.transaction(storageName, "readwrite"); 
            let storage = transaction.objectStore(storageName); 
            let request = storage.get(key);
            request.onsuccess = function() {
                // console.log(`Ура, мы достали ${request.result} из хранилища`, storageName);
                resolve(request.result);
            };
            request.onerror = function() {
                console.log("Ошибка", request.error);
                reject();
            }
        });  
    }
}

//БД - canvasDB
//Хранилище canvasDB
// id: imageData обьект с текущей картинкой