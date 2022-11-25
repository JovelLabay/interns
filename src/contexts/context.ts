import { createContext } from 'react';

// STATIC STATE MANAGEMENT
export const StaticContext = createContext<null | Welcome>(null);

// DYNAMIC STATE MANAGEMENT
export const DynamicContext = createContext<null | Dynamic>(null);

// COMPANY USER OBJECT
export const CompanyUserDetailsContext =
  createContext<null | UserCompanyObject>(null);
