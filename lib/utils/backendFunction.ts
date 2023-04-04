import bcrypt from 'bcrypt';

async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export { hashPassword, comparePassword };
