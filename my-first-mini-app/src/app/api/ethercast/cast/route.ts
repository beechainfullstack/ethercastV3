import { NextResponse } from 'next/server';
import { createWalletClient, http, parseAbi, Hex, keccak256, stringToBytes } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const ETHERCAST_ADDRESS = process.env.ETHERCAST_CONTRACT_ADDRESS as Hex | undefined;
const WORLDCHAIN_RPC_URL = process.env.WORLDCHAIN_RPC_URL;
const WORLDCHAIN_PRIVATE_KEY = process.env.WORLDCHAIN_PRIVATE_KEY;

const etherCastAbi = parseAbi([
  'function castAffirmation(address to, bytes32 contentHash, string tag) returns (uint256 id)',
]);

const worldchain = {
  id: 480, // replace with the actual Worldchain chain ID if different
  name: 'Worldchain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: [WORLDCHAIN_RPC_URL || ''] },
  },
} as const;

export async function POST(request: Request) {
  try {
    if (!ETHERCAST_ADDRESS || !WORLDCHAIN_RPC_URL || !WORLDCHAIN_PRIVATE_KEY) {
      return NextResponse.json({ error: 'Contract or network not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { toHandle, message, tag } = body as {
      toHandle: string | null;
      message: string;
      tag: string | null;
    };

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const toAddress: Hex = '0x0000000000000000000000000000000000000000';
    const contentHash = keccak256(stringToBytes(message.trim()));

    const account = privateKeyToAccount(WORLDCHAIN_PRIVATE_KEY as Hex);
    const client = createWalletClient({
      account,
      chain: worldchain,
      transport: http(WORLDCHAIN_RPC_URL),
    });

    const txHash = await client.writeContract({
      address: ETHERCAST_ADDRESS,
      abi: etherCastAbi,
      functionName: 'castAffirmation',
      args: [toAddress, contentHash, tag ?? ''],
    });

    return NextResponse.json({ txHash }, { status: 200 });
  } catch (error) {
    console.error('Error casting affirmation', error);
    return NextResponse.json({ error: 'Failed to cast affirmation' }, { status: 500 });
  }
}
