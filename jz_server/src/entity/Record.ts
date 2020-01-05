import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
@Index(["userId"])
export class Record {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({
        length:6
    })
    userId: string;

    @Column()
    time: number;

    // 1：建行 2：微信 3： 支付宝 4：花呗
    @Column({
        default:"",
        length:5
    })
    AccountType: string;

    // 是否为收入款
    // 1：收入 0：支出
    @Column({
        type: "tinyint",
    })
    isIncome: number

    @Column({
        type:"float",
        precision:10,
        scale:2,
        default:0.00
      
    })
    num: number;

    @Column()
    describe: string;


}
