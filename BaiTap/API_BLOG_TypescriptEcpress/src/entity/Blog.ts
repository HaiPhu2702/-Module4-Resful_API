import {Column,Entity,PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  public readonly id: number;



  @Column({ type: "varchar" })
  public title: string;

  @Column({ type: "varchar" })
  public author: string;

  @Column({ type: "varchar" })
  public content: string;

}