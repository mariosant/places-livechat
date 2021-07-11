const typeDefs = `
    type Point {
        _id: ID!
        title: String
        address: String
        createdAt: String
        group: Group
    }

    type Group {
        _id: ID!
        name: String
    }

    input PointInput {
        _id: String
        title: String
        address: String
        groupId: String
    }

    type Organization {
        _id: ID!
        proPlan: Boolean
    }

    type Query {
        points: [Point]
        availableGroups: [Group]
        organization: Organization
    }

    type Mutation {
        createPoint(title: String!, address: String!, groupId: String): Point

        updatePoint(point: PointInput): Point

        deletePoint(_id: ID!): Point
    }
`;

module.exports = typeDefs;
