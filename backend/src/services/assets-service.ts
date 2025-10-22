import { queryDb } from "../db/db.helper";
import type { SubDivisionResults } from "../types";

export const assetService = {
  getAllSubDivisions: async () => {
    const sql = "SELECT * FROM SubDivision;";
    return await queryDb(sql) as SubDivisionResults[];
  },

  getSubDivisionsByCodes: async (codes: string[]) => {
    const formattedCodes = codes.map(code => `'${code}'`).join(',')
    const sql = `SELECT * FROM SubDivision WHERE code in (${formattedCodes});`;
    return await queryDb(sql) as SubDivisionResults[];
  },
};
