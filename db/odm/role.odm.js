import Role from 'db/models/Role';

async function findByNameAndType(roleName, type) {
  const role = await Role.findOne(
    { name: roleName, type },
  );
  return role;
}

export default {
  findByNameAndType,
};
