// src/types/Property.ts

import { ReactNode } from "react";

export interface Property {
    type: ReactNode;
    address: ReactNode;
    id: string;
    title: string;
    description: string;
    priceUSD: number;
    priceETH: number;
  }
  