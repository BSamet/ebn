// Sidebar imports
import {
  UilClipboardAlt,
  UilEstate,
  UilPackage,
  UilUsersAlt,
  UilCalendarAlt,
  UilMessage,
  UilUserSquare,
  UilMoneyWithdrawal
} from "@iconscout/react-unicons";

export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Tableau de bord",
  },
  {
    icon: UilUserSquare,
    heading: "Collecteur",
  },
  {
    icon: UilCalendarAlt,
    heading: "Agenda",
  },
  {
    icon: UilClipboardAlt,
    heading: "Commande",
  },

  {
    icon: UilPackage,
    heading: "Produits",
  },
  {
    icon: UilUsersAlt,
    heading: "Clients",
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
    series:[
      {
        name:"Ventes",
        data: [31,40,28,61,42,109,100],
      },

    ],

  },

  {
    title:'Revenue',
    color:{
      background:'#8ac997',
      boxShadow:'0px 10px 20px 0px #c1dfc4',
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series:[
      {
        name:"Revenue",
        data: [10,100,50,70,80,30,40],
      },

    ],

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
    series:[
      {
        name:"Depenses",
        data: [10,25,15,30,12,15,20],
      },

    ],

  },
]
