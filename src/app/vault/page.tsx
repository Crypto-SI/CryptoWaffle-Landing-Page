import Navigation from '../../components/Navigation';
import ClientFooter from '../../components/ClientFooter';
import {
  CRYPTOWAFFLE_VAULT_NAME,
  CRYPTOWAFFLE_VAULT_ADDRESS,
  HYPERLIQUID_VAULTS_URL,
  getVaultSnapshot,
  type VaultPosition,
} from '../../lib/hyperliquid';

export const revalidate = 60;

function formatCurrency(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
  }).format(value);
}

function formatPercent(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat('en-GB', {
    style: 'percent',
    maximumFractionDigits,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatSignedCurrency(value: number) {
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${formatCurrency(Math.abs(value))}`;
}

function formatSignedPercent(value: number, maximumFractionDigits = 2) {
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${formatPercent(Math.abs(value), maximumFractionDigits)}`;
}

function formatPositionSize(position: VaultPosition) {
  return `${Math.abs(position.size).toFixed(5)} ${position.coin}`;
}

function getPnlClassName(value: number) {
  return value >= 0 ? 'text-green-400' : 'text-red-400';
}

function descriptionToParagraphs(description: string) {
  return description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export default async function VaultPage() {
  const snapshot = await getVaultSnapshot();
  const descriptionLines = descriptionToParagraphs(snapshot.description);
  const updatedAt = new Date(snapshot.updatedAt).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-almost-black text-light-grey">
        <section className="border-b border-white/10 px-4 pb-12 pt-28 md:px-8 md:pb-16">
          <div className="container mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-teal">Hyperliquid Vault</p>
              <h1 className="mb-6 text-4xl font-bold text-yellow md:text-6xl">
                Follow the {snapshot.name} vault in real time
              </h1>
              <p className="max-w-3xl text-lg text-light-grey/90 md:text-xl">
                Track open positions, estimated monthly yield, and total profit and loss for the
                CryptoWaffle Hyperliquid vault from one public page.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={HYPERLIQUID_VAULTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Follow on Hyperliquid
                </a>
                <a
                  href={`https://app.hyperliquid.xyz/explorer/address/${snapshot.leader}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View Vault Leader
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-dark-grey/40 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-teal">Vault Snapshot</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-almost-black/60 p-4">
                  <p className="text-sm text-light-grey/70">Account value</p>
                  <p className="mt-2 text-2xl font-bold text-yellow">{formatCurrency(snapshot.accountValue)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-almost-black/60 p-4">
                  <p className="text-sm text-light-grey/70">Open positions</p>
                  <p className="mt-2 text-2xl font-bold text-yellow">{snapshot.openPositionsCount}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-almost-black/60 p-4">
                  <p className="text-sm text-light-grey/70">Followers</p>
                  <p className="mt-2 text-2xl font-bold text-yellow">{snapshot.followerCount}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-almost-black/60 p-4">
                  <p className="text-sm text-light-grey/70">Last updated</p>
                  <p className="mt-2 text-sm font-medium text-light-grey">{updatedAt}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <article className="rounded-3xl border border-white/10 bg-dark-grey/40 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-teal">Monthly Yield Est.</p>
                <p className="mt-4 text-4xl font-bold text-yellow">
                  {formatPercent(snapshot.estimatedMonthlyYield)}
                </p>
                <p className="mt-3 text-sm text-light-grey/75">
                  Estimated from the current Hyperliquid APR of {formatPercent(snapshot.apr)}.
                </p>
              </article>

              <article className="rounded-3xl border border-white/10 bg-dark-grey/40 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-teal">Total P/L</p>
                <p className={`mt-4 text-4xl font-bold ${getPnlClassName(snapshot.totalProfitLoss)}`}>
                  {formatSignedCurrency(snapshot.totalProfitLoss)}
                </p>
                <p className="mt-3 text-sm text-light-grey/75">
                  Since launch: {formatSignedPercent(snapshot.totalProfitLossPct)}
                </p>
              </article>

              <article className="rounded-3xl border border-white/10 bg-dark-grey/40 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-teal">30D Performance</p>
                <p className={`mt-4 text-4xl font-bold ${getPnlClassName(snapshot.monthlyProfitLoss)}`}>
                  {formatSignedPercent(snapshot.monthlyReturnPct)}
                </p>
                <p className="mt-3 text-sm text-light-grey/75">
                  Current month P/L: {formatSignedCurrency(snapshot.monthlyProfitLoss)}
                </p>
              </article>

              <article className="rounded-3xl border border-white/10 bg-dark-grey/40 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-teal">Exposure</p>
                <p className="mt-4 text-4xl font-bold text-yellow">
                  {formatCompactCurrency(snapshot.totalNotionalPosition)}
                </p>
                <p className="mt-3 text-sm text-light-grey/75">
                  Margin used: {formatCurrency(snapshot.totalMarginUsed)}
                </p>
              </article>

              <article className="rounded-3xl border border-white/10 bg-dark-grey/40 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-teal">Space Left</p>
                <p className="mt-4 text-4xl font-bold text-yellow">
                  {formatCompactCurrency(snapshot.capacityRemaining)}
                </p>
                <p className="mt-3 text-sm text-light-grey/75">
                  {formatPercent(snapshot.capacityUsedPct)} of the current vault capacity is filled.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12 md:px-8">
          <div className="container mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-dark-grey/40">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-sm uppercase tracking-[0.25em] text-teal">Current Positions</p>
                <h2 className="mt-2 text-3xl font-bold text-yellow">Open market exposure</h2>
              </div>

              {snapshot.positions.length === 0 ? (
                <div className="px-6 py-10 text-light-grey/75">No open positions right now.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-almost-black/40 text-sm uppercase tracking-[0.2em] text-light-grey/65">
                      <tr>
                        <th className="px-6 py-4 font-medium">Asset</th>
                        <th className="px-6 py-4 font-medium">Side</th>
                        <th className="px-6 py-4 font-medium">Size</th>
                        <th className="px-6 py-4 font-medium">Entry</th>
                        <th className="px-6 py-4 font-medium">Value</th>
                        <th className="px-6 py-4 font-medium">Unrealized P/L</th>
                        <th className="px-6 py-4 font-medium">Liquidation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {snapshot.positions.map((position) => (
                        <tr key={`${position.coin}-${position.side}`} className="border-t border-white/10">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-yellow">{position.coin}</p>
                            <p className="text-sm text-light-grey/70">
                              {position.marginMode} {position.leverage}x
                            </p>
                          </td>
                          <td className="px-6 py-4">{position.side}</td>
                          <td className="px-6 py-4">{formatPositionSize(position)}</td>
                          <td className="px-6 py-4">{formatCurrency(position.entryPrice)}</td>
                          <td className="px-6 py-4">{formatCurrency(position.positionValue)}</td>
                          <td className={`px-6 py-4 font-semibold ${getPnlClassName(position.unrealizedPnl)}`}>
                            <div>{formatSignedCurrency(position.unrealizedPnl)}</div>
                            <div className="text-sm text-light-grey/70">
                              {formatSignedPercent(position.returnOnEquity)}
                            </div>
                          </td>
                          <td className="px-6 py-4">{formatCurrency(position.liquidationPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <section className="rounded-3xl border border-white/10 bg-dark-grey/40 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-teal">Vault Details</p>
                <h2 className="mt-2 text-3xl font-bold text-yellow">{CRYPTOWAFFLE_VAULT_NAME}</h2>
                <div className="mt-5 space-y-3 text-light-grey/85">
                  {descriptionLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-dark-grey/40 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-teal">Operational Stats</p>
                <dl className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-light-grey/70">Vault address</dt>
                    <dd className="text-right text-sm font-medium text-light-grey">
                      {CRYPTOWAFFLE_VAULT_ADDRESS.slice(0, 8)}...{CRYPTOWAFFLE_VAULT_ADDRESS.slice(-6)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-light-grey/70">Leader commission</dt>
                    <dd className="font-semibold text-yellow">{formatPercent(snapshot.leaderCommission)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-light-grey/70">Leader capital</dt>
                    <dd className="font-semibold text-yellow">{formatPercent(snapshot.leaderFraction)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-light-grey/70">Leader equity</dt>
                    <dd className="font-semibold text-light-grey">
                      {formatCurrency(snapshot.leaderEquity)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-light-grey/70">Max vault size at 5%</dt>
                    <dd className="font-semibold text-light-grey">
                      {formatCurrency(snapshot.maxVaultCapacity)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-light-grey/70">Max distributable</dt>
                    <dd className="font-semibold text-light-grey">
                      {formatCurrency(snapshot.maxDistributable)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-light-grey/70">Deposits</dt>
                    <dd className={`font-semibold ${snapshot.allowDeposits ? 'text-teal' : 'text-red-400'}`}>
                      {snapshot.allowDeposits ? 'Open' : 'Closed'}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-light-grey/70">Vault status</dt>
                    <dd className={`font-semibold ${snapshot.isClosed ? 'text-red-400' : 'text-teal'}`}>
                      {snapshot.isClosed ? 'Closed' : 'Active'}
                    </dd>
                  </div>
                </dl>
              </section>
            </aside>
          </div>
        </section>
      </main>
      <ClientFooter />
    </>
  );
}
