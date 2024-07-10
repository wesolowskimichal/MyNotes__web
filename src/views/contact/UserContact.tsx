import { User } from '@types'

type UserContactProps = {
  user: User
}
const UserContact = ({ user }: UserContactProps) => {
  return (
    <div className="flex w-full items-center gap-x-2 bg-backgroundPride rounded-xl p-2 justify-around">
      <img src={user.image} alt="Profile Picture" className="w-[20%] rounded-full" />
      <p>
        {user.first_name} {user.last_name}
      </p>
    </div>
  )
}

export default UserContact
