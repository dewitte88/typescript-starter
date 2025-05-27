import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Name } from "../names.entity";

@Entity()
export class Gender{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

    @ManyToMany(type => Name, name => name.gender)
    names:  Name[];
    // The 'names' property is an array of Name entities, establishing a many-to-many relationship with the Name entity.

}
 