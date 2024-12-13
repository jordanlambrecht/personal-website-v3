'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { siteConfig } from '@/config/site'
import LogoRotator from '@/components/logoRotator'

export default function Test() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Function to check if a route is active
  const isActive = (path: string): boolean => pathname === path

  return (
    <Navbar
      maxWidth='2xl'
      height={'12rem'}
      classNames={{
        item: [
          // "data-[active=true]:after:content-['']",
          // 'data-[active=true]:after:absolute',
          // 'data-[active=true]:after:bottom-0',
          // 'data-[active=true]:after:left-0',
          // 'data-[active=true]:after:right-0',
          // 'data-[active=true]:after:h-[2px]',
          // 'data-[active=true]:after:rounded-[2px]',
          // 'data-[active=true]:after:bg-primary',
        ],
      }}
      isMenuOpen={isMenuOpen}
      position='static'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <LogoRotator />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 sm:flex' justify='end'>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.path} isActive={isActive(item.path)}>
            <Link
              color={isActive(item.path) ? 'primary' : 'foreground'}
              href={item.path}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navItems.map((item) => (
          <NavbarMenuItem
            key={item.path}
            className={`transition-all ${
              isActive(item.path)
                ? 'font-bold text-primary'
                : 'font-normal text-foreground'
            }`}
          >
            <Link
              className='w-full'
              color={isActive(item.path) ? 'primary' : 'foreground'}
              href={item.path}
              size='lg'
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
