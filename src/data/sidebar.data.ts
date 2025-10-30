import type { IMenuItem } from "@/types/global.type";
import { BadgeQuestionMark, BookImage, ChartBarStacked, Fingerprint, GlobeLock, HandHelping, Handshake, LayoutDashboard, Lock, MailCheck, MailQuestionMark, SettingsIcon, User, Users } from "lucide-react";
import { MdContactPhone } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";

export const menuItems: IMenuItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Orders', icon: BookImage, href: '/orders' },
  { name: 'Users', icon: Users, href: '/users' },
  { name: 'Category', icon: ChartBarStacked , href: '/categories' },
  { name: 'Car Brands', icon: SiBrandfolder , href: '/car-brands' },
  { name: 'Products', icon: SiBrandfolder , href: '/products' },
  { name: 'Contact List', icon: MdContactPhone , href: '/contacts' },
  { name: 'Subscriber List', icon: MailCheck , href: '/subscribers' },
  {
    name: 'Help & Support', icon: BadgeQuestionMark,
    submenu: [
      { name: 'Help Center', icon: HandHelping, href: '/help' },
      { name: 'FAQs', icon: MailQuestionMark, href: '/faqs' },
    ]
  },
  {
    name: 'Settings',
    icon: SettingsIcon,
    submenu: [
      { name: 'Profile', icon: User, href: '/profile' },
      { name: 'Change Password', icon: Lock , href: '/change-password' },
      { name: 'About Us', icon: Fingerprint, href: '/about-us' },
      { name: 'Privacy Policy', icon: GlobeLock , href: '/privacy-policy' },
      { name: 'Terms & Condition', icon: Handshake, href: '/terms-condition' },
    ]
  },
];
