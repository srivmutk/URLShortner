import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class UrlShortenerData extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    urlID: String;

    @Column()
    redirectURL: String;
}