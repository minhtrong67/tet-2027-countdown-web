import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, Link as LinkIcon, Sparkles } from "lucide-react";

import tetStillLife from "@/assets/tet-countdown.jpg";
import { Button } from "@/components/ui/button";
import { getTetCountdown } from "@/lib/tet-countdown";

const TIME_UNITS = [
  { key: "days", label: "Ngày" },
  { key: "hours", label: "Giờ" },
  { key: "minutes", label: "Phút" },
  { key: "seconds", label: "Giây" },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Đếm ngược đến Tết Nguyên Đán 2027 — Tết Đinh Mùi" },
      {
        name: "description",
        content: "Cùng đếm từng ngày, từng giờ đến giao thừa và Tết Nguyên Đán Đinh Mùi 2027.",
      },
      { property: "og:title", content: "Đếm ngược đến Tết Nguyên Đán 2027 — Tết Đinh Mùi" },
      {
        property: "og:description",
        content: "Cùng đếm từng ngày, từng giờ đến giao thừa và Tết Nguyên Đán Đinh Mùi 2027.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TetCountdownPage,
});

function TetCountdownPage() {
  const [countdown, setCountdown] = useState(() => getTetCountdown(0));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getTetCountdown(Date.now()));
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, []);

  async function shareCountdown() {
    const shareData = {
      title: "Đếm ngược đến Tết Nguyên Đán 2027",
      text: "Cùng đếm ngược đến Tết Đinh Mùi 2027 nhé!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="tet-page">
      <section className="tet-hero" aria-labelledby="tet-title">
        <img
          className="tet-photograph"
          src={tetStillLife}
          alt="Cành mai vàng, hoa đào và bao lì xì đỏ đón Tết"
          width={1440}
          height={1200}
          fetchPriority="high"
        />
        <div className="tet-wash" aria-hidden="true" />

        <div className="tet-content">
          <header className="tet-header">
            <a className="tet-mark" href="#tet-title" aria-label="Tết Việt 2027, về đầu trang">
              <span className="tet-mark-icon" aria-hidden="true">
                <Sparkles size={17} strokeWidth={1.5} />
              </span>
              <span>TẾT VIỆT</span>
            </a>
            <span className="tet-header-date">XUÂN ĐINH MÙI <span>·</span> 2027</span>
          </header>

          <div className="tet-copy">
            <p className="tet-eyebrow"><span /> MỘT MÙA XUÂN ĐANG ĐẾN</p>
            <h1 id="tet-title">Tết này,<br /><span>mình về nhà.</span></h1>
            <p className="tet-description">
              Một năm mới đang đến gần. Đếm ngược đến khoảnh khắc sum vầy đầu xuân.
            </p>

            <div className="tet-target-date">
              <span className="tet-date-rule" aria-hidden="true" />
              <div>
                <p className="tet-date-label">MÙNG MỘT TẾT NGUYÊN ĐÁN</p>
                <p className="tet-date-value">Thứ Bảy, 06 tháng 02, 2027</p>
              </div>
            </div>

            <div className="tet-countdown" aria-label="Thời gian còn lại đến Tết Nguyên Đán 2027">
              {TIME_UNITS.map(({ key, label }) => (
                <div className="tet-unit" key={key}>
                  <span className="tet-unit-number" aria-hidden="true">
                    {countdown.isComplete ? "00" : String(countdown[key]).padStart(2, "0")}
                  </span>
                  <span className="tet-unit-label">{label}</span>
                </div>
              ))}
            </div>

            <p className="tet-status" aria-live="off">
              <span className="tet-status-dot" />
              {countdown.isComplete ? "Chúc mừng năm mới Đinh Mùi!" : "Đếm từng giây, mong ngày đoàn viên"}
            </p>

            <Button className="tet-share" size="lg" onClick={shareCountdown}>
              {copied ? <Check size={16} /> : <LinkIcon size={16} />}
              {copied ? "Đã sao chép liên kết" : "Chia sẻ khoảnh khắc"}
              {!copied && <ArrowUpRight className="tet-share-arrow" size={15} />}
            </Button>
          </div>

          <footer className="tet-footer">
            <span>GỬI MỘT CHÚT XUÂN ĐẾN NGƯỜI THƯƠNG</span>
            <span>VIỆT NAM <span aria-hidden="true">✳</span> UTC+7</span>
          </footer>
        </div>
      </section>
      <div className="tet-bottom-rule" aria-hidden="true" />
    </main>
  );
}