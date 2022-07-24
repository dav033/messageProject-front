export const getSocketIdByUserId = (
  userID: string,
  usersList: Array<{ user_id: string; socket_id: String }>
) => {
  let aux: String = ''
  usersList.forEach((user) => {
    if (user.user_id === userID) {
      aux = user.socket_id
      console.log('??????????????')
    }
  })

  return aux
}
