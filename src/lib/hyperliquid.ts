const HYPERLIQUID_INFO_URL = 'https://api.hyperliquid.xyz/info';

export const CRYPTOWAFFLE_VAULT_ADDRESS = '0x942ef466282c90086b06345e662f3f269edafa51';
export const CRYPTOWAFFLE_VAULT_NAME = 'CryptoWaffle';
export const HYPERLIQUID_VAULTS_URL = `https://app.hyperliquid.xyz/vaults/${CRYPTOWAFFLE_VAULT_ADDRESS}`;

type HistoryPoint = [number, string];
type PortfolioHistory = {
  accountValueHistory: HistoryPoint[];
  pnlHistory: HistoryPoint[];
  vlm: string;
};

type VaultFollower = {
  user: string;
  vaultEquity: string;
  pnl: string;
  allTimePnl: string;
  daysFollowing: number;
  vaultEntryTime: number;
  lockupUntil: number;
};

type VaultDetailsResponse = {
  name: string;
  vaultAddress: string;
  leader: string;
  description: string;
  portfolio: [string, PortfolioHistory][];
  apr: number;
  leaderFraction: number;
  leaderCommission: number;
  followers: VaultFollower[];
  maxDistributable: number;
  maxWithdrawable: number;
  allowDeposits: boolean;
  isClosed: boolean;
};

type ClearinghouseAssetPosition = {
  type: string;
  position: {
    coin: string;
    szi: string;
    leverage: {
      type: string;
      value: number;
      rawUsd: string;
    };
    entryPx: string;
    positionValue: string;
    unrealizedPnl: string;
    returnOnEquity: string;
    liquidationPx: string;
    marginUsed: string;
    maxLeverage: number;
  };
};

type ClearinghouseStateResponse = {
  marginSummary: {
    accountValue: string;
    totalNtlPos: string;
    totalRawUsd: string;
    totalMarginUsed: string;
  };
  crossMarginSummary: {
    accountValue: string;
    totalNtlPos: string;
    totalRawUsd: string;
    totalMarginUsed: string;
  };
  withdrawable: string;
  assetPositions: ClearinghouseAssetPosition[];
  time: number;
};

export type VaultPosition = {
  coin: string;
  side: 'Long' | 'Short';
  size: number;
  leverage: number;
  marginMode: string;
  entryPrice: number;
  positionValue: number;
  unrealizedPnl: number;
  liquidationPrice: number;
  returnOnEquity: number;
  marginUsed: number;
  maxLeverage: number;
};

export type VaultSnapshot = {
  name: string;
  vaultAddress: string;
  leader: string;
  description: string;
  accountValue: number;
  totalNotionalPosition: number;
  totalMarginUsed: number;
  withdrawable: number;
  openPositionsCount: number;
  totalProfitLoss: number;
  totalProfitLossPct: number;
  monthlyProfitLoss: number;
  monthlyReturnPct: number;
  apr: number;
  estimatedMonthlyYield: number;
  leaderFraction: number;
  leaderCommission: number;
  leaderEquity: number;
  followerCount: number;
  allowDeposits: boolean;
  isClosed: boolean;
  maxDistributable: number;
  maxWithdrawable: number;
  capacityRemaining: number;
  capacityUsedPct: number;
  maxVaultCapacity: number;
  positions: VaultPosition[];
  updatedAt: number;
};

