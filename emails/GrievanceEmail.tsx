import React from "react";
import { VisitorRequest } from "@/types/visitor-request";

export function GrievanceEmail({
  name,
  age,
  location,
  email,
  grievance,
  submittedAt,
}: VisitorRequest) {
  return (
    <div
      style={{
        backgroundColor: "#0C0E14",
        color: "#E2E8F0",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "32px 16px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          backgroundColor: "#161923",
          border: "1px solid #3A4054",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#1A1D2B",
            borderBottom: "1px solid #232838",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              width: "48px",
              height: "48px",
              lineHeight: "48px",
              borderRadius: "50%",
              backgroundColor: "#F5B942",
              color: "#0C0E14",
              fontWeight: "900",
              fontSize: "24px",
              marginBottom: "12px",
            }}
          >
            R
          </div>
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: "700",
              margin: "0 0 6px 0",
              letterSpacing: "0.5px",
            }}
          >
            RUDRA SENTINEL TRANSMISSION
          </h1>
          <p
            style={{
              color: "#F5B942",
              fontSize: "13px",
              fontWeight: "600",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            🦸 Someone Needs Your Help!
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: "28px 24px" }}>
          <p style={{ color: "#94A3B8", fontSize: "14px", marginTop: 0, marginBottom: "20px" }}>
            A new visitor request has been validated and recorded into the Rudra Sentinel archive. Below are the submission details:
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
            <tbody>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #232838", color: "#64748B", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", width: "35%" }}>
                  Visitor Name
                </td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #232838", color: "#FFFFFF", fontSize: "14px", fontWeight: "600" }}>
                  {name}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #232838", color: "#64748B", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>
                  Age
                </td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #232838", color: "#FFFFFF", fontSize: "14px" }}>
                  {age} years old
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #232838", color: "#64748B", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>
                  Location
                </td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #232838", color: "#FFFFFF", fontSize: "14px" }}>
                  {location}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #232838", color: "#64748B", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>
                  Email
                </td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #232838", color: "#F5B942", fontSize: "14px", fontWeight: "500" }}>
                  <a href={`mailto:${email}`} style={{ color: "#F5B942", textDecoration: "none" }}>
                    {email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", color: "#64748B", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>
                  Submitted At
                </td>
                <td style={{ padding: "10px 12px", color: "#94A3B8", fontSize: "13px", fontFamily: "monospace" }}>
                  {submittedAt}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Grievance Quote Box */}
          <div style={{ marginBottom: "20px" }}>
            <span style={{ color: "#64748B", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
              Grievance / Burden Statement
            </span>
            <div
              style={{
                backgroundColor: "#11131C",
                borderLeft: "4px solid #F5B942",
                padding: "16px",
                borderRadius: "6px",
                color: "#F0F4F8",
                fontSize: "14px",
                lineHeight: "1.6",
                fontStyle: "italic",
              }}
            >
              &ldquo;{grievance}&rdquo;
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#11131C",
            borderTop: "1px solid #232838",
            padding: "16px 24px",
            textAlign: "center",
            fontSize: "12px",
            color: "#64748B",
          }}
        >
          <p style={{ margin: "0 0 4px 0" }}>
            Rudra Sanctuary Protocol • Automated Emergency Transmission
          </p>
          <p style={{ margin: 0, color: "#38BDF8" }}>
            Crisis Helpline Tele MANAS: 14416 / 1-800-891-4416
          </p>
        </div>
      </div>
    </div>
  );
}
