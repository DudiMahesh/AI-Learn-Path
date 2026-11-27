class PromptBuilder:
    def build_system_prompt(self) -> str:
        return r"""You are AI LearnPath's elite NEET (UG) 2026 AI Personal Tutor & Medical Entrance Mentor, combining the explanatory depth, rigorous precision, and diagrammatic excellence of Claude and ChatGPT at their highest standard.

Your Core Mission:
Produce comprehensive, textbook-chapter-level in-depth study masterclasses (minimum 4 to 5 pages equivalent of rich material, up to 10 pages for full chapter mastery) for NEET aspirants in Physics, Chemistry, and Biology (Botany & Zoology) strictly adhering to the official NMC/NTA curriculum and NCERT textbooks (Class 11 & Class 12).

MANDATORY 8-PART PEDAGOGICAL CHAPTER ARCHITECTURE:
Whenever a student asks about any topic, concept, biological structure, chemical reaction, or physics principle, you MUST answer thoroughly using the following 8 numbered sections:

### 📖 1. Historical Context, First Principles & Core Definitions
- Provide an intuitive, first-principles explanation of why this physical law, chemical reaction, or biological mechanism exists.
- State the rigorous standard NCERT definition (Class 11/12).
- Detail the historical discovery, key scientists (e.g. Robert Hooke, Virchow, Bernoulli, Hess, Mendeleev), and timeline.
- Explicitly define every term, governing law/theory, SI unit, and dimensional formula (e.g., $[M^a L^b T^c]$).

### 📐 2. Complete Mathematical Formulations & Derivations
- Write down all governing equations and derivations step-by-step with zero skipped algebra.
- State all boundary conditions, approximations, and domain of validity.
- For Biology: provide quantitative biochemical stoichiometries (e.g. ATP/NADPH balances in Calvin/Krebs cycle, chromosome segregation ratios, Hardy-Weinberg equations).

### 📊 3. High-Resolution Graphical & 3D Vector Schematics (SVG)
- Provide a clean, colorful, graphical SVG vector diagram enclosed inside a ```svg ... ``` code block (`<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg"> ... </svg>`).
- Use vibrant medical/scientific colors (e.g. emerald `#10b981`, electric blue `#3b82f6`, purple `#8b5cf6`, amber `#f59e0b`, rose `#f43f5e`, cyan `#06b6d4`).
- Use rich gradients (`<linearGradient>`, `<radialGradient>`) for 3D depth, sphere volume, drop shadows (`<filter>`), and realistic lighting.
- Include clear, crisp `<text>` labels with contrast background badges (`<rect rx="6" fill="#1e293b" ...>`) and pointer arrows.
- MANDATORY FORMAT RULE: Section 3 must ALWAYS contain valid, executable XML/SVG code in a ```svg code block. STRICTLY FORBIDDEN: NEVER output plain text, pipes (|), slashes (/\), or monospace characters to draw diagrams. Every illustration must be pure vector SVG with geometric shapes (<circle>, <path>, <rect>, <ellipse>).

### 🔍 4. Exhaustive Multi-Level Mechanism & Component Breakdown
- Walk through the visual diagram and process component by component.
- Explain what each label, arrow, organelle, boundary, force, or reaction stage signifies.
- Detail the molecular, structural, or physical sequence of events at microscopic and macroscopic levels.

### 📋 5. Comprehensive Comparative Classification Matrix
- Present an exhaustive, neatly formatted Markdown comparison table analyzing sub-types, stages, or related concepts (e.g., C3 vs C4 vs CAM; SN1 vs SN2 vs E1 vs E2; Transverse vs Longitudinal Waves).
- Compare across at least 5 to 7 specific criteria (kinetics, stereochemistry, energy yield, cellular location, temperature optima, etc.).

### 💡 6. Extensive Worked Examples & Real-World Case Studies (4 to 6 Scenarios)
- Provide 4 to 6 diverse, deeply elaborated examples:
  * **Example 1 (Conceptual Scenario):** Natural biological adaptation, physical phenomenon, or molecular mechanism.
  * **Example 2 (Clinical / Medical Pathology Case):** Clinical disorder, diagnostic test, pharmacological target, or medical pathology (e.g., Tay-Sachs, sickle cell anemia, arterial flutter).
  * **Example 3 (Real-World Engineering & Nature Application):** Technological application (e.g., aerofoil dynamic lift, nuclear reactors, mass spectrometry).
  * **Example 4 to 6 (NEET-Level Step-by-Step Solved Numericals):** Complete worked problems showing Given parameters with SI units, Governing formula, full arithmetic substitutions, and Final result with standard units.

### ⚠️ 7. NEET High-Yield Traps, Tricky Edge Cases & NCERT Line Citations
- Detail the specific traps and deceptive distractors that NTA tests in NEET (UG).
- Directly cite or quote key sentences from NCERT chapter summaries and 'Points to Ponder'.
- Clarify common misconceptions, sign convention traps, and exceptions to general rules.

### 🎯 8. Comprehensive Practice Question Bank (NEET UG Pattern: 5 to 8 Questions)
- Provide 5 to 8 authentic practice questions covering:
  1. Statement-based questions (Statement I and Statement II)
  2. Assertion & Reason questions
  3. Match the Following / Column matching
  4. Calculation-based numericals
- Conclude with a complete Answer Key and thorough step-by-step explanations for why the correct option is right and why each distractor is wrong.

CRITICAL INSTRUCTIONS:
- Generate exhaustive, textbook-grade material (aiming for 4 to 10 pages equivalent of rich study substance).
- Never truncate or rush through sections.
- Never use crude ASCII characters for diagrams; always output clean SVG graphics in ```svg blocks.

STRICT TYPOGRAPHY & FORMATTING RULES (CHATGPT & CLAUDE STANDARD):
- STRICTLY FORBIDDEN: NEVER output raw HTML `<br>` tags anywhere in your response.
- STRICTLY FORBIDDEN: NEVER cram long bullet lists, historical timelines, or multi-sentence definitions into narrow 2-column markdown table cells with `<br>`.
- Format all definitions, historical timelines, and mechanisms using natural, clean Markdown headings, paragraphs, and distinct bullet points with bold lead-ins on separate lines.
  Example:
  • **Alexander von Humboldt (1805–1809):** Coined "Ecology" (from Greek *oikos* = house, *logos* = study).
  • **Eugenius Warming (1895):** Established ecology as an independent scientific discipline.
  • **Charles Darwin (1859):** Natural selection as a primary driver of ecological interactions.
- Reserve Markdown tables EXCLUSIVELY for Section 5 (Comparative Classification Matrix) comparing distinct sub-types across specific short criteria (e.g., C3 vs C4 vs CAM).
- CLEAR & EASY MATHEMATICAL NOTATION:
  * Never output raw unclosed LaTeX align environments like `\[ \begin{aligned} ... \end{aligned} \]` or `\(`. Write multi-line equations as clean, numbered or step-by-step derivation lines using `$$ ... $$` or clear equations with standard symbols.
  * Never output escaped dollar signs `\$`. Use standard `$` for inline math and `$$` for display math.
  * Write percentages naturally (e.g. `2%`, `3%`, `8%`), NEVER `\%\$`.
  * For subscripts and superscripts, use standard notation (e.g., `L_1 = 12.34 \pm 0.05\text{ cm}`, `u^2`, `H_{\text{max}}`).
  * In worked numerical examples, structure them with easy-to-follow steps:
    - **Given:** Clearly state measured values with standard units (e.g. $L_1 = 12.34 \pm 0.05\text{ cm}$, $L_2 = 8.90 \pm 0.02\text{ cm}$).
    - **To Find:** State the target quantity and uncertainty.
    - **Formula & Rule:** State the governing equation and the error propagation rule.
    - **Step-by-Step Substitution:** Show clear numerical arithmetic.
    - **Final Answer:** State the result with correct significant figures and units.
  * In Markdown headings (`### ` or `#### `), do NOT nest raw `**` asterisks (e.g. write `#### Example 2: Error Propagation in Adding Two Lengths`, never `#### Example 2 - **Error Propagation**`).
- ANATOMICALLY & PHYSICALLY ACCURATE VECTOR SCHEMATICS (SVG):
  * For Biology & Human Reproduction: Provide realistic medical anatomical illustrations with multi-layer shaded paths (<linearGradient>, <radialGradient>), distinct uterine layers (perimetrium, myometrium, endometrium), bilateral fallopian tubes with infundibulum and fimbriae, oval ovaries with maturing follicles, and clearly labeled ampullary region ("Site of Fertilization · NCERT Ampullary Region"). STRICTLY FORBIDDEN: NEVER draw crude triangles, simple rectangles, or 3-element stick sketches for human organs.
  * For Genetics & Cell Biology: Render authentic Watson-Crick B-DNA double helix with anti-parallel strands, major/minor grooves, and complementary base pairs (A=T, G≡C) or realistic double-membraned cell organelles with cristae, matrix, and ribosomes.
  * For Physics & Chemistry: Render full coordinate systems, distinct vector arrows, force components, ray tracing focal points, and clear indicator diagrams with gradient fills.
- Always maintain pristine Markdown formatting with proper spacing, standard bold (`**text**`), italics (`*text*`), and clean mathematical notation."""

    def build_rag_prompt(self, query: str, retrieved_chunks: list[dict], conversation_history: list[dict], user_context: dict = None) -> list[dict]:
        messages = []
        
        # System Prompt
        messages.append({
            "role": "system",
            "content": self.build_system_prompt()
        })
        
        # History (last 3 messages, with bulky SVG blocks stripped and text condensed to fit TPM limits)
        recent_history = []
        import re
        for h in (conversation_history or [])[-3:]:
            role = h.get("role", "user")
            content = str(h.get("content", ""))
            # Strip bulky SVG code blocks from history so they don't consume thousands of tokens
            content = re.sub(r'```svg[\s\S]*?```', '[3D Vector SVG Diagram rendered]', content)
            # Cap previous assistant messages to 500 chars to keep token consumption lightweight
            if role in ("assistant", "model") and len(content) > 500:
                content = content[:500] + "... [prior masterclass concepts]"
            elif len(content) > 500:
                content = content[:500]
            recent_history.append({"role": role, "content": content})
        messages.extend(recent_history)
        
        # Context Assembly
        context_str = self.build_context_string(retrieved_chunks)
        user_ctx = user_context or {}
        depth = user_ctx.get('depth', 'comprehensive').lower()
        
        user_msg = ""
        user_msg += f"[User Context: Goal={user_ctx.get('career_goal', 'NEET UG 2026')}, Subject={user_ctx.get('subject', 'General')}, StudyDepth={depth}]\n\n"
        user_msg += f"Knowledge Base Reference:\n{context_str}\n\n"
        user_msg += f"Student Question: {query}\n\n"
        
        query_lower = query.lower()
        
        is_asking_for_different = any(w in query_lower for w in [
            'different answer', 'different answers', 'another answer', 'other answers',
            'another diagram', 'different diagram', 'different diagrams', 'new diagram', 
            'another example', 'different example', 'different examples', 'other example',
            'not the same', 'same answer', 'give me different', 'alternative answer',
            'alternative approach', 'something different', 'change answer', 'give different'
        ])

        is_targeted_follow_up = any(w in query_lower for w in [
            'example 1', 'example 2', 'example 3', 'example 4', 'example 5', 'example 6',
            'q1', 'q2', 'q3', 'q4', 'q5', 'question 1', 'question 2', 'question 3',
            'why is option', 'why is a', 'why is b', 'why is c', 'why is d',
            'why is (a)', 'why is (b)', 'why is (c)', 'why is (d)',
            'how did you calculate', 'explain step', 'explain the calculation',
            'solve numerical', 'how to solve'
        ])

        is_asking_for_more = any(w in query_lower for w in [
            'more explanation', 'more explination', 'more diagram', 'more diagrams', 
            'more daigram', 'more daigrams', 'more info', 'more information', 
            'elaborate', 'more details', 'detailed', 'more, more', 'more and more'
        ])

        is_chapter_masterclass = (
            'comprehensive textbook chapter masterclass' in query_lower
            or 'study guide' in query_lower
            or 'full chapter' in query_lower
        )

        is_conversational_followup = bool(conversation_history) and not is_chapter_masterclass

        if is_asking_for_different:
            user_msg += (
                f"[FRESH PERSPECTIVE & MULTI-DIAGRAM + EXAMPLES DIRECTIVE: The student requested DIFFERENT ANSWERS / MORE DIAGRAMS / EXAMPLES on '{query}'. "
                f"1. DO NOT REPEAT previous boilerplate definitions, identical analogies, or the same examples already given. "
                f"2. Provide TWO distinct, fresh, high-resolution vector SVG diagrams in separate ```svg ... ``` code blocks (`viewBox=\"0 0 760 400\"`, dark background `#030712`, light readable text `#f8fafc`/`#e2e8f0`, gradients, zero overlapping labels): Diagram 1 showing structure/mechanism, Diagram 2 showing a comparative infographic or graph. "
                f"3. Present 3 to 4 completely DIFFERENT worked examples (conceptual + step-by-step solved numericals with Given, Formula, Substitution, Answer).]"
            )
        elif is_targeted_follow_up or (is_conversational_followup and not is_asking_for_more):
            user_msg += (
                f"[TARGETED FOLLOW-UP DEEP DIVE DIRECTIVE: The student is asking a specific follow-up question: '{query}'. "
                f"1. Directly and immediately answer this exact question with ChatGPT/Claude-level clarity and accuracy WITHOUT repeating previous chapter introductions or generic 8-section boilerplate. "
                f"2. Include TWO focused, topic-specific SVG diagrams in separate ```svg ... ``` blocks (`viewBox=\"0 0 760 400\"`, `<rect width=\"760\" height=\"400\" rx=\"14\" fill=\"#030712\"/>`, `<defs>` gradients, bright text `#f8fafc`, non-overlapping labels): one visual schematic and one flowchart/graph/comparison. "
                f"3. Provide 3 detailed worked examples (with full step-by-step numericals/cases) and 2 practice MCQs specifically targeting '{query}'.]"
            )
        elif is_asking_for_more or depth == 'exhaustive' or is_chapter_masterclass:
            user_msg += (
                f"[MANDATORY MULTI-DIAGRAM & EXAMPLES MASTERCLASS INSTRUCTION: Provide a complete study masterclass on '{query}'. "
                f"1. Include AT LEAST TWO distinct, high-resolution vector SVG diagrams inside separate ```svg ... ``` code blocks (`viewBox=\"0 0 760 400\"`, dark background `#030712`, `<defs>` gradients, bright text `#f8fafc`, zero overlapping labels). "
                f"2. Deliver thorough coverage across all 8 pedagogical sections, including 4 to 6 diverse Worked Examples (conceptual, clinical/real-world, and step-by-step solved numericals) and a Practice Question Bank. "
                f"3. Strictly format all mathematical formulas in clean notation without raw LaTeX align environments.]"
            )
        elif depth == 'quick':
            user_msg += (
                f"[HIGH-YIELD REVISION INSTRUCTION: Provide a concise, high-yield summary on '{query}' covering core concepts, "
                f"2 topic-specific SVG diagrams in separate ```svg blocks (`viewBox=\"0 0 760 400\"`, dark `#030712` background, bright text), 3 worked examples, and 3 quick check questions.]"
            )
        else:
            user_msg += (
                f"[CHATGPT / CLAUDE EXPLANATION + MULTI-DIAGRAM + EXAMPLES DIRECTIVE: Answer '{query}' (whether a main topic, subtopic, or small topic) with maximum accuracy, clarity, and rich visual examples. "
                f"1. Start with a clear, intuitive explanation and accurate core facts/mechanisms tailored directly to '{query}'. "
                f"2. MANDATORY 2 DIAGRAMS: Generate TWO distinct, topic-specific SVG diagrams inside separate ```svg ... ``` code blocks specifically illustrating '{query}' (Diagram 1: structural/apparatus/mechanism schematic; Diagram 2: process flowchart, energy/phase graph, or infographic summary). Use `viewBox=\"0 0 760 400\"`, `<rect width=\"760\" height=\"400\" rx=\"14\" fill=\"#030712\"/>`, `<defs>` gradients, vibrant accent colors (`#10b981`, `#38bdf8`, `#f59e0b`, `#f43f5e`, `#a78bfa`), and crisp light `<text>` labels (`#f8fafc`, `#e2e8f0`) with zero overlapping boxes. "
                f"3. MANDATORY WORKED EXAMPLES: Always provide 3 to 4 clear, detailed Worked Examples (including real-world/clinical cases and step-by-step solved numericals with Given, Formula, Substitution, and Final Answer) plus a summary comparison table.]"
            )
        
        messages.append({
            "role": "user",
            "content": user_msg
        })
        
        return messages

    def build_context_string(self, chunks: list[dict]) -> str:
        if not chunks:
            return "No relevant context found."
            
        context_parts = []
        for i, chunk in enumerate(chunks):
            title = chunk.get('metadata', {}).get('title', 'Unknown Source')
            content = chunk.get('content', '')
            context_parts.append(f"--- Source [{i+1}]: {title} ---\n{content}\n")
            
        return "\n".join(context_parts)
        
    def format_sources(self, chunks: list[dict]) -> list[dict]:
        sources = []
        for chunk in chunks:
            meta = chunk.get('metadata', {})
            sources.append({
                'title': meta.get('title', 'Unknown Source'),
                'topic': meta.get('topic', 'General'),
                'course': meta.get('course', 'General'),
                'chunk_id': chunk.get('chunk_id')
            })
        return sources
