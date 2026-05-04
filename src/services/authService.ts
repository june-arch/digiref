import bcrypt from "bcrypt";

export const setPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

export const validPassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, passwordHash);
  return result;
};
