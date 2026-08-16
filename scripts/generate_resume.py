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
    fontSize=10.2, textColor=INDIGO, leading=12.5, spaceBefore=5, spaceAfter=2.5,
    keepWithNext=1,
)
body_style = ParagraphStyle(
    "Body", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.4, textColor=INK, leading=11.5, alignment=TA_LEFT,
)
bullet_style = ParagraphStyle(
    "Bullet", parent=body_style, leftIndent=10, bulletIndent=0,
    spaceAfter=0.8, fontSize=8.4, leading=11,
)
role_style = ParagraphStyle(
    "Role", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=9.6, textColor=INK, leading=12,
)
meta_style = ParagraphStyle(
    "Meta", parent=styles["Normal"], fontName="Helvetica-Oblique",
    fontSize=8.1, textColor=LIGHT, leading=11.5,
)
company_style = ParagraphStyle(
    "Company", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.4, textColor=SLATE, leading=11, spaceAfter=1,
)
skill_label = ParagraphStyle(
    "SkillLabel", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=8.6, textColor=VIOLET, leading=11,
)
skill_val = ParagraphStyle(
    "SkillVal", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.6, textColor=INK, leading=11,
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
        leftMargin=15 * mm, rightMargin=15 * mm,
        topMargin=8 * mm, bottomMargin=7 * mm,
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
        '<link href="https://mihirborsaniya.vercel.app"><font color="#4f46e5">mihirborsaniya.vercel.app</font></link>'
        " &nbsp;|&nbsp; "
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
        "Full Stack Engineer with 3+ years building and owning production ERP and multi-tenant SaaS "
        "platforms end to end &mdash; from API and schema design through deployment. Currently "
        "architecting AksharPOS, a multi-tenant SaaS product, with per-tenant database isolation and "
        "dynamic, cached connection routing. Works across Node.js, Express, React, TypeScript, and "
        "MySQL, with hands-on payment-gateway (Razorpay, Stripe, PayPal), messaging (WhatsApp Business "
        "API, Firebase, Socket.IO), and real-time integrations, and owns Linux/NGINX/PM2 deployments "
        "with GitHub Actions CI/CD. Focused on secure, performant systems: JWT/RBAC, query and cache "
        "optimization, and zero-downtime releases.",
        body_style,
    ))

    # ---- Experience ----
    s += section("Experience")

    exp = [
        ("Full Stack Engineer — AksharPOS Product", "Codebrain Infotech → Logicode Software LLP", "Aug 2025 – Present", [
            "Architected a multi-tenant SaaS platform (AksharPOS) with per-tenant database isolation and dynamic, LRU-cached connection routing.",
            "Built 50+ normalized MySQL models across 10+ ERP modules; secured the API with JWT authentication and module-level RBAC.",
            "Designed an 18-template WhatsApp Business API library via Meta Business Manager for transactional and marketing messaging, including navigating Meta's approval workflow to get transactional templates classified as Utility rather than Marketing.",
            "Automated deployment on a Linux VPS (NGINX, PM2 cluster mode, GitHub Actions CI/CD); integrated Razorpay with webhook signature verification.",
            "Added Redis caching on hot-path queries to reduce database load under concurrent multi-branch traffic.",
        ]),
        ("Full Stack Developer — Service-Based", "Codebrain Infotech", "Jul 2025 (1 month)", [
            "One month of service-based client development work before transitioning to full-time product engineering on AksharPOS.",
        ]),
        ("Full Stack Developer", "DI Solutions", "Jul 2023 – Jun 2025", [
            "Delivered four major production systems: an HRMS covering attendance, leave, and employee management with role-aware dashboards and Firebase Cloud Messaging notifications; a Manufacturing & Logistics ERP (scrap processing, shipment, cargo, sales, and inventory); a Medical Record system with e-commerce features for category-wise medicine management; and a real-time, subscription-based chat platform.",
            "Built REST APIs, inventory, purchase, sales, shipment, and logistics features with React, Node.js, Express, and Sequelize/MySQL, following MVC architecture.",
            "Integrated Razorpay, Stripe, and PayPal for checkout flows; added real-time updates with Socket.IO and Swagger-documented APIs.",
        ]),
    ]
    for role, company, period, pts in exp:
        s.append(role_row(role, period))
        s.append(Paragraph(company, company_style))
        s += bullets(pts)
        s.append(Spacer(1, 2))

    # ---- Projects ----
    s += section("Projects")
    projects = [
        ("AksharPOS ERP (Codebrain Infotech → Logicode Software LLP)",
         "Multi-tenant ERP/POS SaaS &mdash; shared API layer with per-tenant MySQL databases, 50+ models, "
         "10+ modules, sub-30-second tenant onboarding, an 18-template WhatsApp Business API integration "
         "via Meta, live in production."),
        ("HRMS Platform (DI Solutions)",
         "Attendance, leave, and employee management system with role-aware dashboards and Firebase-powered "
         "real-time notifications."),
        ("Manufacturing &amp; Logistics ERP (DI Solutions)",
         "Full system for scrap processing, shipment, cargo, sales, and inventory management."),
        ("Medical Record &amp; E-Commerce System (DI Solutions)",
         "Category-wise medicine management with cart, checkout, and role-based access."),
        ("Real-Time Chat Platform (DI Solutions)",
         "Subscription-based chat system built on Socket.IO for real-time messaging."),
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
        ("Messaging", "WhatsApp Business API (Meta Business Manager, template management & approval), Firebase Cloud Messaging, Socket.IO"),
        ("DevOps & Tools", "Linux, NGINX, PM2, GitHub Actions, CI/CD  ·  Git, GitHub, Postman, Swagger"),
    ]
    data = [[Paragraph(k, skill_label), Paragraph(v, skill_val)] for k, v in skill_rows]
    tbl = Table(data, colWidths=[30 * mm, 148 * mm])
    tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
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
