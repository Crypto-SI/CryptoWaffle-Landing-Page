'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type VaultSectionProps = {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

type VaultSnapshot = {
  accountValue: number;
  totalProfitLoss: number;
  monthlyReturnPct: number;
  capacityRemaining: number;
  capacityUsedPct: number;
  openPositionsCount: number;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatSignedCurrency(value: number) {
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${formatCurrency(Math.abs(value))}`;
}

function getPnlClassName(value: number) {
  return value >= 0 ? 'text-green-400' : 'text-red-400';
}

export const VaultSection = ({ isHovered, onHoverChange }: VaultSectionProps) => {
  const [snapshot, setSnapshot] = useState<VaultSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadSnapshot = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/vault');

        if (!response.ok) {
          throw new Error('Failed to fetch vault snapshot');
        }

        const data = (await response.json()) as VaultSnapshot;

        if (isMounted) {
          setSnapshot(data);
          setHasError(false);
        }
      } catch (error) {
        console.error('Error loading vault snapshot:', error);
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSnapshot();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-almost-black via-dark-grey to-almost-black shadow-2xl"
    >
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-white/10 p-8 md:p-10 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-sm uppercase tracking-[0.28em] text-teal">Hyperliquid Vault</p>
          <AnimatedHeading
            text="Follow CryptoWaffle"
            className="text-3xl md:text-4xl font-bold mb-4 inline-flex text-yellow"
            isHovered={isHovered}
            onHoverChange={onHoverChange}
          />
          <p className="max-w-2xl text-lg text-light-grey">
            Track the CryptoWaffle Hyperliquid vault directly from the landing page. Visitors can see the latest
            snapshot, gauge how much room is left to join, and jump through to the full vault page for live positions.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-almost-black/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-light-grey/60">Account Value</p>
              <p className="mt-3 text-3xl font-bold text-yellow">
                {snapshot ? formatCurrency(snapshot.accountValue) : isLoading ? 'Loading...' : 'Unavailable'}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-almost-black/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-light-grey/60">Space Left</p>
              <p className="mt-3 text-3xl font-bold text-yellow">
                {snapshot ? formatCurrency(snapshot.capacityRemaining) : isLoading ? 'Loading...' : 'Unavailable'}
              </p>
              {snapshot && (
                <p className="mt-2 text-sm text-light-grey/70">
                  {formatPercent(snapshot.capacityUsedPct)} of current capacity filled
                </p>
              )}
            </div>
            <div className="rounded-xl border border-white/10 bg-almost-black/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-light-grey/60">Total P/L</p>
              <p
                className={`mt-3 text-3xl font-bold ${
                  snapshot ? getPnlClassName(snapshot.totalProfitLoss) : 'text-light-grey'
                }`}
              >
                {snapshot ? formatSignedCurrency(snapshot.totalProfitLoss) : isLoading ? 'Loading...' : 'Unavailable'}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-almost-black/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-light-grey/60">Open Positions</p>
              <p className="mt-3 text-3xl font-bold text-yellow">
                {snapshot ? snapshot.openPositionsCount : isLoading ? 'Loading...' : 'Unavailable'}
              </p>
              {snapshot && (
                <p className={`mt-2 text-sm ${getPnlClassName(snapshot.monthlyReturnPct)}`}>
                  30D performance {formatPercent(snapshot.monthlyReturnPct)}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/vault"
              className="inline-flex items-center rounded-md bg-teal px-6 py-3 font-bold text-almost-black transition-all duration-300 hover:bg-opacity-90"
            >
              View Vault Page
            </Link>
            <a
              href="https://app.hyperliquid.xyz/vaults/0x942ef466282c90086b06345e662f3f269edafa51"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-teal px-6 py-3 font-bold text-teal transition-all duration-300 hover:bg-teal hover:text-almost-black"
            >
              Follow on Hyperliquid
            </a>
          </div>

          {hasError && (
            <p className="mt-4 text-sm text-red-400">
              Live vault data is temporarily unavailable. The full vault page will retry automatically on reload.
            </p>
          )}
        </div>

        <div className="p-8 md:p-10">
          <div className="flex h-full flex-col rounded-2xl border border-dashed border-teal/40 bg-almost-black/50 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-teal">Tutorial Video</p>
            <h3 className="mt-4 text-2xl font-bold text-yellow">Embed coming soon</h3>
            <p className="mt-4 max-w-lg text-light-grey/85">
              This panel is reserved for a vault walkthrough or onboarding tutorial. When the video is ready, we can
              replace this placeholder with an embedded player and supporting copy.
            </p>
            <div className="mt-8 flex min-h-[220px] flex-1 items-center justify-center rounded-2xl border border-white/10 bg-dark-grey/40">
              <div className="text-center">
                <p className="text-lg font-semibold text-light-grey">Tutorial slot reserved</p>
                <p className="mt-2 text-sm text-mid-grey">Drop in a YouTube or Hyperliquid explainer later.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
