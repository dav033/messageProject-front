import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUsersLessOne } from 'src/petitions'
import { useUser } from 'src/stores'

export default function Users () {
  const router = useRouter()
  const user = useUser((state: { user }) => state.user)
  const [users, setUsers] = useState<any>([])
  useEffect(() => {
    const getUsers = async () => {
      const response = await getUsersLessOne(user.id)

      console.log(response.users)
      setUsers(response.users)
    }

    getUsers()
  }, [])

  const goChat = (userTarget) => {
    for (let i = 0; i < user.privateChats.length; i++) {
      for (let j = 0; j < userTarget.privateChats.length; j++) {
        if (user.privateChats[i] === userTarget.privateChats[j]) {
          router.push({
            pathname: 'chats/[chat]',
            query: { chat: userTarget.privateChats[j] }
          })
          return
        }
      }
    }
    router.push({ pathname: '/chats', query: { data: userTarget._id } })
  }

  return users
    ? (
    <div>
      {users.map((user) => {
        return (
          <h1
            onClick={() => goChat(user)}
            key={user._id}
            style={{
              color: 'white',
              display: 'block',
              margin: '20px'
            }}
          >
            {user.userName}
          </h1>
        )
      })}
    </div>
      )
    : null
}
