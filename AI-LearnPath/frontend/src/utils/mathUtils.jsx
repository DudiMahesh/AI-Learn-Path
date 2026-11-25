import React from 'react';

/**
 * Comprehensive Math, LaTeX and Symbol Formatter for NEET Physics & Chemistry
 */

export const SUB_MAP = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎', 'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
  'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
  'v': 'ᵥ', 'x': 'ₓ', 'y': 'ᵧ', 'z': '₂', 'R': 'ᵣ'
};

export const SUP_MAP = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', 'n': 'ⁿ', 'i': 'ⁱ', 't': 'ᵗ', 'h': 'ʰ', 's': 'ˢ',
  'd': 'ᵈ', 'r': 'ʳ', 'x': 'ˣ', 'y': 'ʸ', 'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'm': 'ᵐ', 'p': 'ᵖ',
  '/': 'ᐟ', '.': '˙', '·': '˙'
};

/**
 * Normalizes all forms of LaTeX math delimiters (\(...\), \\(...\\), \[...\], $$...$$, $...$)
 * into standard single/double dollar delimiters for easy split rendering.
 */
export function normalizeMathDelimiters(text) {
  if (!text) return '';
  let s = String(text);

  // Normalize escaped dollars \$ or \\$
  s = s.replace(/\\{1,4}\$/g, '$');

  // Normalize \( ... \) or \\( ... \\) into $ ... $
  s = s.replace(/\\{1,4}\(([\s\S]*?)\\{1,4}\)/g, (match, p1) => `$${p1}$`);

  // Normalize \[ ... \] or \\[ ... \\] into $$ ... $$
  s = s.replace(/\\{1,4}\[([\s\S]*?)\\{1,4}\]/g, (match, p1) => `$$${p1}$$`);

  // Handle any stray unclosed \( or \)
  s = s.replace(/\\{1,4}\(/g, '$').replace(/\\{1,4}\)/g, '$');

  return s;
}

/**
 * Formats a raw LaTeX mathematical expression into human-readable Unicode math.
 */
