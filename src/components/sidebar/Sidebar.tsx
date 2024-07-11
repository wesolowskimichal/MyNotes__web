import { useCallback, useEffect, useRef, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn-components/ui/tabs'
import { RiContactsBook3Line } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'
import IconConfig from '../iconConfig'
import { ScrollArea } from '@/shadcn-components/ui/scroll-area'
import Contact from '@/views/contact'
import { useToast } from '@/shadcn-components/ui/use-toast'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { ToastAction } from '@/shadcn-components/ui/toast'
import useApiPage from '@/hooks/useApiPage'
import { MyContact } from '@types'
import ContactLoader from '../contactLoader'

type SidebarProps = {
  hidden?: boolean
}

const Sidebar = ({ hidden = false }: SidebarProps) => {
  const [visible, setVisible] = useState(!hidden)
  const [animate, setAnimate] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const { pageData, pageError, pageLoading, isFinished, fetchNextPage } = useApiPage<MyContact>('/api/contacts/')
  const { toast } = useToast()

  useEffect(() => {
    if (pageError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: pageError,
        action: <ToastAction altText="Try again">Try again</ToastAction>
      })
    }
  }, [pageError])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !pageLoading && !isFinished()) {
          fetchNextPage()
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [pageLoading, isFinished])

  const handleHide = useCallback(() => {
    setAnimate(true)
    setTimeout(() => setVisible(false), 300)
  }, [])

  return (
    <>
      {visible ? (
        <aside
          className={`w-[250px] bg-background border-pride border-r-2 flex flex-col h-screen ${
            animate ? 'animate-slideOutToLeft' : 'animate-slideInFromLeft'
          }`}
        >
          <button onClick={handleHide} className="self-end">
            <IconConfig themeColor="prideColor" size="2rem">
              <IoCloseSharp />
            </IconConfig>
          </button>
          <Tabs defaultValue="contacts" className="flex flex-col flex-1 overflow-y-auto">
            <div className="bg-background sticky top-0 z-10 p-2">
              <TabsList className="w-[80%] mx-auto bg-pride rounded-xl flex justify-around h-fit">
                <TabsTrigger value="contacts" className="rounded-xl">
                  Contacts
                </TabsTrigger>
                <TabsTrigger value="groups" className="rounded-xl">
                  Groups
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="contacts" className="flex-1 px-2 flex flex-col">
              <ScrollArea>
                <div className="flex flex-col gap-y-2">
                  {pageData.map(contact => (
                    <Contact key={contact.id} contact={contact} />
                  ))}
                  {pageLoading && <ContactLoader />}
                </div>
                <div ref={loadMoreRef} className="h-4"></div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="groups" className="h-full px-2">
              <ScrollArea>
                Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place:
                under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't
                seem to stop Jokester. And then, one day, the people of the kingdom discovered that the jokes left by
                Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't
                stop.
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </aside>
      ) : (
        <button
          className="absolute top-2 left-2"
          onClick={() => {
            setVisible(true)
            setAnimate(false)
          }}
        >
          <IconConfig themeColor="prideColor" size="3rem">
            <RiContactsBook3Line />
          </IconConfig>
        </button>
      )}
    </>
  )
}

export default Sidebar
