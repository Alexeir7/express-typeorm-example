import bcrypt from 'bcrypt';
import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @Index({ unique: true })
    public username: string;

    @Column()
    public password: string;

    @Column()
    public role: string;

    public hashPassword() {
      this.password = bcrypt.hashSync(this.password, 10);
    }

    public IsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
