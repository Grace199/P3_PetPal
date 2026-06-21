"""Regenerate the default placeholder image (a paw print in the app palette).

All records with no uploaded photo point at ``avatars/default-avatar.jpg``, so
overwriting that single file updates every placeholder at once.

Usage:  python scripts/make_default_avatar.py
"""
from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "media" / "avatars" / "default-avatar.jpg"

SIZE = 512
BG = (219, 224, 245)   # soft periwinkle (a touch deeper, so it reads as a tile)
PAW = (124, 138, 214)  # muted app blue


def main() -> None:
    img = Image.new("RGB", (SIZE, SIZE), BG)
    d = ImageDraw.Draw(img)

    # Centered paw, kept well inside a safe zone so object-cover cropping in
    # square thumbnails never clips the toes.
    cx, cy = SIZE // 2, SIZE // 2 + 18

    pad_w, pad_h = 132, 116
    d.ellipse(
        [cx - pad_w // 2, cy - pad_h // 2, cx + pad_w // 2, cy + pad_h // 2], fill=PAW
    )

    toes = [
        (cx - 96, cy - 104, 52, 68),
        (cx - 37, cy - 142, 54, 74),
        (cx + 37, cy - 142, 54, 74),
        (cx + 96, cy - 104, 52, 68),
    ]
    for tx, ty, tw, th in toes:
        d.ellipse([tx - tw // 2, ty - th // 2, tx + tw // 2, ty + th // 2], fill=PAW)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "JPEG", quality=90)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
