export default function getOtherUser (
  userID: String,
  object: { user1: String; user2: String }
) {
  const { user1, user2 } = object
  let aux: String = ''
  if (userID === user1) {
    aux = user2
  } else if (userID === user2) {
    aux = user1
  }

  return aux
}
