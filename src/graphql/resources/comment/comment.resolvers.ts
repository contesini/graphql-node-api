import { GraphQLResolveInfo } from "graphql";
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { Transaction } from "sequelize";
import { CommentInstance } from "../../../models/CommentModel";
import { handlerError } from "../../../utils/utils";

export const commentResolvers = {

    Comment: {

        user: (comment, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.User
                .findById(comment.get('user'))
                .catch(handlerError);
        },

        post: (post, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.Post
                .findById(post.get('post'))
                .catch(handlerError);
        }

    },

    Query: {

        commentsByPost: (parent, {postId, first = 10, offset=0}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            postId = parseInt(postId)
            return db.Comment
                .findAll({
                    where: {post: postId},
                    limit: first,
                    offset: offset
                })
                .catch(handlerError);;
        }
    },

    Mutation: {
        
        createComment: (parent, {input}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .create(input, {transaction: t})
            }).catch(handlerError);;
        },

        updateComment: (parent, {id, input}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        if(!comment) throw new Error(`Comment with id ${id} not found!`);
                        return comment.update(input, {transaction: t})
                    })
            }).catch(handlerError);;
        },

        deleteComment: (parent, {id,}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        if(!comment) throw new Error(`Comment with id ${id} not found!`);
                        return comment.destroy({transaction: t})
                            .then(comment => !!comment);
                    })
            }).catch(handlerError);;
        }

    }
}