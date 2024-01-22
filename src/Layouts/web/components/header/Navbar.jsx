import { Link } from "react-router-dom"
import { Menu } from '@headlessui/react'
import clsx from "clsx"

function Navbar() {

  const links = [
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
      path: "/signup",
      label: "Sign Up"
    },
    {
      path: "/login",
      label: "Log In"
    },
    {
      path: "/settings",
      label: "Settings"
    }
  ]

  return (
    <nav className="grid grid-flow-col gap-2 text-lg">
      {window.innerWidth < 768 ? (
        <Menu>
          <Menu.Button className="relative"><span className="material-symbols-outlined">
            list
          </span></Menu.Button>
          <Menu.Items className="flex flex-col absolute right-3 top-16 bg-white w-[200px] z-10 rounded-md">
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
      ) : (
        <div>
          {links.map((link, index) => (
            <Link key={index} to={link.path} className="text-white hover:border-b border-white  mx-2 px-1 py-1.5 rounded transition-all">{link.label}</Link>
          ))}
        </div>
      )
      }

    </nav>
  )
}

export default Navbar