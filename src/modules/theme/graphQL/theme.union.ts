import { createUnionType } from "@nestjs/graphql";
import { Theme } from "../model/theme.model";
import { StatusMessage } from "../model/status-message.model";

export const ThemeResultUnion = createUnionType({
  name: "ThemeResultUnion",
  types: () => [Theme, StatusMessage],
  resolveType(value) {
    if ("title" in value) {
      return Theme;
    }
    if ("status" in value) {
      return StatusMessage;
    }
    return null;
  },
});
