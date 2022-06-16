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
  UilTrash 
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
    path:"/",
  },
  {
    icon: UilUserSquare,
    heading: "Collecteurs",
    path:"/",
  },
  {
    icon:  UilTrash,
    heading: "Conteneurs",
    path:"/",
  },
  {
    icon: UilUsersAlt,
    heading: "Historique",
    path: "/Admin/History"
  },
  {
    icon: UilCalendarAlt,
    heading: "Agenda",
    path:"/",
  },
  {
    icon: UilClipboardAlt,
    heading: "Commande",
    path:"/",
  },

  {
    icon: UilPackage,
    heading: "Produits",
    path:"/",
  },
  {
    icon: UilMessage,
    heading: "Messages",
    path:"/",
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


export const CardsData =[
  {
    title: 'Ventes',
    color:{
      background:'#8ac997',
      boxShadow:'0px 10px 20px 0px #c1dfc4',
    },
    barValue: 70,
    value: "25,970",
    png: UilUserSquare,
    series:
      {
        name:"Ventes",
        data: [31,40,28,61,42,109,100],
      },
  },

  {
    title:'Revenus',
    color:{
      background:'#8ac997',
      boxShadow:'0px 10px 20px 0px #c1dfc4',
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series:
      {
        name:"Revenue",
        data: [10,100,50,70,80,30,40],
      },

  },

  {
    title:'Dépenses',
    color:{
      background:'#8ac997',
      boxShadow:'0px 10px 20px 0px #c1dfc4',
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series:
      {
        name:"Depenses",
        data: [10,25,15,30,12,15,20],
      },

  },
]


