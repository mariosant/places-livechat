const typeDefs = `
    type Point {
        _id: ID!
        title: String
        address: String
        createdAt: String
    }

    input PointInput {
        _id: String
        title: String
        address: String
    }

    type Query {
        points: [Point]
    }

    type Mutation {
        createPoint(title: String!, address: String!): Point

        updatePoint(point: PointInput): Point

        deletePoint(_id: ID!): Point
    }
`;

module.exports = typeDefs;
