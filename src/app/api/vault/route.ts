import { NextResponse } from 'next/server';

import { getVaultSnapshot } from '../../../lib/hyperliquid';

export const revalidate = 60;

export async function GET() {
  try {
    const snapshot = await getVaultSnapshot();

    return NextResponse.json(snapshot, {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching vault snapshot:', error);

    return NextResponse.json(
      {
        error: true,
        message: 'Unable to load vault data at the moment.',
      },
      { status: 502 }
    );
  }
}
