import { useQuery } from 'react-query';
import { Queries } from '../../query/queries';
import ControllerFactory from '../../adapter/ControllerFactory';

export default function useGetAddress() {
  return useQuery([Queries.ADDRESS], () => ControllerFactory.walletController.wa)

}
