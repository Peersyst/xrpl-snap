import RepositoryFactory from '../../../domain/adapter/RepositoryFactory';

export function useXrplService() {
  const { xrplService } = RepositoryFactory;
  return xrplService;
}
