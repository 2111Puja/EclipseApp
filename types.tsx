import React from "react";

export type MenuItem = {
  id: string;
    name: string;
    description: string;
    course: string;
    price: number;
  }

  export type RootStackParamList = {
    Menu: undefined;
    'Manage Menu': {
      menuItems: MenuItem[];
      setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;

    };
    
    Filter: undefined;
    FilterMenu: {
    items: MenuItem[];
  };
}