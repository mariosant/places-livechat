export const points = `
query {
  points {
    _id
    title
    address
    group {
      _id
      name
    }
  }
}
`;

export const deletePoint = `
mutation deletePoint($_id: ID!) {
  deletePoint(_id: $_id) {
    _id
  }
}
`;

export const createPoint = `
mutation createPoint($title: String!, $address: String!, $groupId: String) {
    createPoint(title: $title, address: $address, groupId: $groupId) {
        _id
        title
        address
        group {
          _id
          name
        }
    }
}
`;

export const updatePoint = `
mutation updatePoint($point: PointInput) {
    updatePoint(point: $point) {
        _id
        title
        address
        group {
          _id
        }
    }
}
`;

export const availableGroups = `
  query {
    availableGroups {
      _id
      name
    }
  }
`;

export const organization = `
  query {
    organization {
      _id
      proPlan
    }
  }
`;
