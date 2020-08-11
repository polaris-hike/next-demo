import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {User} from './User';
import {Post} from './Post';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column('int')
    userId:number;
    @Column('int')
    postId:number;
    @Column('text')
    content:string;
    @CreateDateColumn('time')
    createdAt:Date;
    @UpdateDateColumn('time')
    updatedAt:Date;
    @ManyToOne(type => User,user=>user.comments)
    user:User;
    @ManyToOne(type => Post,post=>post.comments)
    post:Post;
}
