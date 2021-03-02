import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class UrlShortenerData extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    UrlId: string;

    @Column()
    RedirectURL: string;
}


