import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

      private get token() {
        const { id, username } = this;
        return jwt.sign({
          id,
          username,
        }, process.env.SECRET, {expiresIn: '7d'});
      }
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public role: string;

    public async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async encryptPassword(): Promise<void> {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}
