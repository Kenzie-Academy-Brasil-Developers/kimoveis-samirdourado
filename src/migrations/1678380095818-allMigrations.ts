import { MigrationInterface, QueryRunner } from "typeorm";

export class allMigrations1678380095818 implements MigrationInterface {
    name = 'allMigrations1678380095818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_state" DROP CONSTRAINT "FK_392e7a9073384fb35df94101675"`);
        await queryRunner.query(`ALTER TABLE "real_state" RENAME COLUMN "addressesId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "real_state" ADD CONSTRAINT "FK_05088449764d42ca807c1b09fc1" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_state" DROP CONSTRAINT "FK_05088449764d42ca807c1b09fc1"`);
        await queryRunner.query(`ALTER TABLE "real_state" RENAME COLUMN "addressId" TO "addressesId"`);
        await queryRunner.query(`ALTER TABLE "real_state" ADD CONSTRAINT "FK_392e7a9073384fb35df94101675" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
