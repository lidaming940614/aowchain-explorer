// Copyright 2017-2020 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Option } from './types';

import { CUSTOM_ENDPOINT_KEY } from './constants';

export interface LinkOption extends Option {
  dnslink?: string;
  isChild?: boolean;
  isDevelopment?: boolean;
  textBy: string;
}

interface EnvWindow {
  // eslint-disable-next-line camelcase
  process_env?: {
    WS_URL: string;
  }
}

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint

function createOwn (t: TFunction): LinkOption[] {
  try {
    const storedItems = localStorage.getItem(CUSTOM_ENDPOINT_KEY);

    if (storedItems) {
      const items = JSON.parse(storedItems) as string[];

      return items.map((textBy) => ({
        info: 'local',
        text: t<string>('rpc.custom.entry', 'Custom', { ns: 'apps-config' }),
        textBy,
        value: textBy
      }));
    }
  } catch (e) {
    console.error(e);
  }

  return [];
}

function createDev (t: TFunction): LinkOption[] {
  return [
    {
      dnslink: 'local',
      info: 'local',
      text: t<string>('rpc.local', 'Local Node', { ns: 'apps-config' }),
      textBy: '127.0.0.1:9944',
      value: 'ws://127.0.0.1:9944'
    }
  ];
}

function createLiveNetworks (t: TFunction): LinkOption[] {
  return [
    // fixed, polkadot
    {
      dnslink: 'polkadot',
      info: 'polkadot',
      text: t<string>('rpc.polkadot.parity', 'Polkadot', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Parity' } }),
      value: 'wss://rpc.polkadot.io'
    },
    {
      info: 'polkadot',
      text: t<string>('rpc.polkadot.w3f', 'Polkadot', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Web3 Foundation' } }),
      value: 'wss://cc1-1.polkadot.network'
    },
    {
      dnslink: 'kusama',
      info: 'kusama',
      text: t<string>('rpc.kusama.parity', 'Kusama', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Parity' } }),
      value: 'wss://kusama-rpc.polkadot.io'
    },
    {
      info: 'kusama',
      text: t<string>('rpc.kusama.w3f', 'Kusama', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Web3 Foundation' } }),
      value: 'wss://cc3-5.kusama.network'
    },
    {
      info: 'kusama',
      isDisabled: true,
      text: t<string>('rpc.kusama.ava', 'Kusama', { ns: 'apps-config' }),
      textBy: t<string>('rpc.ava.summary', 'user-run public nodes; see https://status.cloud.ava.do/', { ns: 'apps-config' }),
      value: 'wss://kusama.polkadot.cloud.ava.do'
    },
    // alphabetical based on chain name
    {
      dnslink: 'centrifuge',
      info: 'centrifuge',
      text: t<string>('rpc.centrifuge', 'Centrifuge', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Centrifuge' } }),
      value: 'wss://fullnode.centrifuge.io'
    },
    {
      info: 'crab',
      text: t<string>('rpc.crab', 'Darwinia Crab', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Darwinia Network' } }),
      value: 'wss://crab.darwinia.network'
    },
    {
      info: 'dockMainnet',
      text: t<string>('rpc.dock-mainnet', 'Dock Mainnet', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Dock Association' } }),
      value: 'wss://mainnet-node.dock.io'
    },
    {
      dnslink: 'edgeware',
      info: 'edgeware',
      text: t<string>('rpc.edgeware', 'Edgeware', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Commonwealth Labs' } }),
      value: 'wss://mainnet1.edgewa.re'
    },
    {
      dnslink: 'kulupu',
      info: 'kulupu',
      text: t<string>('rpc.kulupu', 'Kulupu', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Kulupu' } }),
      value: 'wss://rpc.kulupu.corepaper.org/ws'
    },
    {
      info: 'nodle',
      text: t<string>('rpc.nodle-main', 'Nodle Main', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Nodle' } }),
      value: 'wss://main1.nodleprotocol.io'
    },
    {
      info: 'plasm',
      text: t<string>('rpc.plasm', 'Plasm', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Stake Technologies' } }),
      value: 'wss://rpc.plasmnet.io/'
    },
    {
      info: 'stafi',
      text: t<string>('rpc.stafi', 'Stafi', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Stafi Foundation' } }),
      value: 'wss://mainnet-rpc.stafi.io'
    },
    {
      info: 'subsocial',
      text: t<string>('rpc.subsocial', 'Subsocial', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'DappForce' } }),
      value: 'wss://rpc.subsocial.network'
    }
  ];
}

function createTestNetworks (t: TFunction): LinkOption[] {
  return [
    // polkadot test relays
    {
      dnslink: 'rococo',
      info: 'rococo',
      text: t<string>('rpc.rococo', 'Rococo', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Parity' } }),
      value: 'wss://rococo-rpc.polkadot.io'
    },
    {
      info: 'rococoTick',
      isChild: true,
      text: t<string>('rpc.rococo.tick', 'Tick', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Parity' } }),
      value: 'wss://tick-rpc.polkadot.io'
    },
    {
      info: 'rococoTrick',
      isChild: true,
      text: t<string>('rpc.rococo.trick', 'Trick', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Prity' } }),
      value: 'wss://trick-rpc.polkadot.io'
    },
    {
      info: 'rococoTrack',
      isChild: true,
      text: t<string>('rpc.rococo.track', 'Track', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Parity' } }),
      value: 'wss://track-rpc.polkadot.io'
    },
    {
      info: 'rococoAcala',
      isChild: true,
      text: t<string>('rpc.rococo.acala', 'Mandala PC1', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Acala' } }),
      value: 'wss://rococo-1.acala.laminar.one'
    },
    {
      info: 'rococoDarwinia',
      isChild: true,
      text: t<string>('rpc.rococo.darwinia', 'Darwinia PC1', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Darwinia Network' } }),
      value: 'wss://parachain-rpc.darwinia.network'
    },
    {
      info: 'rococoPlasm',
      isChild: true,
      text: t<string>('rpc.rococo.plasm', 'Plasm PC1', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Stake Technologies' } }),
      value: 'wss://rpc.parachain.plasmnet.io'
    },
    {
      info: 'rococoRobonomics',
      isChild: true,
      text: t<string>('rpc.rococo.robonomics', 'Robonomics PC1', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Airalab' } }),
      value: 'wss://parachain-rpc.robonomics.network'
    },
    {
      info: 'rococoLaminar',
      isChild: true,
      text: t<string>('rpc.rococo.laminar', 'Turbulence PC1', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Laminar' } }),
      value: 'wss://rococo-1.laminar-chain.laminar.one'
    },
    // alphabetical based on chain name
    {
      info: 'centrifuge',
      text: t<string>('rpc.amber', 'Amber', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Centrifuge' } }),
      value: 'wss://fullnode.amber.centrifuge.io'
    },
    {
      info: 'nodle',
      text: t<string>('rpc.nodle-arcadia', 'Arcadia', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Nodle' } }),
      value: 'wss://arcadia1.nodleprotocol.io'
    },
    {
      info: 'edgeware',
      text: t<string>('rpc.beresheet', 'Beresheet', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Commonwealth Labs' } }),
      value: 'wss://beresheet1.edgewa.re'
    },
    {
      info: 'canvas',
      text: t<string>('rpc.canvas', 'Canvas', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Parity' } }),
      value: 'wss://canvas-rpc.parity.io'
    },
    {
      info: 'crust',
      text: t<string>('rpc.crust.network', 'Crust Maxwell CC2', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Crust Network' } }),
      value: 'wss://api.crust.network/'
    },
    {
      info: 'datahighway',
      isDisabled: true,
      text: t<string>('rpc.datahighway.harbour', 'Harbour', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'MXC' } }),
      value: 'wss://testnet-harbour.datahighway.com'
    },
    {
      info: 'dockTestnet',
      text: t<string>('rpc.dock-testnet', 'Dock Testnet', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Dock Association' } }),
      value: 'wss://danforth-1.dock.io'
    },
    {
      info: 'dusty',
      text: t<string>('rpc.dusty', 'Dusty', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Stake Technologies' } }),
      value: 'wss://rpc.dusty.plasmnet.io/'
    },
    {
      info: 'equilibrium',
      text: t<string>('rpc.equilibriumr', 'Equilibrium', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Equilibrium' } }),
      value: 'wss://api.testnet.equilibrium.io:9944'
    },
    {
      info: 'substrate',
      text: t<string>('rpc.flamingfir', 'Flaming Fir', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Parity' } }),
      value: 'wss://substrate-rpc.parity.io'
    },
    {
      info: 'acala',
      text: t<string>('rpc.mandala', 'Mandala', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Acala' } }),
      value: 'wss://node-6684611762228215808.jm.onfinality.io/ws'
    },
    {
      info: 'kilt',
      text: t<string>('rpc.kilt', 'Mashnet', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'KILT Protocol' } }),
      value: 'wss://full-nodes.kilt.io:9944/'
    },
    {
      info: 'phala',
      text: t<string>('rpc.phala', 'Phala PoC-2', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Phala Network' } }),
      value: 'wss://poc2.phala.network/ws'
    },
    {
      info: 'laminar',
      text: t<string>('rpc.turbulence', 'Turbulence', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Laminar' } }),
      value: 'wss://testnet-node-1.laminar-chain.laminar.one/ws'
    },
    {
      dnslink: 'westend',
      info: 'westend',
      text: t<string>('rpc.westend', 'Westend', { ns: 'apps-config' }),
      textBy: t<string>('rpc.hosted.by', 'hosted by {{host}}', { ns: 'apps-config', replace: { host: 'Parity' } }),
      value: 'wss://westend-rpc.polkadot.io'
    }
  ];
}

function createCustom (t: TFunction): LinkOption[] {
  const WS_URL = (
    (typeof process !== 'undefined' ? process.env?.WS_URL : undefined) ||
    (typeof window !== 'undefined' ? (window as EnvWindow).process_env?.WS_URL : undefined)
  );

  return WS_URL
    ? [
      {
        isHeader: true,
        text: t<string>('rpc.custom', 'Custom environment', { ns: 'apps-config' }),
        textBy: '',
        value: ''
      },
      {
        info: 'WS_URL',
        text: t<string>('rpc.custom.entry', 'Custom {{WS_URL}}', { ns: 'apps-config', replace: { WS_URL } }),
        textBy: WS_URL,
        value: WS_URL
      }
    ]
    : [];
}

export default function create (t: TFunction): LinkOption[] {
  return [
    ...createCustom(t),
    {
      isHeader: true,
      text: t<string>('rpc.header.live', 'Live networks', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createLiveNetworks(t),
    {
      isHeader: true,
      text: t<string>('rpc.header.test', 'Test networks', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createTestNetworks(t),
    {
      isDevelopment: true,
      isHeader: true,
      text: t<string>('rpc.header.dev', 'Development', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createDev(t),
    ...createOwn(t)
  ].filter(({ isDisabled }) => !isDisabled);
}