export function formatMathString(mathStr) {
  if (!mathStr) return '';
  let s = String(mathStr);

  // 0. Protect URLs and SNAKE_CASE_CONSTANTS (e.g. GROQ_API_KEY, FLASK_ENV) from subscript mangling
  const stash = [];
  const stashItem = (item) => {
    stash.push(item);
    return `%%STASH${stash.length - 1}%%`;
  };
  s = s.replace(/https?:\/\/[^\s)\]}]+/g, stashItem);
  s = s.replace(/\b[A-Z0-9]+(_[A-Z0-9]+)+\b/g, stashItem);

  // 1. Remove enclosing \( ... \) or \[ ... \] or delimiters if present
  s = s.replace(/^\\{1,2}[\(\[]/, '').replace(/\\{1,2}[\)\]]$/, '');
  s = s.replace(/\\begin\{aligned\}|\\begin\{align\*?\}|\\begin\{gather\*?\}/gi, '');
  s = s.replace(/\\end\{aligned\}|\\end\{align\*?\}|\\end\{gather\*?\}/gi, '');

  // 2. Extract \text{...} so inner text is preserved cleanly
  s = s.replace(/\\text\{([^}]+)\}/g, '$1');

  // 3. Handle \left and \right delimiters FIRST before any symbol replacement!
  s = s.replace(/\\left\s*\(/g, '(');
  s = s.replace(/\\right\s*\)/g, ')');
  s = s.replace(/\\left\s*\[/g, '[');
  s = s.replace(/\\right\s*\]/g, ']');
  s = s.replace(/\\left\s*\{/g, '{');
  s = s.replace(/\\right\s*\}/g, '}');
  s = s.replace(/\\left\s*\|/g, '|');
  s = s.replace(/\\right\s*\|/g, '|');
  s = s.replace(/\\left\./g, '');
  s = s.replace(/\\right\./g, '');
  s = s.replace(/\\left/g, '');
  s = s.replace(/\\right/g, '');

  // 4. Clean up any raw escaped parentheses
  s = s.replace(/\\{1,2}\(/g, '(');
  s = s.replace(/\\{1,2}\)/g, ')');
  s = s.replace(/\\{1,2}\[/g, '[');
  s = s.replace(/\\{1,2}\]/g, ']');

  // 5. Spacing and LaTeX punctuation
  s = s.replace(/\\%/g, '%');
  s = s.replace(/\\\s+/g, ' ');
  s = s.replace(/\\,/g, ' ');
  s = s.replace(/\\;/g, ' ');
  s = s.replace(/\\quad/g, '  ');
  s = s.replace(/\\qquad/g, '   ');

  // 6. Degrees and Ordinals (handle before general superscripts)
  s = s.replace(/\^\{\\circ\}|\^\\circ|\^°|\^\{°\}/g, '°');
  s = s.replace(/\\circ/g, '°');
  s = s.replace(/\^°/g, '°');
  s = s.replace(/\^\{\\?text\{th\}\}|\^\{th\}|\^th/gi, 'ᵗʰ');
  s = s.replace(/\^\{\\?text\{st\}\}|\^\{st\}|\^st/gi, 'ˢᵗ');
  s = s.replace(/\^\{\\?text\{nd\}\}|\^\{nd\}|\^nd/gi, 'ⁿᵈ');
  s = s.replace(/\^\{\\?text\{rd\}\}|\^\{rd\}|\^rd/gi, 'ʳᵈ');

  // 7. Comparison & Math operators with WORD BOUNDARIES
  s = s.replace(/\\le\b/g, ' ≤ ');
  s = s.replace(/\\ge\b/g, ' ≥ ');
  s = s.replace(/\\neq\b/g, ' ≠ ');
  s = s.replace(/\\approx\b/g, ' ≈ ');
  s = s.replace(/\\implies\b/g, ' ⟹ ');
  s = s.replace(/\\iff\b/g, ' ⟺ ');
  s = s.replace(/\\to\b/g, ' → ');
  s = s.replace(/\\pm\b/g, ' ± ');
  s = s.replace(/\\mp\b/g, ' ∓ ');
  s = s.replace(/\\times\b/g, ' × ');
  s = s.replace(/\\cdot\b/g, ' · ');

  // 8. Trigonometric and common function spacing
  s = s.replace(/\\cos\b/g, ' cos ');
  s = s.replace(/\\sin\b/g, ' sin ');
  s = s.replace(/\\tan\b/g, ' tan ');
  s = s.replace(/\\cot\b/g, ' cot ');
  s = s.replace(/\\sec\b/g, ' sec ');
  s = s.replace(/\\csc\b/g, ' csc ');
  s = s.replace(/\\log\b/g, ' log ');
  s = s.replace(/\\ln\b/g, ' ln ');

  // 9. Greek letters
  s = s.replace(/\\Delta\b/g, 'Δ');
  s = s.replace(/\\theta\b/g, 'θ');
  s = s.replace(/\\omega\b/g, 'ω');
  s = s.replace(/\\pi\b/g, 'π');
  s = s.replace(/\\mu\b/g, 'μ');
  s = s.replace(/\\lambda\b/g, 'λ');
  s = s.replace(/\\alpha\b/g, 'α');
  s = s.replace(/\\beta\b/g, 'β');
  s = s.replace(/\\gamma\b/g, 'γ');
  s = s.replace(/\\rho\b/g, 'ρ');
  s = s.replace(/\\sigma\b/g, 'σ');
  s = s.replace(/\\phi\b/g, 'φ');
  s = s.replace(/\\tau\b/g, 'τ');
  s = s.replace(/\\epsilon\b/g, 'ε');

  // 10. Fractions
  s = s.replace(/\\frac\{1\}\{2\}/g, '½');
  s = s.replace(/\\frac\{1\}\{3\}/g, '⅓');
  s = s.replace(/\\frac\{2\}\{3\}/g, '⅔');
  s = s.replace(/\\frac\{1\}\{4\}/g, '¼');
  s = s.replace(/\\frac\{3\}\{4\}/g, '¾');
  s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');

  // 11. Roots & vectors
  s = s.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  s = s.replace(/\\vec\{([^}]+)\}/g, '→$1');

  // 12. Multi-letter Subscripts (e.g. H_{max}, R_{max}, v_{avg}, E_{net})
  s = s.replace(/_\{(max|min|avg|net|eff|rms|total|initial|final)\}/gi, (m, p1) => {
    const map = { max: 'ₘₐₓ', min: 'ₘᵢₙ', avg: 'ₐᵥ₉', net: 'ₙₑₜ', eff: 'ₑff', rms: 'ᵣₘₛ', total: 'ₜₒₜ', initial: 'ᵢ', final: '𝒻' };
    return map[p1.toLowerCase()] || p1;
  });
  s = s.replace(/_(max|min|avg|net|eff|rms|total)\b/gi, (m, p1) => {
    const map = { max: 'ₘₐₓ', min: 'ₘᵢₙ', avg: 'ₐᵥ₉', net: 'ₙₑₜ', eff: 'ₑff', rms: 'ᵣₘₛ', total: 'ₜₒₜ' };
    return map[p1.toLowerCase()] || p1;
  });

  // 13. General Subscripts (e.g. u_x -> uₓ, u_y -> uᵧ, s_n -> sₙ, L_{1} -> L₁)
  s = s.replace(/_\{([0-9a-zA-Z\+\-\(\)]+)\}/g, (m, p1) => {
    return p1.split('').map(c => SUB_MAP[c.toLowerCase()] || c).join('');
  });
  // Only replace single-letter subscript following a math variable or symbol, never inside multi-letter identifiers
  s = s.replace(/(?<=[a-zA-Z0-9\)\]\}\\])_([0-9a-zA-Z])(?![a-zA-Z0-9])/g, (m, p1) => {
    return SUB_MAP[p1.toLowerCase()] || p1;
  });

  // 14. General Superscripts (e.g. u^2 -> u², x^2 -> x², \cos^2 -> cos²)
  s = s.replace(/\^\{([0-9a-zA-Z\+\-\(\)]+)\}/g, (m, p1) => {
    return p1.split('').map(c => SUP_MAP[c.toLowerCase()] || c).join('');
  });
  s = s.replace(/\^([0-9a-zA-Z])/g, (m, p1) => {
    return SUP_MAP[p1.toLowerCase()] || p1;
  });

  // 15. Clean up double spaces and any leftover stray backslashes
  s = s.replace(/\\/g, '');
  s = s.replace(/\s{2,}/g, ' ');

  // 16. Restore protected URLs and uppercase constants
  s = s.replace(/%%STASH(\d+)%%/g, (_, idx) => stash[Number(idx)] || '');

  return s.trim();
}

