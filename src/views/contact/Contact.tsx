import { MyContact } from '@types'
import { memo } from 'react'

type ContactProps = {
  contact: MyContact
}

const Contact = ({ contact }: ContactProps) => {
  return (
    <div className="flex w-full items-center gap-x-2 bg-backgroundPride rounded-xl p-2 justify-around cursor-pointer hover:bg-pride duration-300 hover:text-background">
      <img src={contact.user.image} alt="Profile Picture" className="w-[20%] rounded-full" />
      <p>
        {contact.user.first_name} {contact.user.last_name}
      </p>
    </div>
  )
}

export default memo(Contact)
