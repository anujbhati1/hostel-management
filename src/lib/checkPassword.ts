import bcryptJs from "bcryptjs";

export const checkPassword = (password: string, hash: string) => {
  return bcryptJs.compareSync(password, hash);
};
