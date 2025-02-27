import {MigrationInterface, QueryRunner, getRepository} from 'typeorm';
import { User } from '../entity/User';

export class CreateAdminUser1558916415032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = new User();
        user.username = 'admin';
        user.password = 'admin';
        user.hashPassword();
        user.role = 'ADMIN';
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
