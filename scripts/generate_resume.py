#!/usr/bin/env python3
"""Generate Mihir Borsaniya's resume PDF for the portfolio."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Flowable
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
    fontSize=24, textColor=INK, leading=27, spaceAfter=2, alignment=TA_CENTER,
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
    fontSize=11, textColor=INDIGO, leading=14, spaceBefore=10, spaceAfter=3,
)
body_style = ParagraphStyle(
    "Body", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9, textColor=INK, leading=13, alignment=TA_LEFT,
)
bullet_style = ParagraphStyle(
    "Bullet", parent=body_style, leftIndent=10, bulletIndent=0,
    spaceAfter=2, fontSize=9, leading=12.5,
)
role_style = ParagraphStyle(
    "Role", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=10, textColor=INK, leading=13,
)
meta_style = ParagraphStyle(
    "Meta", parent=styles["Normal"], fontName="Helvetica-Oblique",
    fontSize=8.5, textColor=LIGHT, leading=12,
)
skill_label = ParagraphStyle(
    "SkillLabel", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=9, textColor=VIOLET, leading=12,
)
skill_val = ParagraphStyle(
    "SkillVal", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9, textColor=INK, leading=12.5,
)


def section(title):
    return [
        Paragraph(title.upper(), section_style),
        HRFlowable(width="100%", thickness=0.8, color=RULE,
                   spaceBefore=0, spaceAfter=4),
    ]


def bullets(items):
    return [Paragraph(f"&bull;&nbsp;&nbsp;{t}", bullet_style) for t in items]


def build(path):
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=16 * mm, rightMargin=16 * mm,
        topMargin=12 * mm, bottomMargin=12 * mm,
        title="Mihir Borsaniya - Resume",
        author="Mihir Borsaniya",
        subject="Full Stack ERP Engineer Resume",
    )
    s = []

    # Header
    s.append(Paragraph("MIHIR BORSANIYA", name_style))
    s.append(Paragraph("Full Stack ERP Engineer &amp; Multi-Tenant SaaS Architect", title_style))
    s.append(Paragraph(
        "Gujarat, India &nbsp;|&nbsp; developermihir13@gmail.com &nbsp;|&nbsp; "
        "+91 75758 96243 &nbsp;|&nbsp; "
        '<link href="https://github.com/mihirborsaniya"><font color="#4f46e5">github.com/mihirborsaniya</font></link>'
        " &nbsp;|&nbsp; "
        '<link href="https://linkedin.com/in/mihirborsaniya"><font color="#4f46e5">linkedin.com/in/mihirborsaniya</font></link>',
        contact_style,
    ))
    s.append(Spacer(1, 6))
    s.append(HRFlowable(width="100%", thickness=1.2, color=INDIGO, spaceAfter=2))

    # Summary
    s += section("Professional Summary")
    s.append(Paragraph(
        "Full Stack ERP Engineer with 3+ years of experience designing and building "
        "enterprise-grade, multi-tenant SaaS platforms. Specialized in production-grade "
        "backend architectures, payment infrastructure, and end-to-end DevOps ownership. "
        "Architected and shipped AksharPOS ERP — a multi-tenant retail/POS platform with "
        "50+ database models and 10+ integrated business modules running in production.",
        body_style,
    ))

    # Experience
    s += section("Experience")

    exp = [
        ("Full Stack ERP Engineer — AksharPOS ERP Platform", "2024 – Present", [
            "Architected multi-tenant SaaS infrastructure with per-tenant database isolation and dynamic, LRU-cached connection routing.",
            "Designed subscription-based feature gating and automated tenant onboarding (DB provisioning + seed data) in under 30 seconds.",
            "Owned production deployment on Linux VPS: NGINX reverse proxy, PM2 cluster mode, SSL, and GitHub Actions CI/CD pipelines.",
        ]),
        ("ERP & POS Software Engineer", "2023 – 2024", [
            "Built POS billing, inventory, purchase, sales, customer, supplier, branch, and loyalty modules from scratch.",
            "Integrated Razorpay payments with HMAC webhook verification, idempotency handling, and daily reconciliation reports.",
            "Modeled 50+ normalized MySQL tables with transaction management for complex business workflows.",
        ]),
        ("Full Stack Developer", "2022 – 2023", [
            "Developed REST APIs with Node.js &amp; Express, secured with JWT authentication and role-based access control (RBAC).",
            "Built responsive React.js frontends with Redux Toolkit and React Query against a MySQL + Sequelize backend.",
        ]),
    ]
    for role, period, pts in exp:
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
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ]))
        s.append(row)
        s += bullets(pts)
        s.append(Spacer(1, 4))

    # Flagship project
    s += section("Flagship Project — AksharPOS ERP")
    s.append(Paragraph(
        "<b>Enterprise Multi-Tenant ERP Platform</b> for retail, wholesale, and POS businesses. "
        "10+ integrated modules: POS Billing, Inventory, Purchase, Sales, Customer &amp; Supplier "
        "Management, Loyalty, Branch Management, Payments, and Reporting &amp; Analytics. "
        "Multi-tenant architecture with tenant isolation, dynamic DB connections, 50+ models, "
        "JWT + RBAC security, and live production deployments.",
        body_style,
    ))

    # Skills
    s += section("Technical Skills")
    skill_rows = [
        ("Backend", "Node.js, Express.js, REST APIs, JWT, RBAC, Middleware Architecture, Transactions, System Design"),
        ("Frontend", "React.js, Next.js, TypeScript, JavaScript, Redux Toolkit, React Query, Tailwind CSS"),
        ("Database", "MySQL, Sequelize ORM, Data Modeling, Query Optimization, Normalization, Multi-Tenant DBs"),
        ("Payments", "Razorpay, UPI, Card Payments, Webhook Verification, Reconciliation, Idempotency"),
        ("DevOps", "Linux/Ubuntu, NGINX, PM2, GitHub Actions, CI/CD, SSL, VPS Hosting, Production Deployment"),
        ("Architecture", "Multi-Tenant SaaS, Tenant Isolation, Dynamic DB Routing, LRU Caching, Scalability"),
        ("Version Control", "Git, GitHub, Pull Requests, Branch Strategy, Code Reviews"),
    ]
    data = [[Paragraph(k, skill_label), Paragraph(v, skill_val)] for k, v in skill_rows]
    tbl = Table(data, colWidths=[30 * mm, 148 * mm])
    tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    s.append(tbl)

    # Highlights
    s += section("Key Engineering Highlights")
    s += bullets([
        "Zero cross-tenant data leakage with ~40ms tenant-resolution overhead via cached Sequelize connection pooling.",
        "Reduced deployment time from 30 minutes (manual) to ~4 minutes (automated) with zero-downtime PM2 graceful reloads.",
        "Cryptographically verified all payment webhooks before any DB write; zero reconciliation issues in production.",
    ])

    doc.build(s)
    print(f"Resume written to {path}")


if __name__ == "__main__":
    build("D:/mihir-portfolio/public/resume.pdf")
