import { Group, User } from '@types'
import GroupContact from './GroupContact'
import UserContact from './UserContact'
import { memo } from 'react'

type ContactProps = {
  contact: User | Group
}

const Contact = ({ contact }: ContactProps) => {
  if ('owners' in contact) return <GroupContact group={contact} />
  return <UserContact user={contact} />
}

export default memo(Contact)
