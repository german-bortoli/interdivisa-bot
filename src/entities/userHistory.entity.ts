import { Column, PrimaryGeneratedColumn, CreateDateColumn, Entity, Index } from 'typeorm';

@Entity({ name: 'user_histories' })
@Index(['userId', 'groupName'], { unique: true })
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
