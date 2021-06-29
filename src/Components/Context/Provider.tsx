import SessionContext from './index';

export default function SessionProvider({ children }: any): any {
  return (
    <SessionContext.Provider value={
      {
        token: localStorage.getItem('token'),
        avatar: localStorage.getItem('avatar'),
        userId: localStorage.getItem('userId'),
        userName: localStorage.getItem('userName')
      }
    }>
      {children}
    </SessionContext.Provider>
  )
}