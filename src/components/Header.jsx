'use client'
import Logo from "../images/mainlogo.png"

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
  { name: 'Shonen' },
  { name: 'Shoujo' },
  { name: 'Seinen' },
 
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const Header=()=> {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header style={{ backgroundColor: '#121212' }} font-mon>
      <nav aria-label="Global"  className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 font-montserrat">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            {/* <span className="sr-only">Your Company</span> */}
       <div className="flex items-center space-x-3 pl-0 ml-0
       ">
    <img
      alt="Site Logo"
      src={Logo}
      className="h-10 w-auto object-contain"
    />
    <span className="text-base font-semibold text-white">
      Manga Zone
    </span>
  </div>

          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6"style={{color:"#f3f3f3"}} />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
  <Popover className="relative">
  <PopoverButton
    className="flex items-center gap-x-1 text-base/6 font-semibold"
    style={{ color: '#F3F3F3' }}
  >
    Type
    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
  </PopoverButton>

  <PopoverPanel
    transition
    className="absolute top-full left-0 z-10 mt-2 w-56 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
  >
    <div className="py-2">
      {products.map((item) => (
        <div
          key={item.name}
          className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
        >
          {item.name}
        </div>
      ))}
    </div>
  </PopoverPanel>
</Popover>




          <a href="#" className="text-base/6 font-semibold "style={{color:'#F3F3F3'}}>
            AboutUs
          </a>
          <a href="#" className="text-base/6 font-semibold " style={{color:'#F3F3F3'}}>
            Upcoming
          </a>
          <a href="#" className="text-base/6 font-semibold text-gray-900"style={{color:'#F3F3F3'}}>
            Manga
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-base/6 font-semibold text-gray-900"style={{color:'#F3F3F3'}}>
            Join Us <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden" >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#1C1C1C] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">

          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
             <div className="flex items-center space-x-2 pl-0 ml-0">
    <img
      alt="Site Logo"
      src={Logo}
      className="h-8 w-auto object-contain"
    />
    <span className="text-sm font-semibold text-white">
      Manga Zone
    </span>
  </div>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root" style={{color:'121212'}}>
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
  <DisclosureButton
    className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold hover:bg-gray-700"
    style={{ color: '#F3F3F3' }}
  >
    Types
    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
  </DisclosureButton>
  <DisclosurePanel className="mt-2 space-y-2">
    {[...products].map((item) => (
      <DisclosureButton
        key={item.name}
        as="a"
        href={item.href}
        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold hover:bg-gray-700"
        style={{ color: '#F3F3F3' }}
      >
        {item.name}
      </DisclosureButton>
    ))}
  </DisclosurePanel>
</Disclosure>

                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-700
"
                  style={{color:'#F3F3F3'}}
                >
                  AboutUs
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-700"
                  style={{color:'#F3F3F3'}}
                >
                  Upcoming
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-700"
                  style={{color:'#F3F3F3'}}
                >
                  Manga
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-700"
                  style={{color:'#F3F3F3'}}
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
export default Header;
