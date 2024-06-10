import { matchPath, PathMatch, useLocation } from "react-router-dom";

export default function useRouteMatch(patterns: string[], exact?: boolean): PathMatch | null {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath({ path: pattern, end: !!exact, caseSensitive: true }, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}
