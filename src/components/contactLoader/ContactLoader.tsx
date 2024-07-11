import { Skeleton } from '@/shadcn-components/ui/skeleton'

const ContactLoader = () => {
  return (
    <div className="flex w-full items-center gap-x-2 p-2 justify-around">
      <Skeleton className="h-12 aspect-square rounded-full bg-backgroundPride" />
      <Skeleton className="w-full h-12 bg-backgroundPride rounded-xl" />
    </div>
  )
}

export default ContactLoader