async function fetchHyperliquidInfo<T>(payload: Record<string, string>, revalidate = 60): Promise<T> {
  const response = await fetch(HYPERLIQUID_INFO_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Hyperliquid request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function toNumber(value: string | number | undefined): number {
  if (typeof value === 'number') {
    return value;
  }

  if (!value) {
    return 0;
  }

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getLatestValue(points: HistoryPoint[] | undefined): number {
  if (!points?.length) {
    return 0;
  }

  return toNumber(points[points.length - 1]?.[1]);
}

function getBaseValue(accountValue: number, pnl: number): number {
  const base = accountValue - pnl;
  return base > 0 ? base : accountValue;
}

function formatPositionSide(size: number): 'Long' | 'Short' {
  return size >= 0 ? 'Long' : 'Short';
}

export async function getVaultSnapshot(vaultAddress = CRYPTOWAFFLE_VAULT_ADDRESS): Promise<VaultSnapshot> {
  const [vaultDetails, clearinghouseState] = await Promise.all([
    fetchHyperliquidInfo<VaultDetailsResponse>({ type: 'vaultDetails', vaultAddress }),
    fetchHyperliquidInfo<ClearinghouseStateResponse>({ type: 'clearinghouseState', user: vaultAddress }),
  ]);

  const portfolioByPeriod = Object.fromEntries(vaultDetails.portfolio) as Record<string, PortfolioHistory>;
  const monthPortfolio = portfolioByPeriod.month;
  const allTimePortfolio = portfolioByPeriod.allTime;

  const accountValue = toNumber(clearinghouseState.marginSummary.accountValue);
  const leaderEquity =
    toNumber(vaultDetails.followers.find((follower) => follower.user === 'Leader')?.vaultEquity) ||
    accountValue * vaultDetails.leaderFraction;
  const monthlyProfitLoss = getLatestValue(monthPortfolio?.pnlHistory);
  const totalProfitLoss = getLatestValue(allTimePortfolio?.pnlHistory);
  const monthlyBase = getBaseValue(accountValue, monthlyProfitLoss);
  const totalBase = getBaseValue(accountValue, totalProfitLoss);
  const maxVaultCapacity = leaderEquity > 0 ? leaderEquity / 0.05 : 0;
  const capacityRemaining = Math.max(maxVaultCapacity - accountValue, 0);
  const capacityUsedPct = maxVaultCapacity > 0 ? accountValue / maxVaultCapacity : 0;

  const positions = clearinghouseState.assetPositions.map(({ position }) => {
    const size = toNumber(position.szi);

    return {
      coin: position.coin,
      side: formatPositionSide(size),
      size,
      leverage: position.leverage.value,
      marginMode: position.leverage.type,
      entryPrice: toNumber(position.entryPx),
      positionValue: toNumber(position.positionValue),
      unrealizedPnl: toNumber(position.unrealizedPnl),
      liquidationPrice: toNumber(position.liquidationPx),
      returnOnEquity: toNumber(position.returnOnEquity),
      marginUsed: toNumber(position.marginUsed),
      maxLeverage: position.maxLeverage,
    };
  });

  return {
    name: vaultDetails.name,
    vaultAddress: vaultDetails.vaultAddress,
    leader: vaultDetails.leader,
    description: vaultDetails.description,
    accountValue,
    totalNotionalPosition: toNumber(clearinghouseState.marginSummary.totalNtlPos),
    totalMarginUsed: toNumber(clearinghouseState.marginSummary.totalMarginUsed),
    withdrawable: toNumber(clearinghouseState.withdrawable),
    openPositionsCount: positions.length,
    totalProfitLoss,
    totalProfitLossPct: totalBase ? totalProfitLoss / totalBase : 0,
    monthlyProfitLoss,
    monthlyReturnPct: monthlyBase ? monthlyProfitLoss / monthlyBase : 0,
    apr: vaultDetails.apr,
    estimatedMonthlyYield: vaultDetails.apr / 12,
    leaderFraction: vaultDetails.leaderFraction,
    leaderCommission: vaultDetails.leaderCommission,
    leaderEquity,
    followerCount: vaultDetails.followers.length,
    allowDeposits: vaultDetails.allowDeposits,
    isClosed: vaultDetails.isClosed,
    maxDistributable: toNumber(vaultDetails.maxDistributable),
    maxWithdrawable: toNumber(vaultDetails.maxWithdrawable),
    capacityRemaining,
    capacityUsedPct,
    maxVaultCapacity,
    positions,
    updatedAt: clearinghouseState.time,
  };
}
