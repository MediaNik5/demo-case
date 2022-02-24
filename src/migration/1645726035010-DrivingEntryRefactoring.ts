import {MigrationInterface, QueryRunner} from "typeorm";

export class DrivingEntryRefactoring1645726035010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            'create table "driving_entry"(' +
                '"id" serial primary key,' +
                '"car" integer references "car"("id") not null,' +
                '"user" integer references "user"("id"),' +
                '"date" timestamp not null' +
            ')'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query('drop table "driving_entry"')
    }

}
