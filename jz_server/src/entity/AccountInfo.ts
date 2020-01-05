import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from "typeorm";


// 账户信息
@Entity()
@Index(["userId","AccountType"], {unique:true})
export class AccountInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({
        length:6
    })
    userId: string;

    // 1：建行 2：微信 3： 支付宝 4：花呗
    @Column({
        default:"",
        length:5,
    })
    AccountType: string;

    // 是否为公司记录
    // 1：公司 0：个人
    @Column({
        type:"tinyint",
    })
    isCompany: number

    // 
    @Column({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0.00
    })
    num:number;

}
