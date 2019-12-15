import { GraphQLServer } from "graphql-yoga";

// 5 Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [
    {
        id: '1',
        name: 'Andrew',
        email: 'andrew@example.com',
        age: 27
    },
    {
        id: '2',
        name: 'Sarah',
        email: 'sarah@example.com',
    },
    {
        id: '3',
        name: 'Mike',
        email: 'mike@example.com',
    }
];

const posts = [
    {
        id: '10',
        title: 'GraphQL 101',
        body: 'This is how to use GraphQl...',
        published: true,
        author: '1'
    },
    {
        id: '11',
        title: 'GraphQL 201',
        body: 'This is advanced GraphQl...',
        published: false,
        author: '1'
    },
    {
        id: '12',
        title: 'Programming Music',
        body: '',
        published: false,
        author: '2'
    },
];

const comments = [
    {
        id: '102',
        text: 'This worked well for me. Thanks!',
        author: '1',
        post: '10'
    },
    {
        id: '103',
        text: 'Glad you enjoyed it.',
        author: '1',
        post: '11'
    },
    {
        id: '104',
        text: 'This did no work',
        author: '2',
        post: '12'
    },
    {
        id: '105',
        text: 'Nevermind. I got it to work.',
        author: '3',
        post: '12'
    },
]

// Type definintions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User
        post: Post
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String
        body: String
        published: Boolean
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        users(parents, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        posts(parents, args, ctx, info) {
            if (!args.query) {
                return posts;
            }
            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase())
                    || post.body.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        comments(parents, args, ctx, info) {
            return comments;
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com',
                age: 28
            };
        },
        post() {
            return {
                id: '123',
                title: 'title',
                body: 'body',
                published: true
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id;
            });
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id;
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id;
            });
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            });
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post;
            });
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => {
    console.log('the server is up!');
});
