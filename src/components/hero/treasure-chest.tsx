import type { CSSProperties } from "react";

/**
 * Animated CSS-3D treasure chest for the hero. Built from real 3D cube faces
 * (body + hinged lid) inside a `preserve-3d` scene, looping open → coins &
 * gold light spill out → closed. Thematic nod to "il capitale bloccato …
 * trasformato": locked capital released as cash. Pure CSS, no JS; respects
 * prefers-reduced-motion (see globals.css → .dg-chest).
 */

const WOOD_FRONT =
  "linear-gradient(180deg,#0f4d45 0%,#0a3833 55%,#072a26 100%), repeating-linear-gradient(90deg,rgba(0,0,0,.22) 0 1px,transparent 1px 24px)";
const WOOD_SIDE =
  "linear-gradient(180deg,#0a3a34 0%,#062521 100%), repeating-linear-gradient(90deg,rgba(0,0,0,.28) 0 1px,transparent 1px 22px)";
const WOOD_DARK = "linear-gradient(180deg,#0a3833,#051f1c)";
const METAL =
  "linear-gradient(180deg,#eaf5c6 0%,#cfe39a 45%,#86a94e 100%)";

type FaceProps = {
  w: number;
  h: number;
  transform: string;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

function Face({ w, h, transform, style, className, children }: FaceProps) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: w,
        height: h,
        transform: `translate(-50%,-50%) ${transform}`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Body cube dimensions
const W = 168;
const H = 104;
const D = 116;
// Lid cube dimensions
const LH = 58;

// Burst of gold coins — cx/cy = landing arc (px), cr spin, cz 3D tumble, z depth.
const coins = [
  { cx: -4, cy: -188, cr: -120, cz: "-55deg", z: 36, size: 30, delay: "0s" },
  { cx: -72, cy: -162, cr: 280, cz: "48deg", z: 22, size: 26, delay: "0.04s" },
  { cx: 68, cy: -156, cr: -300, cz: "-62deg", z: 18, size: 24, delay: "0.07s" },
  { cx: -108, cy: -118, cr: 340, cz: "72deg", z: -14, size: 22, delay: "0.11s" },
  { cx: 102, cy: -112, cr: -260, cz: "-38deg", z: -20, size: 20, delay: "0.14s" },
  { cx: -38, cy: -142, cr: -200, cz: "34deg", z: 28, size: 24, delay: "0.02s" },
  { cx: 34, cy: -148, cr: 220, cz: "-44deg", z: 24, size: 22, delay: "0.05s" },
  { cx: -88, cy: -78, cr: 180, cz: "58deg", z: 32, size: 18, delay: "0.16s" },
  { cx: 92, cy: -72, cr: -190, cz: "-52deg", z: 30, size: 18, delay: "0.18s" },
  { cx: -52, cy: -196, cr: -340, cz: "66deg", z: 14, size: 20, delay: "0.09s" },
  { cx: 48, cy: -192, cr: 310, cz: "-70deg", z: 12, size: 20, delay: "0.1s" },
  { cx: -124, cy: -52, cr: 420, cz: "82deg", z: -28, size: 16, delay: "0.2s" },
  { cx: 118, cy: -48, cr: -400, cz: "-78deg", z: -26, size: 16, delay: "0.22s" },
  { cx: -18, cy: -128, cr: 160, cz: "28deg", z: 38, size: 28, delay: "0.03s" },
  { cx: 14, cy: -134, cr: -140, cz: "-32deg", z: 34, size: 26, delay: "0.06s" },
  { cx: -64, cy: -58, cr: -260, cz: "46deg", z: 40, size: 14, delay: "0.24s" },
  { cx: 58, cy: -54, cr: 240, cz: "-42deg", z: 38, size: 14, delay: "0.26s" },
  { cx: 0, cy: -108, cr: 90, cz: "-24deg", z: 42, size: 16, delay: "0.12s" },
];

// Banknotes fluttering out.
const bills = [
  { bx: -58, by: -140, br: "-20deg", z: 22, delay: "0.06s" },
  { bx: 30, by: -160, br: "16deg", z: -10, delay: "0.18s" },
  { bx: -6, by: -180, br: "-6deg", z: 8, delay: "0.3s" },
];

export function TreasureChest() {
  return (
    <div aria-hidden className="dg-chest pointer-events-none select-none">
      <div
        data-anim="float"
        style={{
          position: "relative",
          width: W,
          height: H + LH,
          margin: "0 auto",
        }}
      >
        <div
          data-anim="sway"
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            data-anim="burst"
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
            }}
          >
          <div
            data-anim="shadow"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 190,
              height: 70,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center,rgba(0,0,0,.55),rgba(0,0,0,0) 70%)",
              filter: "blur(6px)",
              transform:
                "translate(-50%,-50%) translateY(92px) rotateX(90deg)",
            }}
          />

          {/* ===== BODY ===== */}
          {/* back + left first (drawn behind) */}
          <Face w={W} h={H} transform={`rotateY(180deg) translateZ(${D / 2}px)`} style={{ background: WOOD_DARK }} />
          <Face w={D} h={H} transform={`rotateY(-90deg) translateZ(${W / 2}px)`} style={{ background: WOOD_SIDE }} />
          {/* right */}
          <Face w={D} h={H} transform={`rotateY(90deg) translateZ(${W / 2}px)`} style={{ background: WOOD_SIDE }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(255,255,255,.05),transparent)" }} />
          </Face>
          {/* bottom */}
          <Face w={W} h={D} transform={`rotateX(-90deg) translateZ(${H / 2}px)`} style={{ background: WOOD_DARK }} />
          {/* interior bottom (visible when open) with gold pool */}
          <Face
            w={W - 18}
            h={D - 18}
            transform={`rotateX(90deg) translateZ(${H / 2 - 6}px)`}
            style={{
              background:
                "radial-gradient(ellipse at center,#f6e9a8,#cfe39a 45%,#3c5a2a 100%)",
            }}
          />
          {/* front */}
          <Face w={W} h={H} transform={`translateZ(${D / 2}px)`} style={{ background: WOOD_FRONT }}>
            {/* metal bands */}
            <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, width: 16, background: METAL, boxShadow: "inset 0 0 6px rgba(0,0,0,.25)" }} />
            <div style={{ position: "absolute", right: 14, top: 0, bottom: 0, width: 16, background: METAL, boxShadow: "inset 0 0 6px rgba(0,0,0,.25)" }} />
            {/* lock plate */}
            <div
              data-anim="lock"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 38,
                height: 44,
                transform: "translate(-50%,-50%)",
                borderRadius: 6,
                background: METAL,
                boxShadow: "inset 0 0 6px rgba(0,0,0,.3), 0 0 10px rgba(217,233,170,.35)",
              }}
            >
              {/* keyhole */}
              <div style={{ position: "absolute", left: "50%", top: 12, width: 8, height: 8, borderRadius: "50%", background: "#0a3833", transform: "translateX(-50%)" }} />
              <div style={{ position: "absolute", left: "50%", top: 18, width: 4, height: 12, background: "#0a3833", transform: "translateX(-50%)" }} />
            </div>
            {/* rivets */}
            {[ [22, 10], [22, H - 14], [W - 26, 10], [W - 26, H - 14] ].map(([l, t], i) => (
              <span key={i} style={{ position: "absolute", left: l, top: t, width: 5, height: 5, borderRadius: "50%", background: "#eaf5c6", boxShadow: "0 0 3px rgba(0,0,0,.4)" }} />
            ))}
          </Face>

          <div
            data-anim="glow"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 150,
              height: 150,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(246,233,168,.95),rgba(217,233,170,.4) 45%,rgba(217,233,170,0) 72%)",
              filter: "blur(4px)",
              transform: "translate(-50%,-50%) translateY(-52px) scale(0.6)",
            }}
          />

          {/* ===== COIN FOUNTAIN ===== */}
          {coins.map((c, i) => (
            <div
              key={`c${i}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 0,
                height: 0,
                transform: `translateY(-46px) translateZ(${c.z}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                data-anim="coin"
                style={
                  {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: c.size,
                    height: c.size,
                    borderRadius: "50%",
                    opacity: 0,
                    "--cx": `${c.cx}px`,
                    "--cy": `${c.cy}px`,
                    "--cr": `${c.cr}deg`,
                    "--cz": c.cz,
                    "--coin-delay": c.delay,
                  } as CSSProperties
                }
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 32% 28%,#fff9e8,#f2e6a8 38%,#c9d882 68%,#8fa854 100%)",
                    border: "2px solid #d4c47a",
                    boxShadow:
                      "0 3px 8px rgba(0,0,0,.35), inset 0 -3px 4px rgba(0,0,0,.18), inset 0 2px 3px rgba(255,255,255,.45)",
                  }}
                />
              </div>
            </div>
          ))}

          {/* ===== BANKNOTES ===== */}
          {bills.map((b, i) => (
            <div
              key={`b${i}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 0,
                height: 0,
                transform: `translateY(-46px) translateZ(${b.z}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                data-anim="bill"
                style={
                  {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    opacity: 0,
                    "--bx": `${b.bx}px`,
                    "--by": `${b.by}px`,
                    "--bill-delay": b.delay,
                  } as CSSProperties
                }
              >
                <div
                  data-anim="bill-face"
                  style={
                    {
                      width: 42,
                      height: 26,
                      borderRadius: 4,
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#0a3833",
                      background:
                        "linear-gradient(135deg,#eaf5c6,#cfe39a 55%,#a9cf72)",
                      border: "1px solid rgba(10,56,51,.35)",
                      boxShadow: "0 3px 7px rgba(0,0,0,.3)",
                      "--br": b.br,
                    } as CSSProperties
                  }
                >
                  €
                </div>
              </div>
            </div>
          ))}

          {/* ===== LID (hinged at the back-top edge) ===== */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transformStyle: "preserve-3d",
              transform: `translate(-50%,-50%) translateY(${-H / 2}px) translateZ(${-D / 2}px)`,
            }}
          >
            <div
              data-anim="lid"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  transformStyle: "preserve-3d",
                  transform: `translateY(${-LH / 2}px) translateZ(${D / 2}px)`,
                }}
              >
                {/* lid faces */}
                <Face w={W} h={LH} transform={`rotateY(180deg) translateZ(${D / 2}px)`} style={{ background: WOOD_DARK }} />
                <Face w={D} h={LH} transform={`rotateY(-90deg) translateZ(${W / 2}px)`} style={{ background: WOOD_SIDE }} />
                <Face w={D} h={LH} transform={`rotateY(90deg) translateZ(${W / 2}px)`} style={{ background: WOOD_SIDE }} />
                <Face w={W} h={D} transform={`rotateX(90deg) translateZ(${LH / 2}px)`} style={{ background: "linear-gradient(180deg,#11564d,#0b3a34)" }} />
                {/* underside of lid (seen when open) */}
                <Face w={W} h={D} transform={`rotateX(-90deg) translateZ(${LH / 2}px)`} style={{ background: "linear-gradient(180deg,#0c443d,#08302b)" }} />
                {/* lid front */}
                <Face w={W} h={LH} transform={`translateZ(${D / 2}px)`} style={{ background: "linear-gradient(180deg,#10534b,#0a352f)" }}>
                  <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, width: 16, background: METAL }} />
                  <div style={{ position: "absolute", right: 14, top: 0, bottom: 0, width: 16, background: METAL }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, background: METAL, opacity: 0.9 }} />
                </Face>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
