import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ThemeService } from './theme.service';
import { Theme } from './model/theme.model';
import { CreateThemeInput } from './dto/create-theme.input';
import { HttpStatus } from '@nestjs/common';

@Resolver(() => Theme)
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}

  @Query(() => [Theme], { name: 'themes' })
  findAllThemes(): Promise<Theme[]> {
    return this.themeService.findAll();
  }

  @Query(() => Theme, { name: 'theme' })
  findThemeById(@Args('id', { type: () => Int }) id: number): Promise<Theme> {
    return this.themeService.findOneById(id);
  }

  @Mutation(() => Theme, { name: 'createTheme' })
  createTheme(@Args('createThemeInput') createThemeInput: CreateThemeInput): Promise<Theme> {
    return this.themeService.create(createThemeInput);
  }

  @Mutation(() => Theme, { name: 'removeTheme' })
  removeTheme(@Args('id', { type: () => Int }) id: number): Promise<{ statusCode: HttpStatus; message: string }> {
    return this.themeService.remove(id);
  }
}
