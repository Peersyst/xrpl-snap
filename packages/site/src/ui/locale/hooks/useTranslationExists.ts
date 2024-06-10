import type { ExistsFunction, FlatNamespace, KeyPrefix, TOptions } from 'i18next';
import type { $Dictionary } from 'i18next/typescript/helpers';
import type { FallbackNs } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import type { $Tuple } from 'react-i18next/helpers';

export default function useTranslationExists<
  Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(): ExistsFunction {
  const { i18n } = useTranslation<Ns, KPrefix>();

  return <TKeys extends string = string, TInterpolationMap extends object = $Dictionary>(
    key: TKeys | TKeys[],
    options?: TOptions<TInterpolationMap>,
  ) => {
    return i18n.exists(key, options as any /* Odd complaining about the same type :/ */);
  };
}
