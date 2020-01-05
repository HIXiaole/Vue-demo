
import { getConnection } from "typeorm";
// import { mysql } from "../conf/configs";



/**
 * typeOrm 清除缓存
 *
 * @export
 * @class Cache
 */
export class Cache {

    static clear(name: string) {
        getConnection().queryResultCache.remove([name]);
    }

    static clearAll() {
        getConnection().queryResultCache.clear();
    }

}