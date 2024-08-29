import { useConfig } from '@peersyst/react-components-core';
import { Outlet, RouteObject } from 'react-router-dom';
import CardPage from 'ui/common/pages/CardPage/CardPage';

import MintNFTPlayground from '../containers/Playgrounds/MintNFTPlayground/MintNFTPlayground';
import NFTokenAcceptOfferPlayground from '../containers/Playgrounds/NFTokenAcceptOfferPlayground/NFTokenAcceptOfferPlayground';
import NFTokenCreateOfferPlayground from '../containers/Playgrounds/NFTokenCreateOfferPlayground/NFTokenCreateOfferPlayground';
import XrpPaymentPlayground from '../containers/Playgrounds/PaymentPlayground/PaymentPlayground';
import { TokenPaymentPlayground } from '../containers/Playgrounds/TokenPaymentPlayground/TokenPaymentPlayground';
import SnapPlaygroundPage from '../pages/SnapPlaygroundPage';
import { PlaygroundRoutes } from './PlaygroundRoutes.types';

export const usePlaygroundRoutes = (): RouteObject[] => {
  const { enablePlayground } = useConfig('featureFlags');

  if (!enablePlayground) {
    return [];
  }
  return [
    {
      path: PlaygroundRoutes.MAIN,
      element: (
        <CardPage>
          <Outlet />
        </CardPage>
      ),
      children: [
        {
          path: PlaygroundRoutes.MAIN,
          element: <SnapPlaygroundPage />,
        },
        {
          path: PlaygroundRoutes.TOKEN,
          element: <TokenPaymentPlayground />,
        },
        {
          path: PlaygroundRoutes.MINT_NFT,
          element: <MintNFTPlayground />,
        },
        {
          path: PlaygroundRoutes.NFT_CREATE_OFFER,
          element: <NFTokenCreateOfferPlayground />,
        },
        {
          path: PlaygroundRoutes.NFT_ACCEPT_OFFER,
          element: <NFTokenAcceptOfferPlayground />,
        },
        {
          path: PlaygroundRoutes.XRP_PAYMENT,
          element: <XrpPaymentPlayground />,
        },
      ],
    },
  ];
};
