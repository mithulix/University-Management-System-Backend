import config from '../../../config/envConfig';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateStudentId } from './users.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const academicSemester={
    code:"01",
    year:"2025"
  }
  const id = await generateStudentId(academicSemester);
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
 
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};