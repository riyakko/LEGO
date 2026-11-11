import { useState } from 'react'
import './App.css'

const skinOptions = [
  { name: 'Fair', color: '#f5c7a6' },
  { name: 'Warm Tan', color: '#d99b72' },
  { name: 'Deep Bronze', color: '#9e6044' },
  { name: 'Golden', color: '#efb77d' },
  { name: 'Porcelain', color: '#ffe0cf' },
]

const hairColorOptions = [
  { name: 'Brown', color: '#5C3A21' },
  { name: 'Dark Brown', color: '#3A2215' },
  { name: 'Black', color: '#222026' },
  { name: 'Auburn', color: '#9E4A28' },
  { name: 'Blonde', color: '#D4A359' },
]

const hairStyleOptions = [
  { name: 'Long Straight', style: 'long' },
  { name: 'Fluffy Waves', style: 'waves' },
  { name: 'Slick Quiff', style: 'slick' },
  { name: 'Soft Curls', style: 'curly' },
  { name: 'Clean Crop', style: 'crop' },
]

const shirtOptions = [
  { name: 'Hoodie', color: '#8b5cf6', mark: '⌒' },
  { name: 'Graphic Tee', color: '#f06b8d', mark: '♡' },
  { name: 'Button-down', color: '#5ab2a7', mark: '⋮' },
  { name: 'Sweater', color: '#efaa56', mark: '≋' },
  { name: 'Jersey', color: '#3e74cf', mark: '★' },
]
const pantsOptions = [
  { name: 'Cargo Pants', color: '#779573' },
  { name: 'Denim Jeans', color: '#4778aa' },
  { name: 'Joggers', color: '#576074' },
  { name: 'Tailored Trousers', color: '#30384e' },
  { name: 'Shorts', color: '#d08b67' },
]
const faceOptions = [
  { name: 'Happy Smile', style: 'happy' },
  { name: 'Wink', style: 'wink' },
  { name: 'Soft Smile', style: 'soft' },
  { name: 'Sunglasses', style: 'cool' },
  { name: 'Laughing', style: 'laugh' },
  { name: 'Closed-Eye Smile', style: 'closed' },
  { name: 'Tongue Out', style: 'tongue' },
  { name: 'Surprised', style: 'surprised' },
  { name: 'Peaceful', style: 'peaceful' },
  { name: 'Heart Eyes', style: 'hearts' },
]
const venues = [
  { id: 'park', name: 'The Park', description: 'Sunshine, a picnic blanket, and just us.', lines: ['The sun looks better with you in it.', "Picnic's ready. I brought the good snacks.", 'I could stay here with you forever.'] },
  { id: 'movies', name: 'The Movies', description: 'Two tickets, one giant popcorn, no spoilers.', lines: ["Okay, but you're sharing the popcorn.", 'No spoilers. I mean it.', 'Best seat in the house is next to you.'] },
  { id: 'stay', name: 'Cozy Stay-In', description: 'Blankets, fairy lights, and our favorite movie.', lines: ['Blankets, fairy lights, and you. Perfect.', "Pick the movie, I'll pick the snacks.", 'Home is wherever you are.'] },
]

const initialCharacterMe = { skin: 0, hairStyle: 0, hairColor: 0, shirt: 0, pants: 0, face: 0 };
const initialCharacterHim = { skin: 1, hairStyle: 2, hairColor: 2, shirt: 2, pants: 1, face: 1 };

// Hair system: each style is split into a back layer (drawn behind the head)
// and a front layer (drawn over the head, clear of the face area).
const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16)
  const f = c => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)))
  return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(f).map(v => v.toString(16).padStart(2, '0')).join('')
}

function HairBack({ styleIndex, colorIndex }) {
  const style = hairStyleOptions[styleIndex].style
  if (style !== 'long') return null
  const base = hairColorOptions[colorIndex].color
  const dark = shade(base, -0.4)
  return <g stroke={dark} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <path d="M60 100 C44 150 46 214 62 252 C100 264 160 264 198 252 C214 214 216 150 200 100 Z" fill={shade(base, -0.12)} />
    <g fill="none" stroke={dark} strokeOpacity=".35" strokeWidth="2">
      <path d="M78 150 C74 190 78 232 90 262" />
      <path d="M182 150 C186 190 182 232 170 262" />
      <path d="M130 170 V268" />
    </g>
  </g>
}

