import { Button } from '@/shadcn-components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/shadcn-components/ui/dialog'
import { Contact } from '@/types'
import IconConfig from '../iconConfig'
import { HiOutlineChevronDoubleRight } from 'react-icons/hi'
import { memo } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

type ContactsDialogProps = {
  contactDetails: Contact | null
  onDialogClose: () => void
  onDeleteClick: (contact: Contact) => void
}

const ContactsDialog = ({ contactDetails, onDialogClose, onDeleteClick }: ContactsDialogProps) => {
  if (!contactDetails) {
    return <></>
  }
  return (
    <Dialog open={contactDetails !== null} onOpenChange={open => !open && onDialogClose()}>
      <DialogContent className="sm:max-w-md boreder border-pride flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
          <DialogDescription>Below you can see informations about this contact</DialogDescription>
        </DialogHeader>
        {contactDetails && (
          <div className="flex justify-between items-center flex-wrap">
            <div className="relative w-[30%]">
              <img
                src={contactDetails.user_from.image}
                alt={`${contactDetails.user_from.first_name} ${contactDetails.user_from.last_name}`}
                className="aspect-square object-contain rounded-full"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-sm">
                  {contactDetails.user_from.first_name} {contactDetails.user_from.last_name}
                </span>
              </div>
            </div>
            <IconConfig themeColor="prideColor" size="3rem">
              <HiOutlineChevronDoubleRight />
            </IconConfig>
            <div className="relative w-[30%]">
              <img
                src={contactDetails.user_to.image}
                alt={`${contactDetails.user_to.first_name} ${contactDetails.user_to.last_name}`}
                className="aspect-square object-contain rounded-full"
              />
              <div className="absolute inset-0 bg-black rounded-full bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-sm">
                  {contactDetails.user_to.first_name} {contactDetails.user_to.last_name}
                </span>
              </div>
            </div>
            <p className="text-center w-full pt-10 cursor-default	">
              You are friends since{' '}
              <span className="underline decoration-pride p-1	">
                {new Date(contactDetails.created).toLocaleString()}
              </span>
            </p>
          </div>
        )}
        <DialogFooter className="sm:justify-start flex items-center w-full" style={{ justifyContent: 'space-between' }}>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={onDialogClose}
              className="text-font border-pride border-2 rounded-xl hover:bg-backgroundPride duration-300"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="secondary"
            onClick={onDialogClose}
            className="bg-[#d21404] hover:bg-[#a91b0d] duration-300 aspect-square w-fit h-fit p-2 rounded-full"
            onClickCapture={() => onDeleteClick(contactDetails)}
          >
            <IconConfig themeColor="backgroundColor" size="24px">
              <FaRegTrashAlt />
            </IconConfig>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ContactsDialog)
