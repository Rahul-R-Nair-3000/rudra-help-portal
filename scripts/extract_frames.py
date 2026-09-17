import os
import glob
import json
import cv2
from PIL import Image

def extract_frames():
    video_dir = os.path.join(os.path.dirname(__file__), "..", "video")
    output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "frames")
    os.makedirs(output_dir, exist_ok=True)

    # Find video file in video_dir
    video_files = glob.glob(os.path.join(video_dir, "*.mp4")) + glob.glob(os.path.join(video_dir, "*.mov")) + glob.glob(os.path.join(video_dir, "*.webm"))
    if not video_files:
        print("ERROR: No video files found in video/ folder!")
        return

    video_path = video_files[0]
    print(f"Processing video: {video_path}")

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"ERROR: Could not open video file {video_path}")
        return

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    orig_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    orig_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration = total_frames / fps if fps > 0 else 0

    print(f"Original Video Stats: {total_frames} frames, {fps:.2f} FPS, {orig_w}x{orig_h}, Duration: {duration:.2f}s")

    # Target frame count between 80 and 120 for smooth scroll performance
    target_frame_count = min(total_frames, 100)
    step = total_frames / target_frame_count

    extracted_count = 0
    max_w = 1920
    out_w = orig_w
    out_h = orig_h

    if orig_w > max_w:
        out_w = max_w
        out_h = int(orig_h * (max_w / orig_w))

    for i in range(target_frame_count):
        frame_idx = int(i * step)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            break

        # Resize if necessary
        if out_w != orig_w or out_h != orig_h:
            frame = cv2.resize(frame, (out_w, out_h), interpolation=cv2.INTER_AREA)

        # Convert BGR to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(rgb_frame)

        extracted_count += 1
        frame_filename = f"frame_{extracted_count:04d}.webp"
        save_path = os.path.join(output_dir, frame_filename)
        img.save(save_path, "WEBP", quality=82)

    cap.release()

    manifest = {
        "frameCount": extracted_count,
        "width": out_w,
        "height": out_h,
        "aspectRatio": round(out_w / out_h, 3),
        "framePattern": "/frames/frame_%04d.webp"
    }

    manifest_path = os.path.join(output_dir, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"SUCCESS: Extracted {extracted_count} WebP frames to {output_dir}")
    print(f"Manifest written to {manifest_path}")

if __name__ == "__main__":
    extract_frames()