function HairFront({ styleIndex, colorIndex }) {
  const style = hairStyleOptions[styleIndex].style
  const base = hairColorOptions[colorIndex].color
  const dark = shade(base, -0.4)
  const light = shade(base, 0.35)
  const common = { stroke: dark, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' }
  const strands = { fill: 'none', stroke: dark, strokeOpacity: 0.3, strokeWidth: 2, strokeLinecap: 'round' }
  const sheen = { fill: 'none', stroke: light, strokeOpacity: 0.55, strokeWidth: 4, strokeLinecap: 'round' }

  if (style === 'long') return <g>
    {/* side locks framing the face */}
    <path {...common} fill={base} d="M64 112 C57 140 57 172 65 192 C70 199 79 196 80 187 C81 166 79 140 83 114 Z" />
    <path {...common} fill={base} d="M196 112 C203 140 203 172 195 192 C190 199 181 196 180 187 C179 166 181 140 177 114 Z" />
    {/* rounded crown with curtain bangs */}
    <path {...common} fill={base} d="M64 122 C54 80 88 58 130 58 C172 58 206 80 196 122 C186 118 176 118 164 116 C148 112 136 106 130 98 C124 106 112 112 96 116 C84 118 74 118 64 122 Z" />
    <path {...strands} d="M130 98 C129 84 128 72 128 62 M114 108 C104 96 98 82 100 68 M146 108 C156 96 162 82 160 68 M84 114 C76 100 74 86 80 74 M176 114 C184 100 186 86 180 74 M68 128 C65 148 66 170 70 188 M192 128 C195 148 194 170 190 188" />
    <path {...sheen} d="M92 76 C110 64 150 64 168 76" />
  </g>

  if (style === 'waves') return <g>
    <path {...common} fill={base} d="M62 156 C52 104 72 64 130 60 C188 64 208 104 198 156 L188 156 C190 134 184 122 172 116 C152 122 122 112 100 98 C92 110 82 124 78 156 Z" />
    <path {...strands} d="M80 128 C74 118 74 106 80 98 M180 128 C186 118 186 106 180 98 M112 92 C124 104 140 110 158 110 M100 74 C116 66 140 64 160 72" />
    <path {...sheen} d="M92 84 C108 70 130 66 152 72" />
  </g>

  if (style === 'slick') return <g>
    <path {...common} fill={base} d="M66 130 C60 84 92 58 134 58 C178 60 202 84 194 130 L187 130 C186 118 182 110 174 104 C150 96 112 98 84 110 C78 114 76 120 75 130 Z" />
    <path {...common} fill={base} d="M84 100 C90 66 142 50 182 72 C150 64 112 70 84 100 Z" />
    <path {...strands} d="M92 104 C120 88 150 84 178 90 M100 112 C128 98 156 94 184 100 M96 78 C122 66 152 64 176 72" />
    <path {...sheen} d="M100 80 C124 68 150 68 170 76" />
  </g>

  if (style === 'curly') {
    const circles = [
      [130, 70, 26], [92, 82, 22], [168, 82, 22], [108, 72, 20], [152, 72, 20],
      [80, 108, 20], [180, 108, 20], [74, 132, 14], [186, 132, 14],
      [104, 108, 14], [130, 106, 14], [156, 108, 14],
    ]
    return <g>
      <g {...common}>{circles.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={base} />)}</g>
      <g>{circles.map(([x, y, r], i) => <circle key={'f' + i} cx={x} cy={y} r={r - 1} fill={base} />)}</g>
      <g {...strands}>
        <path d="M118 64 A12 12 0 0 1 138 66 M84 78 A10 10 0 0 1 98 88 M162 88 A10 10 0 0 1 176 78 M98 104 A8 8 0 0 1 110 110 M150 110 A8 8 0 0 1 162 104" />
      </g>
      <path {...sheen} d="M112 58 A14 14 0 0 1 134 56" />
    </g>
  }

  if (style === 'crop') return <g>
    <path {...common} fill={base} d="M66 130 C60 84 90 62 130 62 C170 62 200 84 194 130 L186 130 C185 120 182 114 176 112 C158 118 142 112 130 106 C118 114 102 118 84 112 C78 114 75 120 74 130 Z" />
    <path {...strands} d="M130 106 C128 92 128 78 130 66 M108 114 C100 100 96 86 96 74 M152 112 C160 100 164 86 164 74" />
    <path {...sheen} d="M96 76 C110 70 124 68 136 70" />
  </g>

  return null
}

function FaceArt({ expression }) {
  const style = faceOptions[expression]?.style || 'happy'
  const ink = '#493b3a'
  const mouth = '#87505a'
  const eye = (cx) => <g>
    <ellipse cx={cx} cy="137" rx="5.5" ry="7.5" fill="#29252a"/>
    <circle cx={cx - 1.5} cy="134.5" r="1.8" fill="#fff"/>
  </g>
  const smile = <path d="M111 166 Q130 184 149 166" fill="none" stroke={mouth} strokeWidth="3.6" strokeLinecap="round"/>
  const hearts = (cx) => <path d={`M${cx} 148 C${cx-15} 137 ${cx-17} 153 ${cx} 166 C${cx+17} 153 ${cx+15} 137 ${cx} 148Z`} fill="#e84f78"/>
  return <g strokeLinecap="round" strokeLinejoin="round">
    <g fill="#ef8f9c" opacity=".48">
      <ellipse cx="77" cy="163" rx="11" ry="5.5"/><ellipse cx="183" cy="163" rx="11" ry="5.5"/>
    </g>
    {style === 'cool' ? <g>
      <path d="M84 119 Q94 113 104 119 M156 119 Q166 113 176 119" fill="none" stroke={ink} strokeWidth="3.2"/>
      <rect x="78" y="132" width="52" height="27" rx="10" fill="#24232b" stroke="#17151b" strokeWidth="2"/>
      <rect x="130" y="132" width="52" height="27" rx="10" fill="#24232b" stroke="#17151b" strokeWidth="2"/>
      <path d="M83 136 L105 153 M137 136 L160 153" stroke="#aeb0bd" strokeWidth="2" opacity=".55"/>
      {smile}
    </g> : style === 'hearts' ? <g>
      <path d="M84 119 Q94 113 104 119 M156 119 Q166 113 176 119" fill="none" stroke={ink} strokeWidth="3.2"/>
      {hearts(94)}{hearts(166)}{smile}
    </g> : <g>
      {style === 'closed' || style === 'peaceful' || style === 'laugh'
        ? <g fill="none" stroke={ink} strokeWidth="3.2"><path d="M84 139 Q94 129 104 139"/><path d="M156 139 Q166 129 176 139"/></g>
        : style === 'wink' || style === 'tongue'
          ? <g>{eye(94)}<path d="M156 139 Q166 126 177 137" fill="none" stroke={ink} strokeWidth="3.5"/></g>
          : <g>{eye(94)}{eye(166)}</g>}
      {style !== 'closed' && style !== 'peaceful' && style !== 'laugh' && <g fill="none" stroke={ink} strokeWidth="3.2"><path d="M84 119 Q94 113 104 119"/><path d="M156 119 Q166 113 176 119"/></g>}
      {style === 'surprised'
        ? <ellipse cx="130" cy="170" rx="8" ry="10" fill="#713b49"/>
        : style === 'laugh'
          ? <g><path d="M108 164 Q130 195 152 164 Q150 194 130 194 Q110 194 108 164Z" fill="#713b49"/><path d="M114 169 Q130 176 146 169 Q143 178 130 178 Q117 178 114 169Z" fill="#fff5ed"/><path d="M117 185 Q130 190 143 185" fill="none" stroke="#e78b9d" strokeWidth="3"/></g>
          : style === 'tongue'
            ? <g><path d="M111 166 Q130 183 149 166" fill="none" stroke={mouth} strokeWidth="3.5"/><path d="M121 174 Q130 176 139 174 Q141 192 130 192 Q119 192 121 174Z" fill="#e97891" stroke="#a84e65" strokeWidth="1.5"/><path d="M130 178 V187" stroke="#a84e65" strokeWidth="1.2"/></g>
            : smile}
    </g>}
  </g>
}

