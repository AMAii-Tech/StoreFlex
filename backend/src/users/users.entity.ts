import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    user_id: number;
    @Column({ unique: true })
    email: string;
    @Column()
    password: string;
    @Column()
    name: string;
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    login_time: Date;
    @Column({ default: '' })
    access_token: string;
}
