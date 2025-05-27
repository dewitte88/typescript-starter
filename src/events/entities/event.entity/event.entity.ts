import { Column, Entity, In, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()   
@Index(['name'])
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    @Index()
    name: string;
    @Column('json')
    payload: Record<string, any>;
}
