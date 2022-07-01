// Sidebar imports
import {
    UilClipboardAlt,
    UilEstate,
    UilPackage,
    UilUsersAlt,
    UilCalendarAlt,
    UilMessage,
    UilUserSquare,
    UilMoneyWithdrawal,
    UilTrash,
    UilSignOutAlt
} from "@iconscout/react-unicons";
import Sidebar from "../components/Sidebar";

export const SidebarData = [
    {
        icon: UilEstate,
        heading: "Tableau de bord",
    },
    {
        icon: UilUserSquare,
        heading: "Clients",
        path: "/",
    },
    {
        icon: UilUserSquare,
        heading: "Collecteurs",
        path: "/",
    },
    {
        icon: UilTrash,
        heading: "Conteneurs",
        path: "/",
    },
    {
        icon: UilUsersAlt,
        heading: "Historique",
        path: "/Admin/History"
    },
    {
        icon: UilCalendarAlt,
        heading: "Agenda",
        path: "/",
    },
    {
        icon: UilClipboardAlt,
        heading: "Commande",
        path: "/",
    },

    {
        icon: UilPackage,
        heading: "Produits",
        path: "/",
    },
    {
        icon: UilMessage,
        heading: "Messages",
        path: "/",
    },
    {
        icon: UilSignOutAlt,
        heading: "Déconnexion",
        path: "/",
    },
];

export const SidebarClientData = [
    {
        icon: UilEstate,
        heading: "Tableau de bord",
    },
    {
        icon: UilUserSquare,
        heading: "Gestion du compte",
    },
    {
        icon: UilCalendarAlt,
        heading: "Agenda",
    },
    {
        icon: UilClipboardAlt,
        heading: "Abonnement",
    },

    {
        icon: UilPackage,
        heading: "Demande de collecte"
    },

    {
        icon: UilTrash,
        heading: "Suspension de collecte",
    },

    {
        icon: UilMessage,
        heading: "Messages",
    },

];


