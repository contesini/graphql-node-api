const userTypes = `

    type User{
        id: ID!
        name: String!
        email: String!
        photo: String
        createdAt: String!
        updatedAt: String!
        posts(first: Int, offset: Int): [ Post! ]!
    }

    input UserCreateInput {
        name: String!
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String!
        email: String!
        photo: String!
    }

    input UserUpdatePasswordInput {
        passoword: String!
    }

`;

const userQueries = `
    users(first: Int, offset: Int): [User!]!
    user(id: ID!): User
    currentUser: User
`;

const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(UserUpdateInput!): User
    updateUserPassword(UserUpdatePasswordInput!): Boolean
    deleteUser(id: ID!): Boolean
`;

export {
    userTypes,
    userQueries,
    userMutations
}