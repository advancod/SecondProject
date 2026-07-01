import { ethers } from 'ethers';

// Local Hardhat node only — never use hardcoded private keys with real funds.
export const RPC_URL = 'http://127.0.0.1:8545';
export const ALICE_ADDRESS = '0x6Ee1C0C238542D56361809dbe60A7303eC39a878';
export const ALICE_PRIVATE_KEY =
  '0x596f3a9573f20c4b328d1d8e4fe6a4a8658039671c53fd27f0274c2cd87052b5';

export const TOGETHERS_COIN_ADDRESS =
  '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
export const TOGETHERS_ESCROW_ADDRESS =
  '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

export const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
];

// Constructed lazily (not at module load) so importing this file never
// throws — ethers' crypto deps don't always resolve cleanly on web.
export function getProvider() {
  return new ethers.JsonRpcProvider(RPC_URL);
}

export function getAliceWallet() {
  return new ethers.Wallet(ALICE_PRIVATE_KEY, getProvider());
}

export function getTogethersCoin() {
  return new ethers.Contract(TOGETHERS_COIN_ADDRESS, ERC20_ABI, getAliceWallet());
}
