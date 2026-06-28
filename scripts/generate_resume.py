#!/usr/bin/env python3
"""Generate Mihir Borsaniya's one-page resume PDF for the portfolio.

Content mirrors src/data/portfolio.ts (the single source of truth). When you
update the portfolio data, update this file too and re-run it so the
downloadable PDF matches the website exactly:

    python scripts/generate_resume.py
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# Palette
INK = HexColor("#0f172a")
SLATE = HexColor("#475569")
INDIGO = HexColor("#4f46e5")
VIOLET = HexColor("#7c3aed")
LIGHT = HexColor("#64748b")
RULE = HexColor("#c7d2fe")

styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    "Name", parent=styles["Title"], fontName="Helvetica-Bold",
    fontSize=23, textColor=INK, leading=26, spaceAfter=2, alignment=TA_CENTER,
)
title_style = ParagraphStyle(
    "JobTitle", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=11, textColor=INDIGO, leading=14, alignment=TA_CENTER, spaceAfter=4,
)
contact_style = ParagraphStyle(
    "Contact", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.5, textColor=SLATE, leading=12, alignment=TA_CENTER,
)
section_style = ParagraphStyle(
    "Section", parent=styles["Heading2"], fontName="Helvetica-Bold",
    fontSize=10.5, textColor=INDIGO, leading=13, spaceBefore=8, spaceAfter=3,
)
body_style = ParagraphStyle(
    "Body", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.8, textColor=INK, leading=12.5, alignment=TA_LEFT,
)
bullet_style = ParagraphStyle(
    "Bullet", parent=body_style, leftIndent=10, bulletIndent=0,
    spaceAfter=1.5, fontSize=8.8, leading=12,
)
role_style = ParagraphStyle(
    "Role", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=9.8, textColor=INK, leading=12.5,
)
meta_style = ParagraphStyle(
    "Meta", parent=styles["Normal"], fontName="Helvetica-Oblique",
    fontSize=8.3, textColor=LIGHT, leading=12,
)
company_style = ParagraphStyle(
    "Company", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.6, textColor=SLATE, leading=11.5, spaceAfter=1,
)
skill_label = ParagraphStyle(
    "SkillLabel", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=8.8, textColor=VIOLET, leading=11.5,
)
skill_val = ParagraphStyle(
    "SkillVal", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.8, textColor=INK, leading=11.5,
)


def section(title):
    return [
        Paragraph(title.upper(), section_style),
        HRFlowable(width="100%", thickness=0.8, color=RULE,
                   spaceBefore=0, spaceAfter=4),
    ]


def bullets(items):
    return [Paragraph(f"&bull;&nbsp;&nbsp;{t}", bullet_style) for t in items]


def role_row(role, period):
    row = Table(
        [[Paragraph(role, role_style), Paragraph(period, meta_style)]],
        colWidths=[125 * mm, 53 * mm],
    )
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return row


def build(path):
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=16 * mm, rightMargin=16 * mm,
        topMargin=11 * mm, bottomMargin=11 * mm,
        title="Mihir Borsaniya - Resume",
        author="Mihir Borsaniya",
        subject="Full Stack Engineer Resume",
    )
    s = []

    # ---- Header ----
    s.append(Paragraph("MIHIR BORSANIYA", name_style))
    s.append(Paragraph("Full Stack Engineer", title_style))
    s.append(Paragraph(
        "Surat, Gujarat, India &nbsp;|&nbsp; developermihir13@gmail.com &nbsp;|&nbsp; "
        "+91 75758 96243 &nbsp;|&nbsp; "
        '<link href="https://github.com/MihirStack"><font color="#4f46e5">github.com/MihirStack</font></link>'
        " &nbsp;|&nbsp; "
        '<link href="https://linkedin.com/in/mihirborsaniya"><font color="#4f46e5">linkedin.com/in/mihirborsaniya</font></link>',
        contact_style,
    ))
    s.append(Spacer(1, 5))
    s.append(HRFlowable(width="100%", thickness=1.2, color=INDIGO, spaceAfter=2))

    # ---- Summary ----
    s += section("Professional Summary")
    s.append(Paragraph(
        "Full Stack Engineer with 3+ years building production ERP and multi-tenant SaaS "
        "platforms end to end. Designs REST APIs, models relational schemas, and owns "
        "deployments on Linux VPS with NGINX, PM2, and CI/CD. Strong across Node.js, Express, "
        "React, TypeScript, and MySQL, with hands-on payment-gateway and real-time integrations. "
        "Focused on secure, performant systems &mdash; JWT, RBAC, query optimization, caching, "
        "and zero-downtime releases.",
        body_style,
    ))

    # ---- Experience ----
    s += section("Experience")

    exp = [
        ("Full Stack Engineer", "Logicode Software LLP", "Jan 2026 – Present", [
            "Architected a multi-tenant SaaS platform (AksharPOS) with per-tenant database isolation and dynamic, LRU-cached connection routing.",
            "Built 50+ normalized MySQL models across 10+ ERP modules; secured the API with JWT and module-level RBAC.",
            "Automated deployment on Linux VPS (NGINX, PM2 cluster, GitHub Actions CI/CD) and integrated Razorpay with webhook verification; added Redis caching to cut hot-path query load.",
        ]),
        ("Full Stack Developer", "Codebrain Infotech", "Jul 2025 – Jan 2026", [
            "Built an HRMS covering attendance, leave, and employee management with role-aware React dashboards (Redux Toolkit, React Query).",
            "Developed REST APIs on Node.js, Sequelize, and MySQL with authentication and authorization.",
            "Integrated Firebase Cloud Messaging for a real-time employee notification system.",
        ]),
        ("Full Stack Developer", "DI Solutions", "Jul 2023 – Jun 2025", [
            "Delivered 10+ modules across Manufacturing ERP, Medical ERP, POS, and e-commerce following MVC architecture.",
            "Built inventory, purchase, sales, shipment, and logistics features with React, Node.js, Express, and Sequelize/MySQL.",
            "Integrated Razorpay, Stripe, and PayPal; added real-time updates with Socket.IO and Swagger-documented APIs.",
        ]),
    ]
    for role, company, period, pts in exp:
        s.append(role_row(role, period))
        s.append(Paragraph(company, company_style))
        s += bullets(pts)
        s.append(Spacer(1, 3))

    # ---- Projects ----
    s += section("Projects")
    projects = [
        ("AksharPOS ERP (Logicode)",
         "Multi-tenant ERP/POS SaaS &mdash; shared API with per-tenant MySQL DBs, 50+ models, "
         "10+ modules, sub-30-second tenant onboarding, live in production."),
        ("HRMS Platform (Codebrain)",
         "Attendance, leave, and employee management with role-aware dashboards and Firebase "
         "real-time notifications."),
        ("Multi-Domain ERP &amp; Commerce (DI Solutions)",
         "Manufacturing/Medical ERP, POS, and e-commerce on shared inventory with Socket.IO "
         "real-time flows and Razorpay/Stripe/PayPal checkout."),
    ]
    for name, desc in projects:
        s.append(Paragraph(f"<b>{name}.</b> {desc}", bullet_style))

    # ---- Technical Skills ----
    s += section("Technical Skills")
    skill_rows = [
        ("Languages", "JavaScript, TypeScript"),
        ("Frontend", "React.js, Next.js, Redux Toolkit, React Query, Tailwind CSS, Bootstrap"),
        ("Backend", "Node.js, Express.js, REST APIs, Socket.IO, MVC Architecture"),
        ("Database", "MySQL, MongoDB, Redis, Sequelize ORM, Firebase"),
        ("Auth & Payments", "JWT, OAuth, RBAC  ·  Razorpay, Stripe, PayPal"),
        ("DevOps & Tools", "Linux, NGINX, PM2, GitHub Actions, CI/CD  ·  Git, GitHub, Postman, Swagger"),
    ]
    data = [[Paragraph(k, skill_label), Paragraph(v, skill_val)] for k, v in skill_rows]
    tbl = Table(data, colWidths=[30 * mm, 148 * mm])
    tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
    ]))
    s.append(tbl)

    # ---- Education ----
    s += section("Education")
    s.append(Paragraph(
        "<b>Master of Computer Applications (MCA)</b> &mdash; Information Technology &nbsp;&nbsp;|&nbsp;&nbsp; "
        "<b>Bachelor of Commerce (B.Com)</b>",
        body_style,
    ))

    doc.build(s)
    print(f"Resume written to {path}")


if __name__ == "__main__":
    build("D:/mihir-portfolio/public/resume.pdf")
