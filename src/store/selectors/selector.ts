import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { calculateSlots } from "@/utils/utils";
import { userType } from "@/utils/types";

export const selectProfileSchema = (state: RootState) => {
  const query = state.dataApi.queries["profile(undefined)"];
  const data = query?.data as { user: userType } | undefined;
  return data?.user?.currTable?.schema || null;
};

export const selectSlots = createSelector(selectProfileSchema, (schema) => {
  if (!schema) return { slots: [], numSlots: [] };
  return calculateSlots(schema);
});
