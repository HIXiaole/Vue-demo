import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";

@Entity()
@Index(["account"],{unique:true})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:30
    })
    account: string;

    @Column({
        length:20
    })
    password: string;

    @Column()
    name: string;

}
