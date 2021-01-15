import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';

@Entity({ name: 'operations' })
export class OperationEntity {
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

  @Column('varchar', {
    nullable: true,
    length: 100,
  })
  public operation: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
  })
  public operationType: string;

  @Column('varchar', {
    nullable: true,
    length: 100,
  })
  public paymentOption: string;

  @Column('varchar', {
    nullable: true,
    length: 100,
  })
  public quantity: string;

  @Column('varchar', {
    nullable: true,
    length: 100,
  })
  public price: string;

  @Column('varchar', {
    nullable: true,
    length: 100,
  })
  public location: string;

  @Column('varchar', {
    nullable: true,
    length: 30,
  })
  public firstName: string;

  @Column('varchar', {
    nullable: true,
    length: 30,
  })
  public lastName: string;

  @Column('varchar', {
    nullable: true,
    length: 30,
  })
  public username: string;

  @Column('varchar', {
    nullable: true,
    length: 10,
  })
  public language: string;

  @Column('text', {
    nullable: true,
  })
  public notes: string;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
