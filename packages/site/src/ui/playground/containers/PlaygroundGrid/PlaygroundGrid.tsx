import { Col, Row, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Card from 'ui/common/components/surface/Card/Card';
import { PlaygroundRoutes } from 'ui/playground/router/PlaygroundRoutes.types';

export interface PlaygroundGridProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function PlaygroundCard({ label, path, className }: { label: string; path: string; className?: string }) {
  return (
    <Card css={{ flex: 1 }} className={clsx('PlaygroundCard', className)}>
      <Col flex={1} justifyContent="center" alignItems="center">
        <Link to={path}>{label}</Link>
      </Col>
    </Card>
  );
}

const PLAYGROUNDS = [
  {
    label: 'Token',
    path: PlaygroundRoutes.TOKEN,
  },
  {
    label: 'XRP Payment',
    path: PlaygroundRoutes.XRP_PAYMENT,
  },
  {
    label: 'Mint NFT',
    path: PlaygroundRoutes.MINT_NFT,
  },
  {
    label: 'CreateOffer NFT',
    path: PlaygroundRoutes.NFT_CREATE_OFFER,
  },
  {
    label: 'AcceptOffer NFT',
    path: PlaygroundRoutes.NFT_ACCEPT_OFFER,
  },
];

function chunkArray(array: any[], size: number) {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
}

function PlaygroundGrid({ className, children, ...rest }: PlaygroundGridProps) {
  const rows = chunkArray(PLAYGROUNDS, 2);

  return (
    <Col css={{ flex: 1, padding: '2rem 2rem 0' }} gap="1rem" className={clsx('PlaygroundGrid', className)} {...rest}>
      <Row gap="1rem" css={{ width: '100%' }} alignItems="center">
        <Typography variant="h1">Playgrounds</Typography>
        <Link to="/">Go gome</Link>
      </Row>
      {rows.map((row, index) => (
        <Row gap="1rem" css={{ width: '100%' }} key={index}>
          {row.map((playground, index) => (
            <PlaygroundCard key={index} {...playground} />
          ))}
        </Row>
      ))}
    </Col>
  );
}

export default PlaygroundGrid;
