import cv2
import numpy as np

def remove_bg(img_path):
    img = cv2.imread(img_path)
    if img is None:
        print(f"Could not read {img_path}")
        return
        
    # Floodfill on original 3 channel image to find the background
    h, w = img.shape[:2]
    mask = np.zeros((h+2, w+2), np.uint8)
    
    # We create a copy of img for floodfilling so we don't mess up the original color
    floodfilled = img.copy()
    
    corners = [(0, 0), (0, h-1), (w-1, 0), (w-1, h-1)]
    for pt in corners:
        # 255 is the mask fill value inside the floodFill when using mask?
        # No, floodFill updates the mask with 1s where it fills.
        cv2.floodFill(floodfilled, mask, pt, (255, 0, 255), loDiff=(10,10,10), upDiff=(10,10,10))
        
    # The mask is now 1 where it was floodfilled. 
    # But wait, floodFill only sets the mask to 1 if we pass flags=cv2.FLOODFILL_MASK_ONLY
    # Or by default it updates the mask. Let's just create a transparency channel based on the mask.
    
    # We need to slice the mask back to the original image size (it's h+2, w+2)
    bg_mask = mask[1:h+1, 1:w+1]
    
    # Now create BGRA image
    img_bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    
    # Where bg_mask is 1 (the floodfilled areas), set alpha to 0
    img_bgra[bg_mask == 1, 3] = 0
    
    # Save the result back, overwriting the original
    cv2.imwrite(img_path, img_bgra)
    print(f"Processed {img_path}")

files = [
    r"assets\images\portfolio\Tambores Gemi new.png",
    r"assets\images\about\about-1-thumb-3.png",
    r"assets\images\about\about-1-thumb-4.png"
]

for f in files:
    remove_bg(f)
