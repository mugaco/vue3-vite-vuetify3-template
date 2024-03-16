import {
    TemplateIcon,
    SettingsIcon,
    TrashIcon,

    MenuIcon,
    CircleIcon,
    CircleOffIcon,
    BrandChromeIcon,
    MailboxIcon,
    MessageQuestionIcon,
    UsersGroupIcon,
    PhoneCallIcon,
    TicketIcon,
    BuildingArchIcon,
    MoodSmileIcon,
    StarIcon,
    AlienIcon,
    AwardIcon
} from 'vue-tabler-icons';

const sidebarItem = [
    {
        title: 'Home',
        icon: TicketIcon,
        to: '/',
        contact: true
    },
    {
        title: 'Dos',
        icon: PhoneCallIcon,
        to: '/dos'
    },
    {
        title: 'Tres',
        icon: StarIcon,
        to: '/tres'
    },
    // {
    //     title: 'contact',
    //     icon: UsersGroupIcon,
    //     to: '/helpdesk/contacts'
    // },
    // {
    //     title: 'company',
    //     icon: BuildingArchIcon,
    //     to: '/helpdesk/companies'
    // },
    // {
    //     title: 'agent',
    //     icon: MessageQuestionIcon,
    //     to: '/helpdesk/agents',
    //     admin: true
    // },
    // {
    //     title: 'mailbox',
    //     icon: MailboxIcon,
    //     to: '/helpdesk/mailboxes',
    //     admin: true
    // },
    // {
    //     title: 'settings',
    //     icon: SettingsIcon,
    //     to: '/helpdesk/settings',
    //     admin: true
    // },
    // {
    //     title: 'Templates',
    //     icon: TemplateIcon,
    //     subCaption: 'EmailTemplates',
    //     to: '/email-templates-tenant',
    //     admin: true
    // },
    // {
    //     title: 'tickets_paperbin',
    //     icon: TrashIcon,
    //     subCaption: 'paperbin',
    //     to: '/helpdesk/tickets/paperbin',
    // },
    // {
    //     title: 'spam',
    //     icon: AlienIcon,
    //     subCaption: 'no-deseado',
    //     to: '/helpdesk/spamers',
    // }
];

export default sidebarItem;
