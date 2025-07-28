import {
  IconBrandGithub,
  IconBrandGmail,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

export const links = [
  {
    title: "Instagram",
    icon: (
      <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://www.instagram.com/direct/t/thulllee",
  },
  {
    title: "Whatapp",
    icon: (
      <IconBrandWhatsapp className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://wa.me/6282129237828?text=Hi%20Fathul",
  },
  {
    title: "Gmail",
    icon: (
      <IconBrandGmail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=fathulbilad@gmail.com&su=Portfolio%20Inquiry",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://github.com/fathulbilad",
  },
];