const INK = '#29232b'

const ARM_L = 'M69 222 Q48 218 43 242 L38 319 Q37 345 54 350 Q69 349 71 332 L78 259Z'
const ARM_R = 'M191 222 Q212 218 217 242 L222 319 Q223 345 206 350 Q191 349 189 332 L182 259Z'
const TORSO = 'M68 222 Q76 205 98 204 L110 198 H150 L162 204 Q184 205 192 222 L202 345 Q203 359 188 360 H72 Q57 359 58 345Z'

function ShirtDetails({ name }) {
  const stitch = { fill: 'none', stroke: '#fff', strokeOpacity: '.42', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
  return <g strokeLinecap="round" strokeLinejoin="round">
    {/* Neckline and shoulder shaping */}
    {name === 'Hoodie' && <g>
      <path d="M108 205 Q130 225 152 205 L157 224 Q130 245 103 224Z" fill="#fff" fillOpacity=".12" stroke="#fff" strokeOpacity=".5" strokeWidth="1.8"/>
      <path d="M116 221 L118 249 M144 221 L142 249" stroke="#f8f3ff" strokeWidth="2"/>
      <path d="M116 246 L118 251 M142 246 L140 251" stroke="#f8f3ff" strokeWidth="3"/>
      <path d="M94 281 Q130 269 166 281 L163 312 Q130 322 97 312Z" fill={shade(shirtOptions[0].color, -0.12)} fillOpacity=".45" stroke="#fff" strokeOpacity=".45" strokeWidth="1.8"/>
      <path d="M99 286 Q130 279 161 286 M101 307 Q130 314 159 307" {...stitch}/>
      <path d="M69 231 Q78 247 82 268 M191 231 Q182 247 178 268" {...stitch}/>
      <path d="M77 346 Q130 354 183 346" {...stitch}/>
    </g>}
    {name === 'Graphic Tee' && <g>
      <path d="M110 204 Q130 220 150 204 L145 216 Q130 228 115 216Z" fill="#fff" fillOpacity=".22" stroke="#fff" strokeOpacity=".72" strokeWidth="1.8"/>
      <path d="M91 236 Q130 244 169 236" {...stitch}/>
      <path d="M130 248 C108 229 96 254 130 279 C164 254 152 229 130 248Z" fill="#fff" fillOpacity=".9"/>
      <path d="M130 252 C119 245 112 254 130 269 C148 254 141 245 130 252Z" fill={shade(shirtOptions[1].color, -0.12)} fillOpacity=".8"/>
      <path d="M65 277 Q75 283 82 280 M198 280 Q205 283 215 277" {...stitch}/>
      <path d="M76 345 Q130 353 184 345" {...stitch}/>
    </g>}
    {name === 'Button-down' && <g>
      <path d="M108 203 L130 225 L115 244 L103 211Z" fill="#e9fffa" fillOpacity=".72" stroke="#fff" strokeWidth="1.5"/>
      <path d="M152 203 L130 225 L145 244 L157 211Z" fill="#e9fffa" fillOpacity=".72" stroke="#fff" strokeWidth="1.5"/>
      <path d="M130 225 V350" stroke="#fff" strokeOpacity=".8" strokeWidth="2"/>
      {[239, 260, 281, 302, 323, 341].map(y => <circle key={y} cx="130" cy={y} r="2.1" fill="#f7fffc" stroke="#438f86" strokeWidth=".8"/>)}
      <path d="M151 250 L177 250 L177 277 L151 277Z" fill="#fff" fillOpacity=".12" stroke="#fff" strokeOpacity=".8" strokeWidth="1.5"/>
      <path d="M151 250 L164 258 L177 250" {...stitch}/>
      <path d="M83 250 L105 250 L105 277 L83 277Z" fill="#fff" fillOpacity=".1" stroke="#fff" strokeOpacity=".5" strokeWidth="1.3"/>
      <path d="M77 345 Q130 352 183 345" {...stitch}/>
    </g>}
    {name === 'Sweater' && <g>
      <path d="M109 204 Q130 224 151 204 L146 219 Q130 232 114 219Z" fill="#fff" fillOpacity=".13" stroke="#fff" strokeOpacity=".65" strokeWidth="1.8"/>
      {Array.from({length: 7}, (_, i) => <path key={i} d={`M${76 + i * 18} 238 Q${82 + i * 18} 270 ${76 + i * 18} 302`} stroke="#fff" strokeOpacity=".15" strokeWidth="2" fill="none"/>)}
      {[274, 282, 290, 298].map(y => <path key={y} d={`M64 ${y} Q130 ${y + 10} 196 ${y}`} stroke="#fff" strokeOpacity=".38" strokeWidth="2" fill="none"/>)}
      <path d="M59 337 Q130 348 201 337 L202 353 Q130 365 58 353Z" fill="#fff" fillOpacity=".12"/>
      <path d="M68 343 Q130 354 192 343 M68 350 Q130 361 192 350" {...stitch}/>
      <path d="M66 229 Q72 243 76 260 M194 229 Q188 243 184 260" {...stitch}/>
    </g>}
    {name === 'Jersey' && <g>
      <path d="M108 204 Q130 221 152 204 L147 218 Q130 232 113 218Z" fill="#fff" fillOpacity=".15" stroke="#fff" strokeOpacity=".7" strokeWidth="1.8"/>
      <path d="M69 239 L91 246 L84 266 L62 259Z M191 239 L169 246 L176 266 L198 259Z" fill="#fff" fillOpacity=".8"/>
      <path d="M72 276 Q130 286 188 276" stroke="#fff" strokeOpacity=".22" strokeWidth="3" fill="none"/>
      <text x="130" y="286" textAnchor="middle" fontSize="31" fontWeight="800" fill="#fff" stroke="#244a91" strokeWidth=".7">07</text>
      <path d="M108 299 H152" stroke="#fff" strokeOpacity=".75" strokeWidth="2"/>
      <text x="130" y="316" textAnchor="middle" fontSize="8" letterSpacing="1.5" fontWeight="700" fill="#fff">PLAYER</text>
      <path d="M76 345 Q130 354 184 345" {...stitch}/>
    </g>}
  </g>
}
function Legs({ index }) {
  const color = pantsOptions[index].color
  const dark = shade(color, -0.25)
  const light = shade(color, 0.28)
  const seam = { fill: 'none', stroke: dark, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const shoes = <g>
    <path d="M72 449 H121 Q129 449 130 459 V471 H67 V459 Q67 449 72 449Z" fill="#f0e8dc" stroke="#b9ad9f" strokeWidth="1.5"/>
    <path d="M130 449 H180 Q188 449 189 459 V471 H125 V459 Q125 449 130 449Z" fill="#f0e8dc" stroke="#b9ad9f" strokeWidth="1.5"/>
    <path d="M74 460 H124 M132 460 H182" stroke="#c8b9aa" strokeWidth="1.4" fill="none"/>
  </g>

  if (index === 4) return <g>
    {/* Shorts with exposed lower legs */}
    <path d="M75 351 H126 V416 Q126 423 117 423 H80 Q68 423 68 412Z" fill={color} stroke={dark} strokeWidth="2"/>
    <path d="M134 351 H185 V412 Q185 423 173 423 H136 Q127 423 127 416Z" fill={color} stroke={dark} strokeWidth="2"/>
    <path d="M75 358 H126 M134 358 H185" stroke={light} strokeWidth="3" fill="none"/>
    <path d="M82 366 V407 Q98 412 119 407 M141 407 Q160 412 177 407 V366" {...seam}/>
    <path d="M88 370 H112 L110 386 H88Z M148 370 H172 L172 386 H150Z" fill={light} fillOpacity=".16" stroke={dark} strokeWidth="1.5"/>
    <path d="M68 412 Q97 418 126 412 M127 412 Q156 418 185 412" fill="none" stroke={dark} strokeWidth="2.5"/>
    <path d="M82 424 V449 M174 424 V449" stroke="#b77c5f" strokeOpacity=".45" strokeWidth="2"/>
    {shoes}
  </g>

  return <g>
    <path d="M75 351 H126 V455 Q126 466 115 466 H78 Q68 466 68 455Z" fill={color} stroke={dark} strokeWidth="2"/>
    <path d="M134 351 H185 V455 Q185 466 174 466 H137 Q127 466 127 455Z" fill={color} stroke={dark} strokeWidth="2"/>
    <path d="M75 357 H126 M134 357 H185" stroke={light} strokeWidth="3" fill="none"/>

    {index === 0 && <g>
      {/* Cargo: roomy thigh pockets, flap buttons, and reinforced knees */}
      <path d="M79 378 L119 378 L117 414 L80 414Z M141 378 L181 378 L180 414 L143 414Z" fill={light} fillOpacity=".22" stroke={dark} strokeWidth="1.8"/>
      <path d="M79 382 Q99 376 119 382 L117 391 H80Z M141 382 Q161 376 181 382 L180 391 H143Z" fill={light} fillOpacity=".55" stroke={dark} strokeWidth="1.5"/>
      <path d="M98 388 V392 M160 388 V392" stroke={dark} strokeWidth="2.5"/>
      <path d="M78 425 Q99 430 122 425 M132 425 Q155 430 182 425" {...seam}/>
      <path d="M84 365 V450 M176 365 V450" stroke={light} strokeOpacity=".55" strokeWidth="2" fill="none"/>
    </g>}

    {index === 1 && <g>
      {/* Denim: fly, double-stitched seams, coin and back-pocket hints */}
      <path d="M130 359 V448" stroke={dark} strokeWidth="2" fill="none"/>
      <path d="M130 359 Q121 365 123 379" stroke={light} strokeWidth="2" fill="none"/>
      <path d="M82 375 L118 375 L114 394 L86 394Z M142 375 L178 375 L174 394 L146 394Z" fill="none" stroke={dark} strokeWidth="1.6"/>
      <path d="M84 363 V448 M176 363 V448" stroke={light} strokeWidth="2" fill="none"/>
      <path d="M76 430 Q99 434 122 430 M134 430 Q157 434 184 430" stroke={light} strokeWidth="2" fill="none"/>
      <circle cx="119" cy="365" r="2" fill="#d7bd78"/>
    </g>}

    {index === 2 && <g>
      {/* Joggers: tapered panels, drawstring, and ribbed ankle cuffs */}
      <path d="M75 351 H126 L119 455 Q118 460 110 460 H82 Q75 460 75 452Z" fill={color}/>
      <path d="M134 351 H185 L185 452 Q185 460 178 460 H150 Q142 460 141 455Z" fill={color}/>
      <path d="M117 360 Q130 367 143 360" stroke={light} strokeWidth="2" fill="none"/>
      <path d="M124 362 L121 376 M136 362 L139 376" stroke={light} strokeWidth="2" fill="none"/>
      <path d="M84 386 Q98 392 113 386 M147 386 Q162 392 176 386" stroke={light} strokeOpacity=".55" strokeWidth="2" fill="none"/>
      <path d="M77 448 H119 M138 448 H183" stroke={dark} strokeWidth="4" fill="none"/>
      <path d="M82 452 H116 M141 452 H179" stroke={light} strokeWidth="1.5" fill="none"/>
    </g>}

    {index === 3 && <g>
      {/* Tailored trousers: pressed creases, belt loops, pockets, and crease lines */}
      <path d="M75 357 H126 M134 357 H185" stroke={dark} strokeWidth="2" fill="none"/>
      {[84, 105, 147, 168].map(x => <path key={x} d={`M${x} 352 V362`} stroke={light} strokeWidth="3"/>)}
      <path d="M83 370 Q95 376 108 370 M152 370 Q165 376 177 370" stroke={light} strokeWidth="1.8" fill="none"/>
      <path d="M101 368 L96 447 M159 368 L164 447" stroke={light} strokeOpacity=".75" strokeWidth="2" fill="none"/>
      <path d="M130 359 V447" stroke={dark} strokeWidth="1.5" strokeOpacity=".6" fill="none"/>
      <path d="M72 442 Q96 447 123 442 M132 442 Q159 447 185 442" stroke={dark} strokeWidth="1.8" fill="none"/>
    </g>}
    {shoes}
  </g>
}

function LegoCharacter({ character, x = 0, y = 0, scale = 1, onClick }) {
  const skin = skinOptions[character.skin].color
  const shirt = shirtOptions[character.shirt]
  return <g className={onClick ? 'fig' : undefined} transform={`translate(${x} ${y}) scale(${scale})`} onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
    <Legs index={character.pants}/>
    <HairBack styleIndex={character.hairStyle} colorIndex={character.hairColor}/>
    <path d={ARM_L} fill={shirt.color} stroke="#5c5266" strokeOpacity=".25" strokeWidth="2"/>
    <path d={ARM_R} fill={shirt.color} stroke="#5c5266" strokeOpacity=".25" strokeWidth="2"/>
    <path d="M47 337 Q34 341 38 355 Q42 368 57 363 Q65 360 62 351" fill="none" stroke={skin} strokeWidth="12" strokeLinecap="round"/>
    <path d="M213 337 Q226 341 222 355 Q218 368 203 363 Q195 360 198 351" fill="none" stroke={skin} strokeWidth="12" strokeLinecap="round"/>
    <path d={TORSO} fill={shirt.color} stroke="#51495a" strokeOpacity=".3" strokeWidth="2.5"/>
    <ShirtDetails name={shirt.name}/>
    <rect x="112" y="178" width="36" height="40" rx="8" fill={skin}/>
    <rect x="70" y="77" width="120" height="126" rx="36" fill={skin} stroke="#9a6d59" strokeOpacity=".28" strokeWidth="2"/>
    <path d="M76 113 Q130 95 184 113" fill="none" stroke="#fff" strokeOpacity=".16" strokeWidth="5" strokeLinecap="round"/>
    <FaceArt expression={character.face}/>
    <HairFront styleIndex={character.hairStyle} colorIndex={character.hairColor}/>
  </g>
}

/* ---------- Scene backdrops (wide, so any crop stays filled) ---------- */
function SceneBackdrop({ id }) {
  if (id === 'park') return <g>
    <defs><linearGradient id="sbPark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f9c8ac"/><stop offset="1" stopColor="#fdeccf"/></linearGradient></defs>
    <rect x="-300" y="-100" width="1120" height="540" fill="url(#sbPark)"/>
    <circle cx="430" cy="110" r="74" fill="#fff3c4" opacity=".45"/>
    <circle cx="430" cy="110" r="42" fill="#fff0b0"/>
    <path d="M-300 300 Q-80 220 120 285 T520 270 T820 290 V600 H-300Z" fill="#cfe0b0"/>
    <g fill="#7a5a48"><rect x="-14" y="285" width="8" height="46"/><rect x="522" y="283" width="8" height="46"/></g>
    <g fill="#8fb27e"><circle cx="-10" cy="250" r="54"/><circle cx="38" cy="272" r="38"/><circle cx="526" cy="246" r="58"/><circle cx="580" cy="272" r="40"/></g>
    <path d="M-300 335 Q60 305 260 335 T820 330 V600 H-300Z" fill="#b6d397"/>
    <path d="M-300 432 Q260 395 820 432 V600 H-300Z" fill="#a4c586"/>
    <path d="M-300 445 Q260 405 820 445" stroke="#efdcc0" strokeWidth="70" fill="none"/>
  </g>
  if (id === 'movies') return <g>
    <defs>
      <linearGradient id="sbMovie" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#241a3f"/><stop offset="1" stopColor="#120e24"/></linearGradient>
      <radialGradient id="sbScreen" cx=".5" cy=".5" r=".75"><stop offset="0" stopColor="#f3b9e8"/><stop offset="1" stopColor="#9a62cc"/></radialGradient>
    </defs>
    <rect x="-300" y="-100" width="1120" height="700" fill="url(#sbMovie)"/>
    <path d="M70 266 L-70 460 H590 L450 266Z" fill="#c9a0f0" opacity=".07"/>
    <rect x="50" y="60" width="420" height="206" rx="14" fill="#2c2147" stroke="#8d6cc4" strokeWidth="5"/>
    <rect x="64" y="74" width="392" height="178" rx="8" fill="url(#sbScreen)"/>
    <path d="M-300 385 Q260 335 820 385 V600 H-300Z" fill="#150f28"/>
    <g fill="#2a1f47">{[-90, 0, 90, 440, 530, 620].map(sx => <rect key={sx} x={sx} y="338" width="76" height="64" rx="18"/>)}</g>
    <path d="M-300 425 Q260 395 820 425 V600 H-300Z" fill="#0f0b1e"/>
  </g>
  if (id === 'stay') return <g>
    <defs><linearGradient id="sbStay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#573a4d"/><stop offset="1" stopColor="#3d2835"/></linearGradient></defs>
    <rect x="-300" y="-100" width="1120" height="700" fill="url(#sbStay)"/>
    {Array.from({ length: 9 }, (_, i) => {
      const x0 = -90 + i * 90
      return <g key={i}>
        <path d={`M${x0} 30 Q${x0 + 45} 92 ${x0 + 90} 30`} stroke="#d9a67c" strokeWidth="2" fill="none"/>
        <circle cx={x0 + 45} cy="62" r="18" fill="#ffd68b" opacity=".22"/>
        <circle cx={x0 + 45} cy="62" r="8" fill="#ffd68b"/>
      </g>
    })}
    <rect x="30" y="240" width="460" height="140" rx="36" fill="#b8777f"/>
    <rect x="30" y="318" width="460" height="74" rx="26" fill="#c98a90"/>
    <rect x="60" y="262" width="90" height="64" rx="18" fill="#e7b0ab"/>
    <rect x="370" y="262" width="90" height="64" rx="18" fill="#a9d1c9" opacity=".9"/>
    <path d="M-300 410 Q260 372 820 410 V600 H-300Z" fill="#6e4856"/>
    <ellipse cx="260" cy="446" rx="280" ry="34" fill="#8d5a66" opacity=".7"/>
  </g>
  return <g>
    <defs><linearGradient id="sbStudio" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fdeef2"/><stop offset="1" stopColor="#ece6fa"/></linearGradient></defs>
    <rect x="-300" y="-100" width="1120" height="700" fill="url(#sbStudio)"/>
    <circle cx="80" cy="130" r="96" fill="#fff" opacity=".5"/>
    <circle cx="450" cy="110" r="64" fill="#fff" opacity=".4"/>
    <path d="M-300 415 Q260 385 820 415 V600 H-300Z" fill="#fff" opacity=".6"/>
  </g>
}

const FIGURES = [{ x: 57, y: 22 }, { x: 229, y: 22 }]
const FIG_SCALE = 0.9

function CharacterIllustration({ characters, venue, viewBox = '20 40 480 420', bare = false, selectedIndex = null, onFigureClick }) {
  return <svg className="character-illustration" viewBox={viewBox} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Two customized LEGO minifigure characters">
    {!bare && <SceneBackdrop id={venue?.id}/>}
    {FIGURES.map((p, i) => {
      const cx = p.x + 130 * FIG_SCALE
      return <g key={i}>
        {!bare && selectedIndex === i && <ellipse cx={cx} cy="448" rx="104" ry="17" fill="#e0627f" opacity=".28"/>}
        {!bare && <ellipse cx={cx} cy="448" rx="78" ry="11" fill="#000" opacity=".14"/>}
        <LegoCharacter character={characters[i]} x={p.x} y={p.y} scale={FIG_SCALE} onClick={onFigureClick ? () => onFigureClick(i) : undefined}/>
      </g>
    })}
  </svg>
}

/* ---------- Option thumbnails ---------- */
function HairThumb({ character, styleIndex }) {
  const skin = skinOptions[character.skin].color
  return <svg viewBox="40 44 180 210" aria-hidden="true">
    <HairBack styleIndex={styleIndex} colorIndex={character.hairColor}/>
    <rect x="112" y="178" width="36" height="40" rx="8" fill={skin}/>
    <rect x="70" y="77" width="120" height="126" rx="36" fill={skin} stroke="#9a6d59" strokeOpacity=".28" strokeWidth="2"/>
    <FaceArt expression={0}/>
    <HairFront styleIndex={styleIndex} colorIndex={character.hairColor}/>
  </svg>
}
function ShirtThumb({ index }) {
  const shirt = shirtOptions[index]
  return <svg viewBox="30 190 200 176" aria-hidden="true">
    <path d={ARM_L} fill={shirt.color} stroke="#5c5266" strokeOpacity=".25" strokeWidth="2"/>
    <path d={ARM_R} fill={shirt.color} stroke="#5c5266" strokeOpacity=".25" strokeWidth="2"/>
    <path d={TORSO} fill={shirt.color} stroke="#51495a" strokeOpacity=".3" strokeWidth="2.5"/>
    <ShirtDetails name={shirt.name}/>
  </svg>
}
function PantsThumb({ index }) {
  return <svg viewBox="52 340 156 136" aria-hidden="true"><Legs index={index}/></svg>
}
function FaceThumb({ character, index }) {
  const skin = skinOptions[character.skin].color
  return <svg viewBox="64 104 132 106" aria-hidden="true">
    <rect x="70" y="77" width="120" height="126" rx="36" fill={skin} stroke="#9a6d59" strokeOpacity=".28" strokeWidth="2"/>
    <FaceArt expression={index}/>
  </svg>
}

function OptionGroup({ title, value, children }) {
  return <section className="option-group">
    <div className="option-heading"><h3>{title}</h3><span>{value}</span></div>
    <div className="option-grid">{children}</div>
  </section>
}
function Opt({ selected, label, onClick, children }) {
  return <button type="button" className={`opt ${selected ? 'selected' : ''}`} aria-pressed={selected} aria-label={label} title={label} onClick={onClick}>{children}</button>
}
function Swatches({ options, value, onChange }) {
  return options.map((o, i) => <Opt key={o.name} label={o.name} selected={value === i} onClick={() => onChange(i)}><span className="swatch" style={{ background: o.color }}/></Opt>)
}

/* ---------- Pages ---------- */
function Landing({ characters, onStart }) {
  return <main className="landing">
    <div className="landing-card">
      <span className="spark s1">♥</span><span className="spark s2">✦</span><span className="spark s3">♡</span><span className="spark s4">✦</span>
      <div className="landing-figures"><CharacterIllustration characters={characters} bare viewBox="60 58 400 400"/></div>
      <h1>Here&apos;s my surprise <em>for you.</em></h1>
      <p className="landing-copy">I built our very own virtual date generator, so we can hang out anytime, anywhere. Ready to build us?</p>
      <button className="btn" onClick={onStart}>Unwrap my surprise <span>→</span></button>
      <p className="landing-note">made for Steve, with love</p>
    </div>
  </main>
}

function Stepper({ step }) {
  return <nav className="stepper" aria-label="Progress">{['Build', 'Pick a date', 'Our date'].map((label, i) => {
    const state = i + 1 < step ? 'done' : i + 1 === step ? 'active' : ''
    return <div className={`step ${state}`} key={label}><i>{state === 'done' ? '✓' : i + 1}</i><b>{label}</b></div>
  })}</nav>
}

const tabs = [['skin', 'Skin'], ['hair', 'Hair'], ['outfit', 'Outfit'], ['face', 'Face']]

function Builder({ characters, setCharacters, onProceed }) {
  const [who, setWho] = useState(0)
  const [tab, setTab] = useState('skin')
  const update = (key, value) => setCharacters(cur => cur.map((c, i) => i === who ? { ...c, [key]: value } : c))
  const c = characters[who]
  return <main className="page">
    <header className="page-head"><h1>Build our <em>love story.</em></h1><p>Make our little LEGO selves look just like us.</p></header>
    <div className="builder-layout">
      <div className="preview-card"><div className="stage"><CharacterIllustration characters={characters} selectedIndex={who} onFigureClick={setWho}/></div></div>
      <section className="panel">
        <div className="seg" role="tablist" aria-label="Character">{['Sam', 'Steve'].map((name, i) => <button key={name} type="button" role="tab" aria-selected={who === i} className={who === i ? 'active' : ''} onClick={() => setWho(i)}>{name}</button>)}</div>
        <nav className="tabs" aria-label="Customize">{tabs.map(([id, label]) => <button key={id} type="button" className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>{label}</button>)}</nav>

        {tab === 'skin' && <OptionGroup title="Skin tone" value={skinOptions[c.skin].name}>
          <Swatches options={skinOptions} value={c.skin} onChange={v => update('skin', v)}/>
        </OptionGroup>}

        {tab === 'hair' && <>
          <OptionGroup title="Style" value={hairStyleOptions[c.hairStyle].name}>
            {hairStyleOptions.map((o, i) => <Opt key={o.name} label={o.name} selected={c.hairStyle === i} onClick={() => update('hairStyle', i)}><HairThumb character={c} styleIndex={i}/></Opt>)}
          </OptionGroup>
          <OptionGroup title="Color" value={hairColorOptions[c.hairColor].name}>
            <Swatches options={hairColorOptions} value={c.hairColor} onChange={v => update('hairColor', v)}/>
          </OptionGroup>
        </>}

        {tab === 'outfit' && <>
          <OptionGroup title="Top" value={shirtOptions[c.shirt].name}>
            {shirtOptions.map((o, i) => <Opt key={o.name} label={o.name} selected={c.shirt === i} onClick={() => update('shirt', i)}><ShirtThumb index={i}/></Opt>)}
          </OptionGroup>
          <OptionGroup title="Bottoms" value={pantsOptions[c.pants].name}>
            {pantsOptions.map((o, i) => <Opt key={o.name} label={o.name} selected={c.pants === i} onClick={() => update('pants', i)}><PantsThumb index={i}/></Opt>)}
          </OptionGroup>
        </>}

        {tab === 'face' && <OptionGroup title="Expression" value={faceOptions[c.face].name}>
          {faceOptions.map((o, i) => <Opt key={o.name} label={o.name} selected={c.face === i} onClick={() => update('face', i)}><FaceThumb character={c} index={i}/></Opt>)}
        </OptionGroup>}

        <div className="panel-foot"><button className="btn" onClick={onProceed}>Choose our date <span>→</span></button></div>
      </section>
    </div>
  </main>
}

function DateSelector({ characters, onSelect }) {
  return <main className="page">
    <header className="page-head"><h1>Where should we go <em>tonight?</em></h1><p>Pick a little world for us to get lost in.</p></header>
    <div className="venue-grid">{venues.map(venue => <button type="button" className={`venue-card ${venue.id}`} key={venue.id} onClick={() => onSelect(venue)}>
      <div className="venue-art"><CharacterIllustration characters={characters} venue={venue}/></div>
      <div className="venue-copy"><h2>{venue.name}</h2><p>{venue.description}</p><span className="venue-go">Choose this date <b>→</b></span></div>
    </button>)}</div>
  </main>
}

function DateScene({ venue, characters, onEnd, onBack }) {
  const [hearts, setHearts] = useState([])
  const [talk, setTalk] = useState({ who: 'Me', line: 0 })
  const tap = index => {
    const side = index === 0 ? 'left' : 'right'
    setHearts(cur => [...cur.slice(-7), { side, id: Date.now() + Math.random() }])
    setTalk(t => ({ who: index === 0 ? 'Me' : 'Him', line: (t.line + 1) % venue.lines.length }))
  }
  return <main className={`scene-page ${venue.id}`}>
    <div className="scene-content">
      <header className="scene-heading"><h1>{venue.name} <em>with you.</em></h1><p>Tap either of us to make a little magic happen.</p></header>
      <div className="scene-stage">
        <CharacterIllustration characters={characters} venue={venue} viewBox="-60 44 640 420" onFigureClick={tap}/>
        {hearts.map(h => <span key={h.id} className={`floating-heart ${h.side}`}>♥</span>)}
      </div>
      <div className="dialogue"><strong>{talk.who}</strong><p>{venue.lines[talk.line]}</p></div>
      <div className="scene-actions">
        <button type="button" className="btn ghost" onClick={onBack}>← Change date</button>
        <button type="button" className="btn" onClick={onEnd}>End our date <span>♡</span></button>
      </div>
    </div>
  </main>
}

function WrapUp({ venue, characters, onRestart }) {
  return <main className="wrap-page">
    <div className="wrap-art"><CharacterIllustration characters={characters} venue={venue}/></div>
    <h1>Our {venue.name.toLowerCase()} <em>was perfect.</em></h1>
    <p className="wrap-copy">Every version of us is my favorite. Thanks for choosing me, Steve.</p>
    <p className="signature">Always yours ♡</p>
    <button className="btn" onClick={onRestart}>Customize again <span>↻</span></button>
  </main>
}

function App() {
  const [step, setStep] = useState(0)
  const [characters, setCharacters] = useState([{ ...initialCharacterMe }, { ...initialCharacterHim }])
  const [venue, setVenue] = useState(null)
  const chooseVenue = selected => { setVenue(selected); setStep(3) }
  const restart = () => { setVenue(null); setStep(1) }
  if (step === 0) return <div className="app-shell"><Landing characters={characters} onStart={() => setStep(1)}/></div>
  return <div className="app-shell">
    <header className="site-header"><div className="brand"><span>♡</span> for steve</div><Stepper step={step}/><div/></header>
    {step === 1 && <Builder characters={characters} setCharacters={setCharacters} onProceed={() => setStep(2)}/>}
    {step === 2 && <DateSelector characters={characters} onSelect={chooseVenue}/>}
    {step === 3 && venue && <DateScene venue={venue} characters={characters} onEnd={() => setStep(4)} onBack={() => setStep(2)}/>}
    {step === 4 && venue && <WrapUp venue={venue} characters={characters} onRestart={restart}/>}
    <footer>made with ♥ for Steve</footer>
  </div>
}

export default App
