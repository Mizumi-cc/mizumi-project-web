import { Fragment, FunctionComponent } from "react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Menu, Transition } from  "@headlessui/react"

export type ShowMoreMenuOption = {
  title: string
  icon: React.ReactNode
  onClick: () => void
}

interface Props {
  options: ShowMoreMenuOption[]
}

const ShowMoreMenu: FunctionComponent<Props> = ({ options }) => {
  return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <EllipsisVerticalIcon
              className="h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {options.map((option, optionIdx) => (
                <Menu.Item key={optionIdx}>
                  {({ active }) => (
                    <button
                      onClick={option.onClick}
                      className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-white font-medium"
                    >
                      {option.icon} {option.title}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
  )
}

export default ShowMoreMenu
