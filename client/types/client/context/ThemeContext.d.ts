/// <reference types="react" />
declare const ThemeContext: import("react").Context<string>;
declare const ThemeContextProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export { ThemeContext, ThemeContextProvider };
