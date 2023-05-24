import session from 'express-session'

export = session;

declare module 'express-session' {
  interface Session {
    user: { [key: string]: any };
  }
  interface SessionData {
    user: { [key: string]: any };
  }
}