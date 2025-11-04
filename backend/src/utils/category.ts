export enum ClearanceCategory {
  Clear = "Clear",
  TenMph = "10mph",
  Prohibit = "Prohibit",
}

export const getLowestClearanceCategory = (
  categories: ClearanceCategory[]
): ClearanceCategory => {
  if (categories.length === 0) return ClearanceCategory.Clear;
  if (categories.includes(ClearanceCategory.Prohibit))
    return ClearanceCategory.Prohibit;
  if (categories.includes(ClearanceCategory.TenMph))
    return ClearanceCategory.TenMph;
  return ClearanceCategory.Clear;
};
