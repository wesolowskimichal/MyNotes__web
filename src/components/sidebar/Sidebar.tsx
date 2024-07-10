import { useCallback, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn-components/ui/tabs'
import { RiContactsBook3Line } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'
import IconConfig from '../iconConfig'
import { ScrollArea } from '@/shadcn-components/ui/scroll-area'
import Contact from '@/views/contact'
import { User } from '@/types'

type SidebarProps = {
  hidden?: boolean
}

const Sidebar = ({ hidden = false }: SidebarProps) => {
  const [visible, setVisible] = useState(!hidden)
  const [animate, setAnimate] = useState(false)

  const testUser: User = {
    id: '91f2f58c-3d68-4629-9b0d-95d6b804d4c0',
    username: 'admin',
    email: 'admin@admin.com',
    first_name: 'Michał',
    last_name: 'Wesołowski',
    image: 'http://127.0.0.1:8000/media/defaults/user-default.png',
    contacts: []
  }

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
          <Tabs defaultValue="contacts" className="flex flex-col h-full">
            <TabsList className="w-[80%] mx-auto bg-pride rounded-xl flex justify-around">
              <TabsTrigger value="contacts" className="rounded-xl">
                Contacts
              </TabsTrigger>
              <TabsTrigger value="groups" className="rounded-xl">
                Groups
              </TabsTrigger>
            </TabsList>
            <TabsContent value="contacts" className="h-full px-2">
              <ScrollArea className="h-full">
                <Contact contact={testUser} />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="groups" className="h-full px-2">
              <ScrollArea className="h-full">
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
