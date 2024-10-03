import { Link, useLocation } from "react-router-dom"
import { Menu } from '@headlessui/react'
import clsx from "clsx"
import { useMediaQuery } from 'react-responsive'
import { Icon } from '../../../../Icons'


function Navbar() {

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const location = useLocation()

  const links = [
    {
      path: "/today-weather",
      label: "Today"
    },
    {
      path: "/hourly-weather",
      label: "Hourly"
    },
    {
      path: "/daily-weather",
      label: "Daily"
    },
    {
      path: "/historical-weather",
      label: "Historical Weather"
    },
    {
      path: "/maps",
      label: "Radar & Maps"
    },
    {
      path: "/astronomy",
      label: "Astronomy"
    },
    {
      path: "/contact",
      label: "Contact"
    },
    {
      path: "/settings",
      label: "Settings"
    }
  ]

  return (
    <nav className="flex items-center text-lg">
      {isTabletOrMobile && (
        <Menu>
          <Menu.Button className="relative">
            <Icon name="menu" size="32" />
          </Menu.Button>
          <Menu.Items className="flex flex-col absolute right-1 top-20 md:right-20 bg-white w-[200px] z-10 rounded-md">
            {links.map((link, index) => (
              /* Use the `active` state to conditionally style the active item. */
              <Menu.Item key={index}>
                {({ active }) => (
                  <Link
                    key={index} to={link.path}
                    className={clsx('text-black hover:text-white bg-white hover:bg-[#2f528f] m-1 px-3 py-1.5 rounded-xl transition-color', {
                      'bg-[#2f528f]': active,
                    })}
                  >
                    {link.label}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      )}
      {isDesktopOrLaptop && (
        <div>
          {links.map((link, index) => (
            <Link key={index} to={link.path} className={clsx("text-white hover:border-b border-white  mx-2 px-1 py-1.5 rounded transition-all", {
              'border-b-2': location.pathname === link.path,
            })}>{link.label}</Link>
          ))}
        </div>
      )}

    </nav>
  )
}

export default Navbar