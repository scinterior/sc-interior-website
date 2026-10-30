"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { company, type Language } from "@/lib/content";

export default function Quotation({ lang }: { lang: Language }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "manual">(
    "idle",
  );
  const t = (th: string, en: string) => (lang === "th" ? th : en);
  const jobTypes = [
    ["interior", "ออกแบบตกแต่งภายใน", "Interior Design"],
    ["builtin", "เฟอร์นิเจอร์บิ้วอิน", "Built-in Furniture"],
    ["renovation", "งานรีโนเวท", "Renovation"],
    ["custom", "เฟอร์นิเจอร์สั่งผลิต", "Custom Furniture"],
    ["consultation", "ต้องการคำปรึกษา", "Need advice"],
  ];
  return (
    <form
      className="quotation"
      onChange={() => {
        setMessage("");
        setCopyStatus("idle");
      }}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const value = (key: string) =>
          String(data.get(key) ?? "").trim() ||
          t("ยังไม่ระบุ", "Not specified");
        const jobType = jobTypes.find((job) => job[0] === data.get("jobType"));
        const area = data.get("area")
          ? `${value("area")} ${t("ตร.ม.", "sqm")}`
          : t("ยังไม่ระบุ", "Not specified");
        const budget = data.get("budget")
          ? `${value("budget")} ${t("บาท", "THB")}`
          : t("ยังไม่ระบุ", "Not specified");
        setMessage(
          [
            t("ขอประเมินราคา SC Interior", "SC Interior quotation request"),
            `${t("ชื่อผู้ติดต่อ", "Contact name")}: ${value("name")}`,
            `${t("เบอร์โทรศัพท์", "Phone")}: ${value("phone")}`,
            `${t("สถานที่ติดตั้ง", "Installation location")}: ${value("location")}`,
            `${t("ประเภทงาน", "Work type")}: ${jobType?.[lang === "th" ? 1 : 2] ?? value("jobType")}`,
            `${t("ขนาดพื้นที่โดยประมาณ", "Approximate area")}: ${area}`,
            `${t("งบประมาณ", "Budget")}: ${budget}`,
            `${t("รายละเอียดเพิ่มเติม", "Additional details")}: ${value("details")}`,
          ].join("\n"),
        );
        setCopyStatus("idle");
      }}
    >
      <h3>{t("ขอประเมินราคา", "Request a quotation")}</h3>
      <p className="form-intro">
        {t(
          "เตรียมรายละเอียดสำหรับพูดคุยกับทีมงาน ช่องที่มี * จำเป็นต้องกรอก",
          "Prepare your details for our team. Fields marked * are required.",
        )}
      </p>
      <div className="form-row">
        <label>
          {t("ชื่อผู้ติดต่อ", "Contact name")} *
          <input
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={t("ชื่อ – นามสกุล", "Full name")}
          />
        </label>
        <label>
          {t("เบอร์โทรศัพท์", "Phone number")} *
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            pattern="\+?[0-9\s\-]{8,20}"
            maxLength={21}
            placeholder="081-576-0104"
          />
        </label>
      </div>
      <label>
        {t("สถานที่ติดตั้ง", "Installation location")} *
        <input
          name="location"
          required
          maxLength={250}
          autoComplete="street-address"
          placeholder={t(
            "จังหวัด / เขต / ชื่อโครงการ",
            "Province / district / project location",
          )}
        />
      </label>
      <label>
        {t("ประเภทงาน", "Work type")} *
        <select name="jobType" required defaultValue="">
          <option value="" disabled>
            {t("เลือกบริการที่สนใจ", "Select a service")}
          </option>
          {jobTypes.map(([value, th, en]) => (
            <option value={value} key={value}>
              {t(th, en)}
            </option>
          ))}
        </select>
      </label>
      <div className="form-row">
        <label>
          {t("ขนาดพื้นที่โดยประมาณ (ตร.ม.)", "Approximate area (sqm)")}
          <input
            name="area"
            type="number"
            inputMode="decimal"
            min="0.1"
            step="0.1"
            max="1000000"
            placeholder={t("เช่น 30", "e.g. 30")}
          />
        </label>
        <label>
          {t("งบประมาณ (บาท)", "Budget (THB)")}
          <input
            name="budget"
            type="number"
            inputMode="numeric"
            min="0"
            max="10000000000"
            step="1"
            placeholder={t("งบประมาณเบื้องต้น", "Your estimated budget")}
          />
        </label>
      </div>
      <label>
        {t("รายละเอียดเพิ่มเติม", "Additional details")}
        <textarea
          name="details"
          rows={3}
          maxLength={2000}
          placeholder={t(
            "ความต้องการ สไตล์ที่ชอบ และช่วงเวลาที่ต้องการ…",
            "Your requirements, preferred style and timeline…",
          )}
        />
      </label>
      <p className="form-disclosure" id="quotation-disclosure">
        {t(
          "แบบฟอร์มนี้เตรียมข้อความบนอุปกรณ์ของคุณเท่านั้น ยังไม่มีการส่งหรือบันทึกข้อมูลถึงบริษัท กรุณาคัดลอกข้อความ แล้วติดต่อทีมงานผ่าน Facebook หรือโทรศัพท์",
          "This form only prepares a message on your device. It does not send or store your information with the company. Copy the message, then contact our team through Facebook or by phone.",
        )}
      </p>
      <button
        className="button orange"
        type="submit"
        disabled={!ready}
        aria-describedby="quotation-disclosure"
      >
        {t("เตรียมข้อความขอประเมินราคา", "Prepare quotation request")}
        <ArrowUpRight size={18} />
      </button>
      <noscript>
        <p className="form-disclosure">
          {t(
            "กรุณาเปิด JavaScript เพื่อเตรียมข้อความ หรือติดต่อทีมงานทางโทรศัพท์",
            "Please enable JavaScript to prepare a message, or contact us by phone.",
          )}
        </p>
      </noscript>
      {message && (
        <div className="form-result">
          <p role="status">
            {t(
              "ข้อความพร้อมคัดลอก — ยังไม่ได้ส่งถึงบริษัท",
              "Ready to copy — not sent to the company",
            )}
          </p>
          <label>
            {t("รายละเอียดที่เตรียมไว้", "Prepared details")}
            <textarea
              readOnly
              value={message}
              rows={9}
              onFocus={(event) => event.target.select()}
            />
          </label>
          <button
            type="button"
            className="text-link"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(message);
                setCopyStatus("copied");
              } catch {
                setCopyStatus("manual");
              }
            }}
          >
            {copyStatus === "copied"
              ? t("คัดลอกแล้ว", "Copied")
              : t("คัดลอกข้อความ", "Copy message")}
            <ArrowUpRight size={16} />
          </button>
          <a
            href={company.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {t("เปิด Facebook เพื่อติดต่อ", "Contact via Facebook")}
            <ArrowUpRight size={16} />
          </a>
          <a href={"tel:" + company.telephone} className="text-link">
            {t("โทรติดต่อทีมงาน", "Call our team")}
            <Phone size={16} />
          </a>
          <p role="status" className="copy-status">
            {copyStatus === "manual"
              ? t(
                  "คัดลอกอัตโนมัติไม่ได้ กรุณาเลือกและคัดลอกข้อความในช่องด้านบน",
                  "Automatic copying is unavailable. Select and copy the text above.",
                )
              : copyStatus === "copied"
                ? t(
                    "คัดลอกข้อความแล้ว กรุณาติดต่อทีมงานเพื่อส่งรายละเอียด",
                    "Copied. Please contact our team to share your details.",
                  )
                : ""}
          </p>
        </div>
      )}
    </form>
  );
}
