# Videos · Waffy

Los videos se generan en Higgsfield con Seedance 2.0 y se dejan en esta carpeta. El componente `<CinematicVideo />` (`src/components/media/CinematicVideo.tsx`) ya está cableado a estas rutas: si un archivo no existe, muestra el poster; si tampoco hay poster, muestra el fondo de marca. Nada se rompe.

Cada video va en dos formatos: `.webm` (VP9/AV1) primero y `.mp4` (H.264, yuv420p) como respaldo, con el mismo nombre. El poster es un `.jpg` con el mismo nombre, tomado de un frame representativo. Todo silencioso, en loop, sin texto ni logos quemados.

## Slots

| Slot | Ruta | Formato | Duración | Uso |
|---|---|---|---|---|
| Hero | `/videos/hero.mp4` + `hero.webm` + `hero.jpg` | 16:9 · 1920×1080 | 10–15 s loop | Fondo del hero |
| Hero móvil | `/videos/hero-mobile.mp4` + `.webm` + `.jpg` | 9:16 · 1080×1920 | 10–15 s loop | Hero < 768 px |
| Categoría ×5 | `/videos/cat-perro.mp4`, `cat-gato.mp4`, `cat-aves.mp4`, `cat-peces.mp4`, `cat-exoticos.mp4` (+ `.webm` + `.jpg`) | 1:1 · 720×720 | 3–4 s loop | Hover de categorías |
| Narrativa | `/videos/ingredientes.mp4` + `.webm` + `.jpg` | 21:9 · 2520×1080 | 15 s | "Qué hay adentro" |
| Nosotros ×2 | `/videos/nosotros-1.mp4`, `nosotros-2.mp4` (+ `.webm` + `.jpg`) | 4:5 · 1080×1350 | 8 s | Página editorial |

Peso objetivo: hero ≤ 6 MB (mp4) y ≤ 4 MB (webm); categorías ≤ 1 MB; narrativa ≤ 8 MB; nosotros ≤ 3 MB cada uno. Bitrate variable, keyframe cada 2 s para que el loop no salte.

## Dirección de arte común

Luz natural cálida de mañana, fondos planos o muy limpios en hueso, coral o ámbar (sin clínicas, sin tiendas, sin césped saturado). Cámara lenta y estable, movimientos de 5–10 % (dolly suave, paneo mínimo). Mascotas reales y sanas, pelo brillante, sin accesorios de disfraz. Nada de huellitas, huesos de caricatura ni texto en pantalla. Primer y último frame parecidos para que el loop sea invisible.

## Prompts sugeridos (Seedance 2.0)

> El anexo con los prompts oficiales no llegó con el brief. Estos son propuestas de partida, escritas para que el resultado encaje con el sistema de diseño. Reemplázalos por los del anexo cuando los tengas.

**hero.mp4 (16:9, 12 s, loop)**
Cinematic slow-motion of a golden retriever and a grey tabby cat sharing a sunlit kitchen floor, warm morning light through linen curtains, cream and terracotta tones, shallow depth of field, 35 mm lens, gentle dolly-in, no people, no text, seamless loop.

**hero-mobile.mp4 (9:16, 12 s, loop)**
Vertical close-up of a golden retriever lifting its head toward warm window light, soft cream background, slow breathing, calm eyes, shallow depth of field, gentle handheld drift, no text, seamless loop.

**cat-perro.mp4 (1:1, 4 s, loop)**
Studio close-up of a happy beagle tilting its head, flat coral (#E95154) background, soft even light, slight slow motion, no text, seamless loop.

**cat-gato.mp4 (1:1, 4 s, loop)**
Studio close-up of a grey cat blinking slowly, flat amber (#FBAA35) background, soft even light, slow motion, no text, seamless loop.

**cat-aves.mp4 (1:1, 4 s, loop)**
Studio close-up of a green budgerigar ruffling its feathers, flat bone (#EDE9E5) background, soft light, slow motion, no text, seamless loop.

**cat-peces.mp4 (1:1, 4 s, loop)**
Macro of a single betta fish gliding in clear water, flat coral (#E95154) background behind the tank, soft top light, slow motion, no text, seamless loop.

**cat-exoticos.mp4 (1:1, 4 s, loop)**
Studio close-up of a small rabbit twitching its nose, flat amber (#FBAA35) background, soft even light, slow motion, no text, seamless loop.

**ingredientes.mp4 (21:9, 15 s)**
Ultra-wide macro sequence: fresh salmon fillet, cooked quinoa, sweet potato cubes and blueberries placed one by one on a bone-colored ceramic surface, warm side light, slow overhead dolly, clean editorial food styling, no hands, no text.

**nosotros-1.mp4 (4:5, 8 s)**
Vertical portrait of a veterinarian in a linen shirt gently examining a small dog on a wooden table, warm daylight, bone-colored wall, calm and unhurried, shallow depth of field, no text.

**nosotros-2.mp4 (4:5, 8 s)**
Vertical shot of kibble pouring slowly into a ceramic bowl on a bone-colored surface, warm side light, macro detail, slow motion, no text.
