import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { ThemeService } from "../theme.service";
import { ThemeResultUnion } from "./theme.union";

@Resolver(() => ThemeResultUnion)
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}

  @Query(() => [ThemeResultUnion])
  async themes(): Promise<(typeof ThemeResultUnion)[]> {
    const result = await this.themeService.findAll();
    return Array.isArray(result) ? result : [result];
  }
}
