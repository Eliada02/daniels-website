import { TreasureChest } from "@/components/hero/treasure-chest";
import { cssVars } from "@/lib/css";
import { siteConfig } from "@/lib/site-config";

const { chartBars, chartLabels } = siteConfig.loader;

/** Branded loader scene — hero chest + solution-style growth chart. */
export function LoaderVisual() {
  return (
    <div className="flex w-full max-w-[min(92vw,400px)] flex-col items-center">
      <div
        className="dg-loader-chest relative flex h-[168px] w-full items-end justify-center overflow-hidden pt-2 sm:h-[178px]"
        aria-hidden
      >
        <div className="origin-bottom scale-[0.48] sm:scale-[0.54]">
          <TreasureChest />
        </div>
      </div>

      <div className="dg-loader-chart mt-3 w-full max-w-[248px] rounded-lg border border-cream/[0.14] bg-forest/50 p-4 backdrop-blur-sm">
        <div className="flex h-[76px] items-end gap-2.5">
          {chartBars.map((bar, i) => (
            <div
              key={i}
              data-loader-grow
              style={cssVars({
                "--h": bar.h,
                "--bar-delay": bar.delay,
                height: 0,
                background: bar.bg,
              })}
              className="dg-loader-grow-bar flex-1 rounded-t-[4px]"
            />
          ))}
        </div>
        <div className="mt-2.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-cream/50">
          {chartLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
