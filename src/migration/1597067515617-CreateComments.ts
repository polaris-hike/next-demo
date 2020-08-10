import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateComments1597067515617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'comments',
            columns:[
                {name:'id',isGenerated:true,type:'int',generationStrategy:'increment',isPrimary:true},
                {name:'user_id',type:'int'},
                {name:'post_id',type:'int'},
                {name:'content',type: 'text'}
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comments')
    }

}