/**
 * Formats multi-line display math blocks (e.g. \[ \begin{aligned} ... \end{aligned} \])
 * into clean, structured, step-by-step aligned calculation rows.
 */
export function formatDisplayMathBlock(rawMath) {
  if (!rawMath) return [];
  let s = String(rawMath).trim();

  // Strip enclosing delimiters
  s = s.replace(/^(\\\[|\$\$)\s*/, '').replace(/\s*(\\\]|\$\$)$/, '');
  s = s.replace(/\\begin\{aligned\}|\\begin\{align\*?\}|\\begin\{gather\*?\}/gi, '');
  s = s.replace(/\\end\{aligned\}|\\end\{align\*?\}|\\end\{gather\*?\}/gi, '');

  // Split lines by LaTeX newline \\ or standard newlines
  const rawLines = s.split(/\\\\|\n/).map(l => l.trim()).filter(Boolean);

  return rawLines.map(line => {
    // Check if line has alignment character & (e.g. E_{R} &= 70 \times ... or &= ...)
    let parts = line.split('&');
    if (parts.length >= 2) {
      const left = formatMathString(parts[0].trim());
      const right = formatMathString(parts.slice(1).join(' ').trim());
      return { left, right };
    }
    const cleanLine = formatMathString(line.replace(/&/g, ' '));
    return { left: '', right: cleanLine };
  });
}

