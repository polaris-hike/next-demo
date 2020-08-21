import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Post} from './Post';
import {Comment} from './Comment';
import {getDatabaseConnection} from '../../libs/getDatabaseConnection';
import md5 from 'md5';
import _ from 'lodash'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany(type => Post, post => post.author)
    posts: Post[];
    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    errors = {username: [] as string[], password: [] as string[], passwordConfirm: [] as string[]};
    password: string;
    passwordConfirm: string;

    async validate() {
        const found = await (await getDatabaseConnection()).manager.find(User, {username: this.username});

        if (found.length > 0) {
            this.errors.username.push('用户名已存在,不能重复注册');
        }
        if (this.username.trim() === '') {
            this.errors.username.push('不能为空');
        }
        if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
            this.errors.username.push('格式不合法');
        }
        if (this.username.trim().length > 42) {
            this.errors.username.push('太长');
        }
        if (this.username.trim().length <= 3) {
            this.errors.username.push('太短');
        }
        if (this.password === '') {
            this.errors.password.push('不能为空');
        }
        if (this.password !== this.passwordConfirm) {
            this.errors.passwordConfirm.push('密码不匹配');
        }
    }

    hasErrors() {
        return !!Object.values(this.errors).find(v => v.length > 0);
    }

    @BeforeInsert()
    generatePasswordDigest() {
        this.passwordDigest = md5(this.password);
    }

    toJSON(){
        return _.omit(this,['password','passwordConfirm','passwordDigest','errors'])
    }
}
