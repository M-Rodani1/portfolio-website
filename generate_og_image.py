#!/usr/bin/env python3
"""
Generate OG (Open Graph) image for portfolio website.
Creates a 1200x630px image matching the site's design theme.
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Dimensions (Open Graph recommended size)
WIDTH = 1200
HEIGHT = 630

# Colors matching your site theme
BG_DARK = (10, 14, 39)      # #0a0e27
BG_SECONDARY = (15, 21, 46)  # #0f1629
ACCENT_PURPLE = (124, 58, 237)  # #7c3aed
ACCENT_BLUE = (59, 130, 246)    # #3b82f6
TEXT_PRIMARY = (224, 224, 224)  # #e0e0e0
TEXT_SECONDARY = (160, 160, 160)  # #a0a0a0

def create_gradient_background(width, height):
    """Create a gradient background"""
    img = Image.new('RGB', (width, height), BG_DARK)
    pixels = img.load()
    
    # Create a subtle gradient
    for y in range(height):
        # Blend between dark shades
        ratio = y / height
        r = int(BG_DARK[0] + (BG_SECONDARY[0] - BG_DARK[0]) * ratio)
        g = int(BG_DARK[1] + (BG_SECONDARY[1] - BG_DARK[1]) * ratio)
        b = int(BG_DARK[2] + (BG_SECONDARY[2] - BG_DARK[2]) * ratio)
        
        for x in range(width):
            pixels[x, y] = (r, g, b)
    
    return img

def draw_text_with_gradient(draw, text, position, font, gradient_colors):
    """Draw text with gradient effect"""
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Create temporary image for gradient text
    temp_img = Image.new('RGBA', (text_width, text_height), (0, 0, 0, 0))
    temp_draw = ImageDraw.Draw(temp_img)
    
    # Draw gradient rectangles
    for i, color in enumerate(gradient_colors):
        x1 = int(i * text_width / len(gradient_colors))
        x2 = int((i + 1) * text_width / len(gradient_colors))
        temp_draw.rectangle([x1, 0, x2, text_height], fill=color)
    
    # Create mask from text
    mask = Image.new('L', (text_width, text_height), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.text((0, 0), text, font=font, fill=255)
    
    # Apply mask and composite
    temp_img.putalpha(mask)
    
    # Paste onto main image
    img = draw._image if hasattr(draw, '_image') else None
    if img:
        img.alpha_composite(temp_img, position)
    
    return text_width, text_height

def main():
    # Create base image with gradient
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    # Try to load a nice font, fallback to default
    try:
        # Try system fonts
        title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 72)
        tagline_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
        subtitle_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
        badge_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
    except:
        try:
            # Fallback to Arial
            title_font = ImageFont.truetype("arial.ttf", 72)
            tagline_font = ImageFont.truetype("arial.ttf", 32)
            subtitle_font = ImageFont.truetype("arial.ttf", 24)
            badge_font = ImageFont.truetype("arial.ttf", 18)
        except:
            # Use default font
            title_font = ImageFont.load_default()
            tagline_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
            badge_font = ImageFont.load_default()
    
    # Center coordinates
    center_x = WIDTH // 2
    
    # Draw decorative circles (subtle background elements)
    # Purple glow
    for radius, opacity in [(300, 30), (250, 20)]:
        overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        overlay_draw.ellipse(
            [center_x + 200, -100, center_x + 200 + radius * 2, -100 + radius * 2],
            fill=(*ACCENT_PURPLE, opacity)
        )
        img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
        draw = ImageDraw.Draw(img)
    
    # Blue glow
    for radius, opacity in [(250, 25), (200, 15)]:
        overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        overlay_draw.ellipse(
            [center_x - 450, HEIGHT - 150, center_x - 450 + radius * 2, HEIGHT - 150 + radius * 2],
            fill=(*ACCENT_BLUE, opacity)
        )
        img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
        draw = ImageDraw.Draw(img)
    
    # Name - with gradient effect
    name_text = "Mohamed Rodani"
    name_bbox = draw.textbbox((0, 0), name_text, font=title_font)
    name_width = name_bbox[2] - name_bbox[0]
    name_x = center_x - name_width // 2
    name_y = 180
    
    # Draw name with gradient (simulated with solid purple for simplicity)
    draw.text((name_x, name_y), name_text, font=title_font, fill=ACCENT_PURPLE)
    
    # Tagline
    tagline_text = "Physics @ QMUL"
    tagline_bbox = draw.textbbox((0, 0), tagline_text, font=tagline_font)
    tagline_width = tagline_bbox[2] - tagline_bbox[0]
    tagline_x = center_x - tagline_width // 2
    tagline_y = name_y + 100
    draw.text((tagline_x, tagline_y), tagline_text, font=tagline_font, fill=TEXT_PRIMARY)
    
    # Subtitle
    subtitle_text = "Machine Learning, Quant Finance & Scientific Computing"
    subtitle_bbox = draw.textbbox((0, 0), subtitle_text, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = center_x - subtitle_width // 2
    subtitle_y = tagline_y + 60
    draw.text((subtitle_x, subtitle_y), subtitle_text, font=subtitle_font, fill=TEXT_SECONDARY)
    
    # Badges
    badges = ["ML Projects", "Hackathon Winner", "Kaggle Competitor"]
    badge_y = subtitle_y + 80
    total_badge_width = sum(draw.textbbox((0, 0), badge, font=badge_font)[2] - draw.textbbox((0, 0), badge, font=badge_font)[0] + 40 for badge in badges)
    badge_spacing = 16
    total_width = total_badge_width + badge_spacing * (len(badges) - 1)
    badge_start_x = center_x - total_width // 2
    
    x_offset = 0
    for badge in badges:
        badge_width = draw.textbbox((0, 0), badge, font=badge_font)[2] - draw.textbbox((0, 0), badge, font=badge_font)[0]
        
        # Draw badge background
        padding = 12
        badge_rect = [
            badge_start_x + x_offset - padding,
            badge_y - padding,
            badge_start_x + x_offset + badge_width + padding,
            badge_y + 30 + padding
        ]
        # Rounded rectangle approximation
        draw.rounded_rectangle(badge_rect, radius=12, fill=(*ACCENT_PURPLE, 38), outline=(*ACCENT_PURPLE, 77))
        draw.text((badge_start_x + x_offset, badge_y), badge, font=badge_font, fill=ACCENT_PURPLE)
        
        x_offset += badge_width + padding * 2 + badge_spacing
    
    # Save the image
    output_path = "assets/og-image.png"
    img.save(output_path, "PNG", optimize=True)
    print(f"✅ OG image created successfully: {output_path}")
    print(f"   Dimensions: {WIDTH}x{HEIGHT}px")
    return output_path

if __name__ == "__main__":
    main()
