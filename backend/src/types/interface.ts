import session from 'express-session'
export { }

export interface IParticipants {
  id: string,
  name: string,
  email: string,
  number: string
}

export interface IEvents {
  id: string,
  name: string,
  participants: []
}

export interface IUserAccount {
  name: string,
  email: string,
  password: string,
  number: string,
  id?: string,
}

export interface IUserLogin {
  username: string,
  password: string
}

declare global {
  namespace Express {
    interface Request {
      user: IUserAccount,
    }
  }
}

declare module 'express-session' {
  interface Session {
    user: { [key: string]: any };
  }
  interface SessionData {
    user: { [key: string]: any };
  }
}

