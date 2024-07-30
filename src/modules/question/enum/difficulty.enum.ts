import { registerEnumType } from "@nestjs/graphql";

export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

registerEnumType(Difficulty, {
  name: "Difficulty",
  description: "The difficulty level of the question",
});
