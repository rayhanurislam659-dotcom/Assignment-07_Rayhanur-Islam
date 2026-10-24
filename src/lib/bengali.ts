import type {
  ChangeDirection,
  MarketPrice,
  MarketStats,
  Product,
} from "@/lib/types";

const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)]);
}

export function formatBengaliNumber(value: number): string {
  if (!Number.isFinite(value)) return "০";
  const rounded = Math.round(value * 100) / 100;
  const grouped = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(rounded);
  return toBengaliDigits(grouped);
}

export function formatTaka(value: number): string {
  return `${formatBengaliNumber(value)} টাকা`;
}

export function formatPercent(value: number): string {
  const absolute = Math.round(Math.abs(value) * 10) / 10;
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(absolute);
  return `${toBengaliDigits(formatted)}%`;
}

export function formatDateBn(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(date);
  } catch {
    return toBengaliDigits(
      new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(date),
    );
  }
}

type ChangeMeta = {
  symbol: string;
  direction: ChangeDirection;
  label: string;
  textClass: string;
  softClass: string;
};

export function getChangeMeta(direction: ChangeDirection): ChangeMeta {
  if (direction === "up") {
    return {
      symbol: "▲",
      direction,
      label: "বেড়েছে",
      textClass: "text-up",
      softClass: "bg-up-soft text-up",
    };
  }
  if (direction === "down") {
    return {
      symbol: "▼",
      direction,
      label: "কমেছে",
      textClass: "text-down",
      softClass: "bg-down-soft text-down",
    };
  }
  return {
    symbol: "—",
    direction,
    label: "অপরিবর্তিত",
    textClass: "text-flat",
    softClass: "bg-flat-soft text-flat",
  };
}

const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function getUnitLabel(unit: string): string {
  return UNIT_LABELS[unit] ?? `প্রতি ${unit}`;
}

export function getUnitShort(unit: string): string {
  return UNIT_SHORT[unit] ?? unit;
}

export function getMarketStats(product: Product): MarketStats {
  const markets: MarketPrice[] = product.markets ?? [];
  if (markets.length === 0) {
    return {
      min: product.today,
      max: product.today,
      avg: product.today,
      marketCount: 0,
      divisionCount: 0,
    };
  }

  const min = Math.min(...markets.map((market) => market.min));
  const max = Math.max(...markets.map((market) => market.max));
  const averageMidPrice =
    markets.reduce((total, market) => total + (market.min + market.max) / 2, 0) /
    markets.length;

  return {
    min,
    max,
    avg: Math.round(averageMidPrice),
    marketCount: markets.length,
    divisionCount: new Set(markets.map((market) => market.division)).size,
  };
}

export function groupMarketsByDivision(markets: MarketPrice[]) {
  const groups = new Map<string, MarketPrice[]>();
  for (const market of markets) {
    const current = groups.get(market.division) ?? [];
    current.push(market);
    groups.set(market.division, current);
  }
  return Array.from(groups, ([division, items]) => ({ division, markets: items }));
}

export function buildMarketSummary(product: Product): string {
  const stats = getMarketStats(product);
  const unit = getUnitShort(product.unit);
  const direction =
    product.change.dir === "up"
      ? "বেড়েছে"
      : product.change.dir === "down"
        ? "কমেছে"
        : "অপরিবর্তিত আছে";

  return `আজ ${stats.divisionCount}টি বিভাগের ${stats.marketCount}টি বাজারে ${product.nameBn}-এর দাম প্রতি ${unit} গড়ে ${formatBengaliNumber(stats.avg)} টাকা। গতকালের তুলনায় দাম ${formatPercent(product.change.pct)} ${direction}।`;
}

export function getPricePosition(
  market: MarketPrice,
  globalMin: number,
  globalMax: number,
): number {
  if (globalMax === globalMin) return 50;
  const mid = (market.min + market.max) / 2;
  return Math.min(96, Math.max(4, ((mid - globalMin) / (globalMax - globalMin)) * 100));
}
