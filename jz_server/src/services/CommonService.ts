

import { Utils } from './../utils';
import { AccountInfo } from './../entity/AccountInfo';
import { User } from './../entity/User';
import { Record } from '../entity/Record';
import { getRepository, LessThanOrEqual } from 'typeorm';
import { CustomError } from '../middleware/errorHandle';



// 数据公共服务层
export class CommonService {



    static async getUserInfo(account:string){
        let result = await getRepository(User).findOne({account:account});
        return result;
    }



    static async addRecord(records: Array<any>, userId: string){
        // getRepository()
        let data = [];
        records.forEach((item, index) => {
            data.push({
                userId,
                AccountType:item.AccountType,
                isIncome:item.isIncome,
                num:item.num,
                describe:item.describe,
                time:Utils.generateTimestamp()
            })
        })
        let updateData = [];
        await CommonService.updateAccountInfo(records, userId);
        return await getRepository(Record).save(data);
    }

    static async updateAccountInfo(data:Array<any>, userId:string) {
        let accounts = await getRepository(AccountInfo).find({ userId: userId });
        // console.log(accounts, data)
        if(accounts.length == 0){
            return new CustomError(300, `[${userId}]没有账号信息`);
        }
        accounts.forEach((item, index) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].AccountType == item.AccountType) {
                    item.num = (data[i].isIncome ? item.num + parseFloat(data[i].num) : item.num - data[i].num)
                }
            }
        })
        return await getRepository(AccountInfo).save(accounts);
    }

    static async setAccountInfo(data:Array<any>,userId:string){
        
        let accounts = await getRepository(AccountInfo).find({userId:userId});
        console.log(accounts, data)
        if(accounts.length > 0){
            accounts.forEach((item,index) => {
                for(let i =0; i<data.length; i++){
                    if (data[i].AccountType == item.AccountType){
                        item.num = data[i].num;
                    }
                }
            })
            return await getRepository(AccountInfo).save(accounts);
        }else{
            return await getRepository(AccountInfo).save(data);
        }
    }


    static async getAccountInfo(userId: string){
        return await getRepository(AccountInfo).find({userId});
    }
    

    static async getRecordList(userId: string, accountType: string, startDateTime: number, pageListCount: number = 20, pageNumber:number = 0){
        let skip = pageNumber * pageListCount;
        let where = {
            userId,
            time: LessThanOrEqual(startDateTime ? startDateTime : Utils.getTodayTimeFrame().startTime), //小于等于
        }
        // console.log(accountType)
        if(accountType){
            where["AccountType"] = accountType;
        }
        let count = await getRepository(Record).count({ where });
        let list = await getRepository(Record).find({ 
            where,
            order:{
                time:"DESC",
            },
            skip,
            take:pageListCount,
         });
        return {
            count, list
        };
    }


}