/**
 * Renders individual mathematical inline segments with clear highlighting.
 */
export function renderMathPart(str, key, isUser, theme) {
  if (!str) return null;
  const normalized = normalizeMathDelimiters(str);
  const mathPattern = /\\[a-zA-Z]+|\^\{?[0-9a-zA-Z]|\_\{[0-9a-zA-Z]+\}|\b[a-zA-Z]_[0-9a-zA-Z]\b|\\pm|\\times|\\frac|\\sqrt/i;
  if (!normalized.includes('$')) {
    if (mathPattern.test(normalized)) {
      const cleaned = formatMathString(normalized);
      return <span key={key}>{cleaned}</span>;
    }
    return <span key={key}>{normalized}</span>;
  }
  // For inline rendering, collapse multiple consecutive dollars so split produces clean alternating segments
  const singleDollarText = normalized.replace(/\${2,}/g, '$');
  const mathSegments = singleDollarText.split('$');
  return (
    <span key={key}>
      {mathSegments.map((seg, mi) => {
        if (mi % 2 === 1) {
          const cleaned = formatMathString(seg);
          return (
            <span
              key={mi}
              className="inline-flex items-center px-1.5 py-0.2 mx-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[13px] font-semibold border border-emerald-500/20"
            >
              {cleaned}
            </span>
          );
        }
        // Even segments may still contain undelimited LaTeX commands
        if (mathPattern.test(seg)) {
          return <span key={mi}>{formatMathString(seg)}</span>;
        }
        return <span key={mi}>{seg}</span>;
      })}
    </span>
  );
}

/**
 * Renders italics and math segments recursively.
 */
export function renderItalicAndMath(str, key, isUser, theme) {
  if (!str) return null;
  const italicParts = str.split(/(?<!\*)\*(?!\*)([^\*]+)(?<!\*)\*(?!\*)/g);
  if (italicParts.length > 1) {
    return (
      <span key={key}>
        {italicParts.map((ip, ii) => {
          if (ii % 2 === 1) {
            return (
              <em key={ii} className="italic text-slate-300 dark:text-zinc-200 font-serif">
                {ip}
              </em>
            );
          }
          return renderMathPart(ip, `ip-${ii}`, isUser, theme);
        })}
      </span>
    );
  }
  return renderMathPart(str, key, isUser, theme);
}

/**
 * High-performance inline formatter for bold, italics, code, math, and line breaks.
 */
export function renderInlineFormatted(rawText, isUser, theme) {
  if (!rawText) return null;

  // Handle HTML breaks <br> and <br>•
  const breakSegments = rawText.split(/<br\s*\/?>/gi);
  if (breakSegments.length > 1) {
    return breakSegments.map((seg, sIdx) => (
      <React.Fragment key={sIdx}>
        {renderInlineFormatted(seg, isUser, theme)}
        {sIdx < breakSegments.length - 1 && <br className="my-1" />}
      </React.Fragment>
    ));
  }

  const normalized = normalizeMathDelimiters(rawText);
  const parts = normalized.split('**');
  return parts.map((part, pi) => {
    if (pi % 2 === 1) {
      return (
        <strong key={pi} className={isUser ? 'text-white font-bold' : (theme?.accent || 'text-emerald-400 font-bold')}>
          {renderItalicAndMath(part, `strong-${pi}`, isUser, theme)}
        </strong>
      );
    }
    const codeParts = part.split('`');
    if (codeParts.length > 1) {
      return codeParts.map((cp, ci) =>
        ci % 2 === 1 ? (
          <code key={ci} className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[11px] border border-slate-700">
            {cp}
          </code>
        ) : (
          renderItalicAndMath(cp, `cp-${ci}`, isUser, theme)
        )
      );
    }
    return renderItalicAndMath(part, pi, isUser, theme);
  });
}

