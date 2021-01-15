import { Column, PrimaryGeneratedColumn, CreateDateColumn, Entity } from 'typeorm';

@Entity({ name: 'user_histories' })
export class UserHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
  })
  public userId: string;

  @Column('varchar', {
    nullable: false,
    length: 70,
  })
  public groupName: string;

  @Column()
  @CreateDateColumn()
  public deletedAt: Date;
}
