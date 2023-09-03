import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';

import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/users.model';
import { jwtHelpers } from '../../../helpers/jwt.helpers';
import envConfig from '../../../config/envConfig';

//-------- login authorization----------------------------------------
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    envConfig.jwt.secret as Secret,
    envConfig.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    envConfig.jwt.refresh_secret as Secret,
    envConfig.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

//-------- change password service----------------------------------------
const changePassword = async (
user: JwtPayload | null,
payload: IChangePassword
): Promise<void> => {
const { oldPassword, newPassword } = payload;

// // checking is user exist
// const isUserExist = await User.isUserExist(user?.userId);

//alternative way
const isUserExist = await User.findOne({ id: user?.userId }).select(
  '+password'
);

if (!isUserExist) {
  throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
}

// checking old password
if (
  isUserExist.password &&
  !(await User.isPasswordMatched(oldPassword, isUserExist.password))
) {
  throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
}

// // hash password before saving
// const newHashedPassword = await bcrypt.hash(
//   newPassword,
//   Number(config.bycrypt_salt_rounds)
// );

// const query = { id: user?.userId };
// const updatedData = {
//   password: newHashedPassword,  //
//   needsPasswordChange: false,
//   passwordChangedAt: new Date(), //
// };

// await User.findOneAndUpdate(query, updatedData);
// data update
isUserExist.password = newPassword;
isUserExist.needsPasswordChange = false;

// updating using save()
isUserExist.save();
};

//------------- refresh token --------------------------------------------
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      envConfig.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //-----------generate new token--------------------------------------
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    envConfig.jwt.secret as Secret,
    envConfig.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
};
