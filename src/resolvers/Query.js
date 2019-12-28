const Query = {
    users(parents, args, { db }, info) {
        if (!args.query) {
            return db.users;
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    posts(parents, args, { db }, info) {
        if (!args.query) {
            return db.posts;
        }
        return db.posts.filter((post) => {
            return post.title.toLowerCase().includes(args.query.toLowerCase())
                || post.body.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    comments(parents, args, { db }, info) {
        return db.comments;
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
};

export { Query as default };
