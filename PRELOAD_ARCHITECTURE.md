# Asset Preloading System - Architecture Documentation

## Overview
This preloading system ensures all images are loaded before the user interacts with the site, preventing lag during scrolling. 3D models load on-demand via Canvas Suspense to avoid WebGL context conflicts.

## Architecture

### 1. **Asset Manifest** (`src/config/assets.js`)
- Centralized configuration of all assets
- Lists images to preload
- Easy to maintain - just add new assets to the arrays

### 2. **Preloader Hook** (`src/hooks/useAssetPreloader.jsx`)
- Custom React hook that handles image loading
- Tracks loading progress
- Loads assets in parallel for maximum speed
- Error-resilient: failed assets don't block overall progress

### 3. **Preloader Component** (`src/components/Preloader.jsx`)
- Visual loading screen with progress bar
- Smooth GSAP animations for enter/exit
- Shows percentage and animated loading indicators
- Auto-hides when loading is complete (with 300ms delay for cache)

### 4. **App Integration** (`src/App.jsx`)
- **Conditional rendering** - content ONLY renders after image loading complete
- Prevents multiple Canvas instances from mounting simultaneously
- Uses Suspense for React Three Fiber components
- Clean switch from preloader to main content

### 5. **Canvas Components with Suspense**
- All Canvas components wrapped in `<Suspense fallback={null}>`
- 3D models load on-demand to avoid WebGL context conflicts
- ErrorBoundary wraps Canvas instances for graceful error handling

## How It Works

```
User visits site
    ↓
Preloader renders (only component visible)
    ↓
Images begin loading in parallel
    ↓
Progress updates in real-time
    ↓
When 100% complete:
    - Wait 300ms (cache stabilization)
    - Preloader animates out (GSAP)
    - Main content renders for first time
    - 3D models load on-demand via Canvas Suspense
    - User can now scroll smoothly with zero lag
```

## Key Design Decisions

### Why Conditional Rendering?
Initially, we tried rendering content with `opacity: 0`, but this caused:
- Multiple Canvas instances to mount simultaneously
- WebGL context limit errors
- `addEventListener` errors from null DOM elements
- Memory overhead from hidden 3D scenes

**Solution**: True conditional rendering - content doesn't exist in DOM until loaded.

### Why GLTFLoader Instead of useProgress?
- `useProgress` from @react-three/drei requires Canvas to be mounted
- We can't mount Canvas during preload (causes errors)
- Native `GLTFLoader` works independently, no React context needed
- Models are cached, so when Canvas mounts they load instantly

## Benefits

✅ **Zero lag** - All assets preloaded before interaction  
✅ **No WebGL errors** - Single Canvas mount after loading  
✅ **Progress feedback** - User knows loading status  
✅ **Clean separation** - Asset config, logic, and UI separated  
✅ **Easy maintenance** - Just update `assets.js` for new content  
✅ **Professional UX** - Smooth animations and transitions  
✅ **Error handling** - Failed assets don't break loading  
✅ **Performance** - Parallel loading, minimal re-renders

## Adding New Assets

Simply add to `src/config/assets.js`:

```javascript
export const MODELS = [
  ...existing,
  "/models/new-model.glb", // Add here
];

export const IMAGES = [
  ...existing,
  "/images/new-image.png", // Add here
];
```

Models are automatically cached by Three.js, so they load instantly when used in components.

## File Structure

```
src/
├── config/
│   └── assets.js              # Asset manifest (images)
├── hooks/
│   └── useAssetPreloader.jsx  # Image loading logic
├── components/
│   ├── Preloader.jsx          # Loading UI
│   └── ErrorBoundary.jsx      # Canvas error handling
└── App.jsx                    # Integration (conditional render)
```

## Performance Notes

- Images load in parallel for maximum speed
- 3D models load on-demand via Canvas Suspense (no WebGL context conflicts)
- No blocking - uses async/promises for images
- Failed assets don't block overall progress
- Models use React Three Fiber's built-in caching
- Zero re-renders during loading (progress in isolated state)
- ErrorBoundary prevents app crashes from WebGL errors

## Troubleshooting

**If loading stuck at 0%:**
- Check browser console for 404 errors
- Verify all image paths in `assets.js` are correct
- Check network tab to see which assets failed

**If WebGL Context Lost error:**
- Fixed! Models now load on-demand via Canvas Suspense
- Each Canvas has its own isolated WebGL context
- ErrorBoundary catches and handles any Canvas errors gracefully

**If models don't appear after loading:**
- Check console for GLTF loading errors
- Verify model paths in component code
- Ensure Suspense wraps components using useGLTF
- Check ErrorBoundary isn't showing fallback UI
- Check Three.js console warnings
