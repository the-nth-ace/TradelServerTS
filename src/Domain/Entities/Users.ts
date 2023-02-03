import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "Domain/Base";
import { SettingsUserRoles } from "Domain/Entities/SettingsUserRoles";
import { PasswordEncryptionService } from "Logic/Helpers";

@Entity()
export class Users extends CustomBaseEntity {
  //    Todo RELATIONSHIP
  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({
    default: true,
  })
  isFirstTimeLogin: boolean;

  @Column({
    default: false,
  })
  hasVerifiedEmail: boolean;

  @Column({
    nullable: true,
  })
  lastLoginDate: Date;

  @ManyToOne(() => SettingsUserRoles)
  role: SettingsUserRoles;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = PasswordEncryptionService.hashPassword(this.password);
      return this.password;
    }
  }
}

// export const UserRepository = AppDataSource.getRepository(Users);
