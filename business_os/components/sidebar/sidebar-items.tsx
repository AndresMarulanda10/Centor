import { type SidebarItem } from "./sidebar";
import TeamAvatar from "./team-avatar";

/**
 * Please check the https://heroui.com/docs/guide/routing to have a seamless router integration
 */

/**
 * Array of sidebar navigation items
 */
export const items: SidebarItem[] = [
  {
    key: "home", // Unique identifier for home item
    href: "#", // Navigation link
    icon: "solar:home-2-linear", // Icon name from solar icon set
    title: "Home", // Display text
  },
  {
    key: "projects",
    href: "#",
    icon: "solar:widget-2-outline",
    title: "Projects",
  },
  {
    key: "tasks",
    href: "http://localhost:3000/dashboard/tasks",
    icon: "solar:checklist-minimalistic-outline",
    title: "Tasks",
  },
  {
    key: "timesheet",
    href: "#",
    icon: "hugeicons:time-03",
    title: "Timesheet",
  },
  {
    key: "customers_crm",
    href: "#",
    title: "Customers CRM",
    icon: "tabler:progress-x",
  },
  {
    key: "reports",
    href: "#",
    title: "Reports",
    icon: "tabler:progress-x",
  },
  {
    key: "incomes",
    href: "#",
    title: "Incomes",
    icon: "tabler:progress-x",
  },
  {
    key: "invoives",
    href: "#",
    title: "Invoices",
    icon: "tabler:progress-x",
  },
  {
    key: "expenses",
    href: "#",
    title: "Expenses",
    icon: "tabler:progress-x",
  },
  {
    key: "suscribtions",
    href: "#",
    title: "Suscribtions",
    icon: "tabler:progress-x",
  },
  {
    key: "salaries",
    href: "#",
    title: "Salaries",
    icon: "tabler:progress-x",
  },
  {
    key: "proposals",
    href: "#",
    title: "Proposals",
    icon: "tabler:progress-x",
  },
  {
    key: "agreements",
    href: "#",
    title: "Agreements",
    icon: "tabler:progress-x",
  },
  {
    key: "services",
    href: "#",
    title: "Services",
    icon: "tabler:progress-x",
  },
  {
    key: "content-planner",
    href: "#",
    title: "Content Planner",
    icon: "tabler:progress-x",
  },
  {
    key: "ad-campaigns",
    href: "#",
    title: "Ad Campaigns",
    icon: "tabler:progress-x",
  },
  {
    key: "documents",
    href: "#",
    title: "Documents",
  },
  {
    key: "notes-resources",
    href: "#",
    title: "Notes & Resources",
  },
  {
    key: "okr-goal-tracker",
    href: "#",
    title: "OKR Goal Tracker",
  },
];

export const sectionItems: SidebarItem[] = [
  {
    key: "work",
    title: "Work",
    items: [
      {
        key: "home",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "projects",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "Projects",
      },
      {
        key: "tasks",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Tasks",
      },
      {
        key: "timesheet",
        href: "#",
        icon: "hugeicons:time-03",
        title: "Timesheet",
      },
    ],
  },
  {
    key: "crm",
    title: "CRM",
    items: [
      {
        key: "customers_crm",
        href: "#",
        title: "Customers CRM",
        icon: "tabler:progress-x",
      },
    ],
  },
  {
    key: "finance",
    title: "Finance",
    items: [
      {
        key: "reports",
        href: "#",
        title: "Reports",
        icon: "tabler:progress-x",
      },
      {
        key: "incomes",
        href: "#",
        title: "Incomes",
        icon: "tabler:progress-x",
      },
      {
        key: "invoives",
        href: "#",
        title: "Invoices",
        icon: "tabler:progress-x",
      },
      {
        key: "expenses",
        href: "#",
        title: "Expenses",
        icon: "tabler:progress-x",
      },
      {
        key: "suscribtions",
        href: "#",
        title: "Suscribtions",
        icon: "tabler:progress-x",
      },
      {
        key: "salaries",
        href: "#",
        title: "Salaries",
        icon: "tabler:progress-x",
      },
      {
        key: "proposals",
        href: "#",
        title: "Proposals",
        icon: "tabler:progress-x",
      },
      {
        key: "agreements",
        href: "#",
        title: "Agreements",
        icon: "tabler:progress-x",
      },
      {
        key: "services",
        href: "#",
        title: "Services",
        icon: "tabler:progress-x",
      },
    ],
  },
  {
    key: "marketing",
    title: "Marketing",
    items: [
      {
        key: "content-planner",
        href: "#",
        title: "Content Planner",
        icon: "tabler:progress-x",
      },
      {
        key: "ad-campaigns",
        href: "#",
        title: "Ad Campaigns",
        icon: "tabler:progress-x",
      },
    ],
  },
  {
    key: "company",
    title: "Company",
    items: [
      {
        key: "documents",
        href: "#",
        title: "Documents",
        icon: "tabler:progress-x",
      },
      {
        key: "notes-resources",
        href: "#",
        title: "Notes & Resources",
        icon: "tabler:progress-x",
      },
      {
        key: "okr-goal-tracker",
        href: "#",
        title: "OKR Goal Tracker",
        icon: "tabler:progress-x",
      },
    ],
  },
];

/**
 * Array that combines section items with team-related navigation items
 * Each team item includes a custom TeamAvatar component as startContent
 */
export const sectionItemsWithTeams: SidebarItem[] = [
  ...sectionItems, // Spread existing section items
  {
    key: "teams", // Section identifier for teams
    title: "Teams", // Section title
    items: [
      {
        key: "employees", // Unique identifier for employees
        href: "#", // Navigation link
        title: "Employees", // Display text
        startContent: <TeamAvatar name="Employees" />, // Custom avatar component
      },
      {
        key: "notice-board",
        href: "#",
        title: "Notice Board",
        startContent: <TeamAvatar name="Notice Board" />,
      },
      {
        key: "events-calendar",
        href: "#",
        title: "Events Calendar",
        startContent: <TeamAvatar name="Events Calendar" />,
      },
      {
        key: "team-holidays",
        href: "#",
        title: "Team Holidays",
        startContent: <TeamAvatar name="Team Holidays" />,
      },
      {
        key: "assets",
        href: "#",
        title: "Assets",
        startContent: <TeamAvatar name="Assets" />,
      },
    ],
  },
];
