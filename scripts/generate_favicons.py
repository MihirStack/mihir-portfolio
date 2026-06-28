#!/usr/bin/env python3
"""Generate brand favicons and an Open Graph image for the portfolio.

Renders the "MB" monogram on an indigo->violet gradient (matching the navbar
logo) plus a social share card. Run:

    python scripts/generate_favicons.py
"""

import math
from PIL import Image, ImageDraw, ImageFont

OUT = "D:/mihir-portfolio/public"

INDIGO = (99, 102, 241)
VIOLET = (139, 92, 246)
CYAN = (6, 182, 212)
BG = (8, 8, 15)
WHITE = (241, 245, 249)


def font(size, bold=True):
    candidates = (
        ["C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/segoeuib.ttf"]
        if bold
        else ["C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/segoeui.ttf"]
    )
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def diagonal_gradient(size, c1, c2):
    """Square diagonal (top-left -> bottom-right) gradient."""
    img = Image.new("RGB", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * (size - 1))
            px[x, y] = lerp(c1, c2, t)
    return img


def rounded_mask(size, radius):
    mask = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    return mask


def make_icon(size):
    """Rounded gradient square with centered white 'MB'."""
    scale = 4  # supersample for crisp edges
    s = size * scale
    grad = diagonal_gradient(s, INDIGO, VIOLET)
    icon = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    icon.paste(grad, (0, 0), rounded_mask(s, int(s * 0.22)))

    draw = ImageDraw.Draw(icon)
    f = font(int(s * 0.46))
    text = "MB"
    box = draw.textbbox((0, 0), text, font=f)
    w, h = box[2] - box[0], box[3] - box[1]
    draw.text(
        ((s - w) / 2 - box[0], (s - h) / 2 - box[1]),
        text,
        font=f,
        fill=WHITE,
    )
    return icon.resize((size, size), Image.LANCZOS)


def make_og():
    """1200x630 social share card."""
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img, "RGBA")

    # Soft gradient glows
    for cx, cy, rad, col in [
        (240, 180, 360, INDIGO),
        (980, 470, 380, CYAN),
        (640, 320, 300, VIOLET),
    ]:
        glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow)
        for r in range(rad, 0, -6):
            a = int(38 * (1 - r / rad))
            gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col + (a,))
        img.paste(Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB"), (0, 0))

    draw = ImageDraw.Draw(img, "RGBA")

    # Monogram chip
    chip = make_icon(96)
    img.paste(chip, (90, 90), chip)
    draw.text((200, 104), "Mihir Borsaniya", font=font(34), fill=WHITE)
    draw.text((200, 150), "github.com/MihirStack", font=font(22, bold=False), fill=(148, 163, 184))

    # Headline
    draw.text((90, 270), "Full Stack Engineer", font=font(76), fill=WHITE)
    # Gradient-ish accent line
    draw.text((90, 360), "Enterprise ERP & Multi-Tenant SaaS", font=font(46), fill=INDIGO)

    # Sub
    draw.text(
        (90, 452),
        "3+ years building production ERP, SaaS, HRMS & POS systems",
        font=font(28, bold=False),
        fill=(203, 213, 225),
    )

    # Tech row
    draw.text(
        (90, 520),
        "Node.js  ·  React  ·  TypeScript  ·  MySQL  ·  Redis  ·  Multi-Tenant SaaS",
        font=font(24, bold=False),
        fill=(129, 140, 248),
    )

    img.save(f"{OUT}/og-image.png")
    print("og-image.png written")


def main():
    # PNG favicons
    for size in (16, 32, 192, 512):
        icon = make_icon(size)
        name = f"favicon-{size}x{size}.png"
        icon.save(f"{OUT}/{name}")
        print(name, "written")

    # Apple touch icon (180, opaque bg for iOS)
    apple = Image.new("RGB", (180, 180), BG)
    chip = make_icon(180)
    apple.paste(chip, (0, 0), chip)
    apple.save(f"{OUT}/apple-touch-icon.png")
    print("apple-touch-icon.png written")

    # Multi-size .ico
    ico = make_icon(64)
    ico.save(f"{OUT}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("favicon.ico written")

    make_og()


if __name__ == "__main__":
    main()
