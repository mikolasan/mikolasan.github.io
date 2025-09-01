---
title: Video in Godot
date: 2023-12-28
published: 2023-12-28
lastModified: 2023-12-28
---
## Prepare frames

Scale and extract alpha mask

```bash
# !/bin/bash

# convert Snake_00012.png -background white -alpha remove -alpha off input_removed_alpha.png
# convert Snake_00012.png -alpha extract input_alpha_mask.png
# convert -append input_removed_alpha.png input_alpha_mask.png Snake_00012_mask.png

input_directory="./"
output_directory="./masked"

# Create output directory if it doesn't exist
mkdir -p "$output_directory"

for file in "$input_directory"/*.png; do
    filename=$(basename "$file")

    file_resized="${file%*.png}_resized.png"
    convert "$file" -resize 728x649 "$file_resized"
    # Remove alpha and create an image without alpha
    convert "$file_resized" -background white -alpha remove -alpha off "tmp_removed_alpha.png"

    # Extract alpha to create an alpha mask
    convert "$file_resized" -alpha extract "tmp_alpha_mask.png"

    # Append the images
    convert -append "tmp_removed_alpha.png" "tmp_alpha_mask.png" "$output_directory/${filename%*.png}_mask.png"
done

echo "Conversion completed"
```

## Make video

```bash
ffmpeg -framerate 35.5 -i Snake_%05d_mask.png -c:v libvpx-vp9 -crf 10 -b:v 3M snake.webm
```

## Add to the game

Shader for video player:

```c
shader_type canvas_item;

uniform float mask_strength : hint_range(0.0, 1.0) = 1.0;

void fragment() {
    // Calculate the mask value based on screen coordinates
    //float mask_value = smoothstep(0.5, 0.5 + mask_strength, SCREEN_UV.y);
	vec2 uv = UV;
	vec2 mask_offset = vec2(0.0, 0.5);
	vec2 alpha_uv = UV + mask_offset;
    // Sample the color of the current pixel
    vec4 color = texture(TEXTURE, UV);
	vec4 alpha_mask = texture(TEXTURE, alpha_uv);

    // Apply the alpha mask to the top part of the image
    color.a = alpha_mask.x;

    // Output the modified color
    COLOR = color;
}
```