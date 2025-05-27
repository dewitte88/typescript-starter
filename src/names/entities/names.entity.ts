import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.entity/gender.entity";

@Entity() // sql table === 'name' 
export class Name {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @Column({nullable: true})
    description: string;

    @Column({default: 0})
    recommendations: number;

   @JoinTable()
   @ManyToMany(type =>  Gender, 
    (gender) => gender.name,
    {
        cascade: true
    })

    gender: Gender[];
 
}