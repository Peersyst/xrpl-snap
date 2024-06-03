import useGetXrpPrice from '../query/useGetXrpPrice';

export default function useGetXrpFiatPriceFromAmount() {
  const { data: price, isLoading } = useGetXrpPrice();

  function getXrpFiatPriceFromAmount(amount: number) {
    if (!price || isLoading) return 0;
    return amount * price;
  }

  return { getXrpFiatPriceFromAmount, isLoading };
}
