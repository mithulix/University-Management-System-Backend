import { Request, Response } from 'express'
import userServices from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userServices.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user',
    })
  }
}

export default {
  createUser,
}
