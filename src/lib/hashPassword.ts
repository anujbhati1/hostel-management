import bcryptJs from "bcryptjs";

export const hashPassword = (password: string) => {
  const genSalt = bcryptJs.genSaltSync(10);
  return bcryptJs.hashSync(password, genSalt);
};
