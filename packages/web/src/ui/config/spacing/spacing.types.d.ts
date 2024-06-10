export type ThemeSpacingKeys = 0 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 6 | 7 | 8 | 16;

export type ThemeSpacingValues = Record<ThemeSpacingKeys, string>;

export type SpaceDirectionParams = [ThemeSpacingKeys] | [ThemeSpacingKeys, ThemeSpacingKeys];

export type SpaceParams =
    | SpaceDirectionParams
    | [ThemeSpacingKeys, ThemeSpacingKeys, ThemeSpacingKeys]
    | [ThemeSpacingKeys, ThemeSpacingKeys, ThemeSpacingKeys, ThemeSpacingKeys];

export type ThemeSpacing = ThemeSpacingValues & {
    /**
     * Specify spacing for all four sides of an element as you would in CSS.
     * @param indices top, right, bottom, left
     * @returns string
     * @example padding: ${theme.spacing.all(1, 2, 3, 4)}; (padding: 4rem 8rem 12 rem 16rem;)
     */
    all(...indices: SpaceParams): string;
    /**
     * Specify spacing for two horizontal sides of an element as you would in CSS
     * @param indices right, left
     * @returns string
     * @example padding: ${theme.spacing.horizontal(1, 2)}; (padding: 0rem 4rem 0rem 8rem;)
     */
    horizontal(...indices: SpaceDirectionParams): string;
    /**
     * Specify spacing for two vertical sides of an element as you would in CSS
     * @param indices top, bottom
     * @returns string
     * @example padding: ${theme.spacing.vertical(1, 2)}; (padding: 4rem 0rem 8rem 0rem;)
     * */
    vertical(...indices: SpaceDirectionParams): string;
};
