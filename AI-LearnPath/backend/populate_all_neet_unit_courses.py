"""
populate_all_neet_unit_courses.py
Populates the NEET UG 2026 courses with the exact 5-unit divisions:
- NEET Biology: Units 1 to 5
- NEET Biology: Units 6 to 10
- NEET Biology: Complete Master Syllabus (Units 1 to 10)
- NEET Physics: Units 1 to 5
- NEET Physics: Units 6 to 10
- NEET Physics: Units 11 to 15
- NEET Physics: Units 16 to 20
- NEET Physics: Complete Master Syllabus (Units 1 to 20)
- NEET Chemistry: Units 1 to 5
- NEET Chemistry: Units 6 to 10
- NEET Chemistry: Units 11 to 15
- NEET Chemistry: Units 16 to 20
- NEET Chemistry: Complete Master Syllabus (Units 1 to 20)
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from models import db
from models.career import Career
from models.course import Course, CourseSkill
from models.topic import Topic, LessonProgress, TopicPrerequisite
from models.lesson import Lesson
from models.learning_path import LearningPathItem

# Import existing CHEMISTRY_UNITS and PHYSICS_UNITS from populate_neet_courses
from populate_neet_courses import CHEMISTRY_UNITS, PHYSICS_UNITS

app = create_app()

# Full 10 Units of Biology matching the NEET UG 2026 Biology Textbook PDF
BIOLOGY_UNITS_FULL = [
    {
        "unit": "Unit 1: Diversity in the Living World",
        "description": "What is living, taxonomy, classification, binomial nomenclature, five kingdom system, Kingdom Monera, Protista, Fungi, Plant Kingdom (Algae, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms), and Animal Kingdom (Non-chordates to Chordates).",
        "lessons": [
            {
                "title": "1.1 What is Living, Taxonomy & Five Kingdom Classification",
                "content": """# Diversity in the Living World

## What is Living?
All living organisms exhibit key characteristics. However, only certain features are strictly defining:
- **Growth**: Increase in mass and number of cells. Non-living objects like mountains also grow by extrinsic accumulation. Living growth is intrinsic. Not a defining property.
- **Reproduction**: Mules, sterile worker bees, and infertile human couples are alive but cannot reproduce. Not a defining property.
- **Metabolism**: Sum of all chemical reactions. Only living organisms exhibit metabolism. **Defining property**.
- **Cellular Organisation**: Cells are structural units. **Defining property**.
- **Consciousness**: Sensing environment and responding. **Defining property** (Humans alone have self-consciousness).

---

## Taxonomy & Taxonomic Aids
1. **Taxonomy**: Identification, nomenclature, and classification (term by A.P. de Candolle).
2. **Systematics**: Taxonomy + evolutionary (phylogenetic) relationships (Linnaeus in *Systema Naturae*).
3. **Binomial Nomenclature (Linnaeus)**: Genus (capitalised) + species epithet (lowercase) in Latin italics (e.g. *Mangifera indica* Linn.).
4. **Taxonomic Aids**:
   - **Herbarium**: Dried, pressed plant specimens mounted on sheets with label data.
   - **Botanical Garden**: Living reference plants (*Royal Botanic Gardens, Kew*; *Indian Botanical Garden, Howrah*).
   - **Key**: Analytical tool based on contrasting pairs of characters called **couplets**; each statement is a **lead**.

---

## Five Kingdom Classification (Whittaker, 1969)
Criteria: Cell structure, body organisation, mode of nutrition, reproduction, and phylogenetic relationships.
- **Monera**: Prokaryotic, unicellular, peptidoglycan cell wall (absent in *Mycoplasma*, smallest living cell), 70S ribosomes. Archaebacteria (methanogens in ruminant guts, halophiles, thermoacidophiles). Eubacteria (Cyanobacteria with heterocysts for nitrogen fixation in *Nostoc*, *Anabaena*).
- **Protista**: Eukaryotic unicellular. Chrysophytes (diatoms with indestructible silica walls forming diatomaceous earth), Dinoflagellates (red tides by *Gonyaulax*), Euglenoids (*Euglena* with proteinaceous pellicle, mixotrophic), Slime moulds (plasmodium), Protozoans (Amoeboid, Flagellated *Trypanosoma*, Ciliated *Paramecium*, Sporozoans *Plasmodium*).
- **Fungi**: Heterotrophic, chitin cell wall, glycogen reserve. Phycomycetes (*Mucor*, *Rhizopus*, *Albugo*), Ascomycetes (*Penicillium*, *Neurospora*, yeast), Basidiomycetes (*Agaricus*, *Puccinia* rust, *Ustilago* smut), Deuteromycetes imperfect fungi (*Trichoderma*, *Alternaria*).
- **Lichens**: Symbiosis of alga (phycobiont) + fungus (mycobiont). Highly sensitive to $SO_2$ pollution.
- **Viruses, Viroids, Prions**: Viruses (Ivanowsky, Beijerinck, Stanley crystal; DNA or RNA capsid). Viroids (T.O. Diener, free low-molecular-weight RNA without protein coat, potato spindle tuber). Prions (infectious misfolded proteins, Mad cow disease).
"""
            },
            {
                "title": "1.2 Plant Kingdom & Animal Kingdom Classification",
                "content": """# Plant & Animal Kingdom Classification

## Plant Kingdom Divisions
1. **Algae**: Thalloid, aquatic.
   - **Chlorophyceae (Green)**: Chl $a, b$, storage starch, cell wall cellulose (*Volvox*, *Spirogyra*, *Chlamydomonas*).
   - **Phaeophyceae (Brown)**: Chl $a, c$, fucoxanthin pigment, storage mannitol/laminarin, wall cellulose + algin (*Laminaria*, *Fucus*, *Sargassum*).
   - **Rhodophyceae (Red)**: Chl $a, d$, r-phycoerythrin, storage floridean starch, wall cellulose + pectin + polysulphate esters (*Polysiphonia*, *Porphyra*, *Gelidium* and *Gracilaria* produce Agar).
2. **Bryophytes**: Amphibians of plant kingdom (require water for fertilisation). Dominant phase is haploid **gametophyte**; sporophyte is dependent. Liverworts (*Marchantia* with gemma cups) and Mosses (*Funaria*, *Sphagnum* peat).
3. **Pteridophytes**: First vascular land plants (xylem & phloem), seedless. Dominant phase is diploid **sporophyte**. Homosporous or heterosporous (*Selaginella*, *Salvinia*). Retention of female gametophyte is precursor to seed habit.
4. **Gymnosperms**: Naked seeds (ovules not enclosed in ovary). Tall trees (*Sequoia* giant redwood, *Pinus* with mycorrhiza, *Cycas* with coralloid roots). Heterosporous, wind pollination via pollen tube.
5. **Angiosperms**: Flowering plants with seeds enclosed inside fruits (Dicots and Monocots).

---

## Animal Kingdom (Non-Chordates to Chordates)
- **Basis of Classification**: Levels of organisation (cellular, tissue, organ, organ-system), symmetry (asymmetrical, radial, bilateral), coelom (acoelomate, pseudocoelomate in Aschelminthes, coelomate).
- **Non-Chordate Phyla**:
  - *Porifera*: Sponges, cellular level, choanocytes (collar cells), water canal system (*Sycon*, *Spongilla*).
  - *Cnidaria*: Tissue level, cnidoblasts (stinging cells), polyp and medusa metagenesis (*Obelia*, *Physalia*).
  - *Ctenophora*: Comb jellies, 8 rows of ciliated comb plates, bioluminescence (*Pleurobrachia*).
  - *Platyhelminthes*: Flatworms, acoelomate, flame cells for excretion (*Taenia*, *Planaria* regeneration).
  - *Aschelminthes*: Roundworms, pseudocoelomate, alimentary canal complete (*Ascaris*, *Wuchereria*).
  - *Annelida*: True metameric segmentation, nephridia for excretion (*Nereis*, Earthworm *Pheretima*).
  - *Arthropoda*: Largest phylum, jointed appendages, chitinous exoskeleton, Malpighian tubules (*Apis*, Prawn, Mosquitoes).
  - *Mollusca*: Second largest, soft body, calcareous shell, mantle, radula rasping organ (*Pila*, *Octopus*).
  - *Echinodermata*: Spiny skin, water vascular system with tube feet, radial adult, bilateral larva (*Asterias* starfish).
  - *Hemichordata*: Worm-like marine, proboscis, collar, trunk, open circulation (*Balanoglossus*).
- **Chordata**: Notochord, dorsal hollow nerve cord, paired pharyngeal gill slits, post-anal tail.
  - Subphyla: Urochordata (*Ascidia*), Cephalochordata (*Branchiostoma*), Vertebrata.
  - Vertebrate Classes: Cyclostomata, Chondrichthyes (cartilaginous, placoid scales, *Scoliodon*), Osteichthyes (bony, air bladder, operculum, *Labeo*), Amphibia (3-chambered heart, moist skin), Reptilia (epidermal scales, 3-chambered, crocodile 4-chambered), Aves (feathers, pneumatic bones, 4-chambered), Mammalia (mammary glands, hair, pinnae, 4-chambered heart).
"""
            }
        ]
    },
    {
        "unit": "Unit 2: Structural Organisation in Animals and Plants",
        "description": "Morphology of flowering plants (roots, stem, leaf, inflorescence, flower, fruit, seeds, and families), anatomy of plants (tissues, vascular bundles, secondary growth), animal tissues, cockroach and frog anatomy.",
        "lessons": [
            {
                "title": "2.1 Morphology & Anatomy of Flowering Plants",
                "content": """# Plant Morphology & Anatomy

## Root, Stem & Leaf Modifications
- **Root**: Taproot (dicot), fibrous root (monocot), adventitious roots (*Banyan* prop roots, *Maize* stilt roots, *Rhizophora* pneumatophores for respiration in swamps).
- **Stem Modifications**: Tubers (potato), rhizomes (ginger), corms (*Colocasia*), bulbs (onion), runners (grass), tendrils (cucumber, pumpkin), thorns (*Citrus*, *Bougainvillea*), phylloclades (*Opuntia*).
- **Leaf**: Venation reticulate (dicot) vs parallel (monocot). Phyllotaxy alternate (China rose), opposite (*Calotropis*), whorled (*Alstonia*). Modifications: spines (cactus), phyllode (*Acacia*).
- **Inflorescence**: Racemose (acropetal, main axis grows) vs Cymose (basipetal, main axis terminates in flower).

---

## Flower, Fruit & Floral Families
- **Placentation**: Marginal (pea), Axile (China rose, tomato, lemon), Parietal (mustard, argemone), Free central (*Dianthus*, primrose), Basal (sunflower, marigold).
- **Ovary Position**: Hypogynous/superior (mustard, brinjal), Perigynous/half-inferior (plum, rose, peach), Epigynous/inferior (guava, cucumber, ray florets of sunflower).
- **Fruit**: Mango and Coconut are **drupes** (develop from monocarpellary superior ovaries, 1-seeded; mesocarp fleshy in mango, fibrous in coconut).
- **NCERT Families**:
  - *Fabaceae (Legume)*: Papilionaceous corolla (vexillary: standard, wings, keel), diadelphous $(9)+1$ stamens, legume fruit, root nodules.
  - *Solanaceae (Potato family)*: Bicarpellary syncarpous, oblique ovary, swollen placenta with many ovules, persistent calyx (*Brinjal*, *Withania*).
  - *Brassicaceae (Cruciferae)*: Cruciform corolla, tetradynamous stamens ($4\\text{ long} + 2\\text{ short}$), siliqua fruit (*Mustard*).

---

## Plant Anatomy & Secondary Growth
- **Tissues**: Meristematic (apical, lateral/cambium, intercalary). Simple permanent (parenchyma storage/photosynthesis, collenchyma mechanical support in petiole with pectin corners, sclerenchyma dead lignified fibres/sclereids). Complex (xylem vessels, tracheids, fibres, parenchyma; phloem sieve tubes, companion cells, parenchyma, fibres).
- **Vascular Bundles**: Radial in roots (xylem and phloem on alternate radii); Conjoint in stem and leaves (closed in monocots, open with cambium in dicots).
- **Endodermis**: Features **Casparian strips** of suberin acting as a checkpoint for water movement.
- **Secondary Growth**: Vascular cambium produces secondary xylem inwards and secondary phloem outwards. Spring wood (light, wide vessels) + Autumn wood (dark, narrow) = **Annual ring** (determines age via dendrochronology). Cork cambium (phellogen) forms cork (phellem) outside and phelloderm inside = **Periderm**.
"""
            },
            {
                "title": "2.2 Animal Tissues, Cockroach & Frog Anatomy",
                "content": """# Animal Tissues, Cockroach & Frog

## Animal Tissues
1. **Epithelial Tissue**:
   - *Simple Squamous*: Diffusion boundary (alveoli of lungs, blood capillary endothelium).
   - *Simple Cuboidal*: Secretion and absorption (PCT of nephron with brush border microvilli).
   - *Simple Columnar*: Lining of stomach and intestine, goblet cells secrete mucus.
   - *Ciliated*: Moves particles (bronchioles, fallopian tubes).
   - *Compound Stratified*: Protective multilayer (skin epidermis, buccal cavity).
2. **Connective Tissue**:
   - *Loose*: Areolar (subcutaneous packing) and Adipose (fat storage).
   - *Dense Regular*: Tendons (muscle to bone) and Ligaments (bone to bone).
   - *Specialised*: Cartilage (chondrocytes in lacunae), Bone (osteocytes, Haversian canal system, calcium phosphate matrix), Blood (plasma, RBC, WBC, platelets).
3. **Muscle Tissue**:
   - *Skeletal*: Striated, voluntary, multinucleated, attached to bones.
   - *Smooth*: Unstriated, spindle-shaped, involuntary, single nucleus, visceral organs.
   - *Cardiac*: Striated, involuntary, branched with **intercalated discs** (gap junctions).
4. **Cell Junctions**: Tight junctions (prevent leakage), Adhering junctions (cementing), Gap junctions (rapid cytoplasmic transfer of ions and small molecules).

---

## Cockroach (*Periplaneta americana*)
- Chitinous exoskeleton of hardened plates called **sclerites** (tergites dorsal, sternites ventral) joined by flexible arthrodial membrane.
- Digestive: Mouth $\\rightarrow$ pharynx $\\rightarrow$ oesophagus $\\rightarrow$ crop (storage) $\\rightarrow$ gizzard (proventriculus with 6 chitinous teeth) $\\rightarrow$ 6-8 hepatic caeca $\\rightarrow$ midgut $\\rightarrow$ 100-150 yellow **Malpighian tubules** (uric acid excretion, uricotelic) $\\rightarrow$ hindgut $\\rightarrow$ anus.
- Circulatory: Open haemocoel, 13-chambered tubular heart. Respiration: Tracheal tubes opening through 10 pairs of spiracles. Compound eyes with 2000 hexagonal ommatidia (mosaic vision).

---

## Frog (*Rana tigrina*)
- Poikilotherm (cold-blooded), hibernation (winter sleep) and aestivation (summer sleep). Camouflage.
- Respiration: Cutaneous (skin) in water and on land; Buccal cavity and Pulmonary (lungs) on land.
- Circulatory: 3-chambered heart (2 atria, 1 ventricle), sinus venosus, conus arteriosus. Special portal systems: **Hepatic portal** and **Renal portal**. RBCs are nucleated and biconvex.
- Excretion: Ureotelic, pair of mesonephric kidneys. Cloaca is the common chamber for digestive, urinary, and reproductive tracts.
"""
            }
        ]
    },
    {
        "unit": "Unit 3: Cell Structure and Function",
        "description": "Cell theory, prokaryotic and eukaryotic cell structure, membrane fluid mosaic model, organelles (ER, Golgi, lysosomes, vacuoles, mitochondria, plastids, ribosomes, nucleus), biomolecules, enzymes, and cell cycle/division (mitosis & meiosis).",
        "lessons": [
            {
                "title": "3.1 Cell Biology & Organelles Structure-Function",
                "content": """# Cell Structure & Organelles

## Cell Theory & Sizes
- **Robert Hooke (1665)**: Coined 'cell'. **Leeuwenhoek**: First observed live cells.
- **Robert Brown (1831)**: Discovered nucleus.
- **Schleiden (1838) & Schwann (1839)**: Formulated Cell Theory.
- **Rudolf Virchow (1855)**: *Omnis cellula-e cellula* (cells arise from pre-existing cells).
- **Sizes**: *Mycoplasma* ($0.3\\text{ }\\mu\\text{m}$), Bacteria ($3-5\\text{ }\\mu\\text{m}$), Human RBC ($7.0\\text{ }\\mu\\text{m}$), Ostrich egg (largest single cell), Nerve cell (longest).

---

## Membrane & Organelles
- **Fluid Mosaic Model (Singer & Nicolson, 1972)**: Phospholipid bilayer with hydrophobic tails inside and hydrophilic polar heads outside. Integral and peripheral proteins. Fluidity allows lateral movement of proteins.
- **Endomembrane System**: ER + Golgi + Lysosomes + Vacuoles (functions are coordinated).
  - *RER*: Studded with ribosomes; active in protein synthesis and secretion.
  - *SER*: Lacks ribosomes; lipid and steroid hormone synthesis, detoxification in liver.
  - *Golgi Apparatus (Camillo Golgi)*: Cisternae stacks with forming/cis face (receives from ER) and maturing/trans face (releases vesicles). Site of glycosylation (glycoproteins and glycolipids).
  - *Lysosomes*: Single-membrane hydrolytic vesicles (acid hydrolases, optimum pH 5.0; 'suicide bags').
  - *Vacuoles*: Tonoplast membrane, maintains turgor and osmotic balance.
- **Semi-Autonomous Organelles**:
  - *Mitochondria*: Powerhouse, double membrane, inner membrane folds into **cristae**, matrix contains circular DNA, 70S ribosomes, site of Krebs cycle and oxidative phosphorylation ($F_0-F_1$ ATP synthase).
  - *Chloroplast*: Double membrane, thylakoids stacked into **grana** (light reaction), fluid **stroma** (dark Calvin cycle, RuBisCO), circular DNA, 70S ribosomes.
- **Nucleus**: Chromatin (euchromatin loosely packed and transcriptionally active; heterochromatin dense and inactive). Nucleolus is site for active rRNA synthesis. Centromere position: Metacentric, Sub-metacentric, Acrocentric, Telocentric.
"""
            },
            {
                "title": "3.2 Biomolecules, Enzymes & Cell Division",
                "content": """# Biomolecules, Enzymes & Cell Division

## Biomolecules
- **Proteins**: Polymers of 20 standard $\\alpha$-amino acids linked by peptide bonds ($-CO-NH-$).
  - Primary (sequence), Secondary ($\\alpha$-helix, $\\beta$-sheet via H-bonds), Tertiary (3D globular folding, disulphide bonds, active sites of enzymes), Quaternary (multiple polypeptide chains, e.g. Haemoglobin: $2\\alpha + 2\\beta$).
  - Collagen is most abundant animal protein; **RuBisCO** is most abundant protein in entire biosphere.
- **Carbohydrates**: Monosaccharides (glucose, fructose), Disaccharides (sucrose, maltose, lactose), Polysaccharides (starch plant storage with helical amylose giving blue colour with $I_2$, glycogen animal storage, cellulose $\\beta-1,4$ cell walls).
- **Lipids**: Fatty acids + glycerol. Saturated (palmitic 16C, stearic 18C) vs Unsaturated (oleic, arachidonic 20C). Phospholipids: **Lecithin** in cell membranes.
- **Nucleic Acids**: Polymers of nucleotides (base + pentose sugar + phosphate) linked by phosphodiester bonds. Purines ($A, G$), Pyrimidines ($C, T, U$).
- **Enzymes**: Biological catalysts lowering activation energy.
  - Michaelis-Menten: $V_{max}$ and $K_m$.
  - Competitive Inhibition: Inhibitor resembles substrate structurally (e.g. malonate inhibits succinate dehydrogenase). $K_m$ increases, $V_{max}$ remains unchanged.

---

## Cell Cycle, Mitosis & Meiosis
- **Cell Cycle Phases**:
  - $G_1$: Cell metabolically active, cell growth.
  - $S$ Phase: **DNA replicates** (content doubles from $2C$ to $4C$, chromosome number remains $2n$). Centriole duplicates in cytoplasm.
  - $G_2$: Proteins synthesized for mitosis.
  - $G_0$ (Quiescent stage): Metabolically active cells exit cell cycle without dividing (e.g. heart cells, neurons).
- **Mitosis (Equational Division)**:
  - *Prophase*: Chromatin condenses, asters and spindle form, nucleolus and nuclear envelope disappear.
  - *Metaphase*: Chromosomes align at equatorial **metaphase plate**, spindle fibres attach to **kinetochores**. Best stage for studying morphology of chromosomes.
  - *Anaphase*: Centromeres split simultaneously, sister chromatids move to opposite poles.
  - *Telophase*: Chromosomes decondense, nuclear envelope reforms.
  - *Cytokinesis*: Cleavage furrow in animal cells; **Cell plate** (originating from phragmoplast) in plant cells.
- **Meiosis (Reductional Division)**:
  - *Prophase I*: Leptotene (chromatin condenses) $\\rightarrow$ Zygotene (synapsis of homologous chromosomes, synaptonemal complex, bivalents form) $\\rightarrow$ **Pachytene** (crossing over between non-sister chromatids of homologous chromosomes, recombination nodules, mediated by **recombinase** enzyme) $\\rightarrow$ **Diplotene** (dissolution of synaptonemal complex, $X$-shaped **chiasmata** visible) $\\rightarrow$ Diakinesis (terminalisation of chiasmata).
  - *Anaphase I*: Homologous chromosomes separate; sister chromatids remain associated at centromeres.
  - Meiosis II: Separation of sister chromatids (equational). Results in 4 haploid genetically distinct daughter cells.
"""
            }
        ]
    },
    {
        "unit": "Unit 4: Plant Physiology",
        "description": "Photosynthesis in higher plants (light reactions, cyclic/non-cyclic photophosphorylation, Calvin cycle, C4 pathway, photorespiration), cellular respiration (glycolysis, fermentation, Krebs cycle, ETS), plant growth and development, phytohormones, photoperiodism, vernalisation.",
        "lessons": [
            {
                "title": "4.1 Photosynthesis in Higher Plants (C3, C4, CAM)",
                "content": """# Photosynthesis in Higher Plants

## Pigments & Light Reactions
- Equation: $6CO_2 + 12H_2O \\xrightarrow{\\text{light}} C_6H_{12}O_6 + 6O_2 + 6H_2O$
- **Pigments**: Chlorophyll $a$ (bright blue-green, reaction center), Chl $b$ (yellow-green), Xanthophylls (yellow), Carotenoids (yellow-orange, protect from photo-oxidation).
- **Photosystems**: PS I (reaction center $P_{700}$) and PS II (reaction center $P_{680}$).
- **Non-Cyclic Photophosphorylation (Z-Scheme)**:
  - PS II absorbs $680\\text{ nm}$ light $\\rightarrow$ electrons excited $\\rightarrow$ primary electron acceptor $\\rightarrow$ Plastoquinone (PQ) $\\rightarrow$ Cytochrome $b_6f$ $\\rightarrow$ Plastocyanin (PC) $\\rightarrow$ PS I $\\rightarrow$ Ferredoxin (Fd) $\\rightarrow$ NADP reductase $\\rightarrow$ NADPH.
  - **Photolysis of Water**: $2H_2O \\rightarrow 4H^+ + 4e^- + O_2$. Requires $Mn^{2+}$ and $Cl^-$ ions. Occurs on inner side of thylakoid membrane.
- **Cyclic Photophosphorylation**: Occurs in stroma lamellae (lacks PS II and NADP reductase). Only PS I operates. Generates ATP only (no NADPH, no $O_2$).
- **Chemiosmotic Hypothesis (Peter Mitchell)**: Protons accumulate in the thylakoid **lumen**, creating a proton gradient (lumen pH drops). Protons flow back through $CF_0-CF_1$ ATP synthase, synthesizing ATP.

---

## Dark Reactions: Calvin Cycle (C3) & C4 Pathway
- **Calvin Cycle ($C_3$ Pathway)**:
  - 1. *Carboxylation*: $CO_2$ fixed by **RuBisCO** to Ribulose-1,5-bisphosphate (RuBP, 5C) to yield 2 molecules of 3-PGA (3C).
  - 2. *Reduction*: Uses 2 ATP and 2 NADPH per $CO_2$.
  - 3. *Regeneration*: Requires 1 ATP to regenerate RuBP.
  - Net for 1 Glucose (6 turns): **18 ATP + 12 NADPH consumed**.
- **$C_4$ Pathway (Hatch & Slack)**:
  - Plants in tropical dry climates (Maize, Sugarcane, Sorghum).
  - **Kranz Anatomy**: Large bundle-sheath cells with thick walls, no intercellular spaces, high chloroplasts.
  - Mesophyll: Primary $CO_2$ acceptor is **PEP (Phosphoenolpyruvate, 3C)** catalyzed by **PEP carboxylase** (lacks oxygenase activity!). Forms **Oxaloacetic acid (OAA, 4C)**.
  - Malic acid transported to bundle sheath, decarboxylated to release $CO_2$ directly to RuBisCO.
  - **Zero Photorespiration**: Enables high productivity, high water-use efficiency, tolerance to high temperatures. Requires 30 ATP per glucose (5 ATP per $CO_2$).
- **Photorespiration ($C_2$ Cycle)**: Under high $O_2$ and low $CO_2$, RuBisCO binds $O_2$ to form 1 PGA + 1 Phosphoglycolate (2C). Wastes energy, releases $CO_2$, produces neither ATP nor NADPH.
"""
            },
            {
                "title": "4.2 Respiration in Plants & Plant Growth Regulators",
                "content": """# Plant Respiration & Phytohormones

## Cellular Respiration Pathways
- **Glycolysis (EMP Pathway)**:
  - Occurs in cytoplasm of all living cells. Anaerobic breakdown of Glucose (6C) into 2 Pyruvate (3C).
  - Key steps: Hexokinase uses 1 ATP; Phosphofructokinase (pacemaker) uses 1 ATP; 2 NADH produced at GAP $\\rightarrow$ 1,3-BPGA; 4 ATP made by substrate-level phosphorylation.
  - **Net Gain**: **2 ATP + 2 NADH**.
- **Fermentation**:
  - Alcoholic (*Yeast*): Pyruvate $\\rightarrow$ Acetaldehyde $+ CO_2 \\rightarrow$ Ethanol (uses NADH). Net 2 ATP.
  - Lactic acid (*Muscle cells* in low $O_2$): Pyruvate $\\rightarrow$ Lactic acid. Net 2 ATP.
- **Aerobic Respiration**:
  - *Link Reaction (Mitochondrial Matrix)*: $\\text{Pyruvate} + CoA + NAD^+ \\xrightarrow{\\text{Pyruvate dehydrogenase}} \\text{Acetyl-CoA} + CO_2 + NADH$.
  - *Krebs / Citric Acid Cycle (TCA)*: Acetyl-CoA (2C) + OAA (4C) $\\rightarrow$ Citrate (6C) $\\rightarrow$ Isocitrate $\\rightarrow$ $\\alpha$-Ketoglutarate (5C) $\\rightarrow$ Succinyl-CoA (4C) $\\rightarrow$ Succinate $\\rightarrow$ Fumarate $\\rightarrow$ Malate $\\rightarrow$ OAA. Per glucose (2 turns): $6\\text{ NADH} + 2\\text{ FADH}_2 + 2\\text{ GTP} + 4\\text{ CO}_2$.
  - *Electron Transport System (ETS)*: Inner mitochondrial membrane. Complex I (NADH DH), Complex II (Succinate DH), Complex III (Cyt $bc_1$), Complex IV (Cytochrome $c$ oxidase with $a, a_3$ and 2 Cu centers, terminal $O_2$ acceptor forms $H_2O$), Complex V ($F_0-F_1$ ATP synthase).
  - Theoretical Yield: $\\approx 36-38\\text{ ATP}$ per glucose molecule.
- **Respiratory Quotient (RQ)**: Volume of $CO_2$ evolved / Volume of $O_2$ consumed.
  - Carbohydrates: $1.0$; Fats (Tripalmitin): $0.7$; Proteins: $\\approx 0.9$; Organic acids: $> 1.0$.

---

## Plant Growth Regulators (Phytohormones)
1. **Auxins (IAA, IBA natural; NAA, 2,4-D synthetic)**: Apical dominance (inhibits lateral buds), cell elongation, root initiation in stem cuttings, prevents premature leaf fall, 2,4-D kills dicot weeds.
2. **Gibberellins ($GA_3$)**: Stem elongation, **bolting** in rosette plants (cabbage, beet) before flowering, increases grape stalk length, speeds up malting in brewing industry.
3. **Cytokinins (Kinetin, Zeatin)**: Promotes cell division, overcomes apical dominance, delays leaf senescence, promotes nutrient mobilisation.
4. **Ethylene (Gaseous)**: Promotes fruit ripening, hastens abscission and senescence, breaks seed dormancy, induces flowering in pineapples.
5. **Abscisic Acid (ABA)**: **Stress hormone**, closes stomata during water deficit, induces seed dormancy, acts antagonistically to gibberellins.
"""
            }
        ]
    },
    {
        "unit": "Unit 5: Human Physiology",
        "description": "Breathing and gas exchange, body fluids and circulation, excretory products and their elimination, locomotion and movement, neural control and coordination, chemical coordination and endocrine integration.",
        "lessons": [
            {
                "title": "5.1 Respiration, Circulation & Excretion",
                "content": """# Human Physiology: Respiration, Circulation & Excretion

## Breathing & Exchange of Gases
- Mechanism: Inspiration (diaphragm and external intercostals contract, thoracic volume increases, intra-pulmonary pressure drops); Expiration is passive at rest.
- **Capacities**: Tidal Volume ($500\\text{ mL}$), IRV ($2500-3000\\text{ mL}$), ERV ($1000-1100\\text{ mL}$), Residual Volume ($1100-1200\\text{ mL}$, cannot be measured by spirometer), Vital Capacity ($VC = ERV + TV + IRV \\approx 4000-4600\\text{ mL}$).
- Gas Transport:
  - $O_2$: $97\\%$ as Oxyhaemoglobin ($Hb_4O_8$), $3\\%$ dissolved in plasma. Oxygen dissociation curve is sigmoid; shifts right (Bohr effect: $O_2$ release) with high $pCO_2$, low pH (high $H^+$), high temperature.
  - $CO_2$: $70\\%$ as Bicarbonate ($HCO_3^-$) via RBC **carbonic anhydrase** with chloride shift, $20-25\\%$ as carbamino-haemoglobin, $7\\%$ dissolved in plasma.

---

## Body Fluids & Circulation
- Blood: Plasma ($55\\%$, fibrinogen for clotting, globulins for defence, albumins for osmotic balance) + Formed elements ($45\\%$, RBC 5-5.5 million/$\\mu\\text{L}$, WBC 6000-8000/$\\mu\\text{L}$, Platelets 1.5-3.5 lakh/$\\mu\\text{L}$).
- Blood Groups: ABO ($I^A, I^B, i$) and Rh factor (Erythroblastosis foetalis prevented by RhoGAM).
- Cardiac Cycle ($0.8\\text{ s}$): Atrial systole ($0.1\\text{ s}$), Ventricular systole ($0.3\\text{ s}$), Joint diastole ($0.4\\text{ s}$). Cardiac Output = Stroke Volume ($70\\text{ mL}$) $\\times$ Heart Rate ($72\\text{ bpm}$) $\\approx 5000\\text{ mL/min}$.
- Heart sounds: **Lub** (closure of tricuspid & bicuspid valves at onset of ventricular systole) and **Dub** (closure of semilunar valves at onset of ventricular diastole).
- Conducting System: SA Node (pacemaker, $72\\text{ impulses/min}$) $\\rightarrow$ AV Node $\\rightarrow$ Bundle of His $\\rightarrow$ Purkinje fibres.

---

## Excretory Products & Elimination
- Nitrogenous wastes: Ammonotelic (aquatic), Ureotelic (mammals, amphibians), Uricotelic (birds, reptiles, insects).
- Nephron: Glomerulus + Bowman's capsule (ultrafiltration, GFR $= 125\\text{ mL/min} = 180\\text{ L/day}$), PCT ($70-80\\%$ electrolyte and water reabsorption, brush border cuboidal cells), Loop of Henle (descending limb permeable to water, ascending limb permeable to electrolytes), DCT (conditional $Na^+$ and water reabsorption under aldosterone and ADH).
- **Counter-Current Mechanism**: Loop of Henle and Vasa Recta maintain medullary interstitial gradient ($300\\text{ mOsmol/L}$ in cortex to $1200\\text{ mOsmol/L}$ in inner medulla), allowing concentration of urine up to 4 times that of blood.
- Hormonal Regulation:
  - **RAAS**: Low GFR triggers JG cells to release **Renin** $\\rightarrow$ Angiotensinogen to Angiotensin I to Angiotensin II (potent vasoconstrictor) $\\rightarrow$ releases Aldosterone (reabsorbs $Na^+$ and water).
  - **ADH / Vasopressin**: Released from posterior pituitary upon osmoreceptor stimulation; increases water reabsorption in DCT/collecting duct.
  - **ANF**: Atrial Natriuretic Factor released by heart atria on high BP; causes vasodilation and opposes RAAS.
"""
            },
            {
                "title": "5.2 Locomotion, Nervous System & Endocrine Glands",
                "content": """# Locomotion, Nervous System & Endocrine System

## Muscle Contraction & Skeleton
- **Sarcomere**: Functional contractile unit between two Z-lines. A-band (dark, myosin + overlapping actin), I-band (light, actin only), H-zone (myosin only in center).
- **Sliding Filament Theory**: Nerve impulse $\\rightarrow$ $Ca^{2+}$ released from sarcoplasmic reticulum $\\rightarrow$ binds **Troponin C** $\\rightarrow$ unmasks myosin-binding sites on actin $\\rightarrow$ Myosin head hydrolyzes ATP $\\rightarrow$ forms cross-bridge $\\rightarrow$ power stroke pulls actin toward M-line $\\rightarrow$ **I-band and H-zone shorten, A-band remains constant**.
- **Bones (206 total)**: Axial (80: skull 29, vertebral column 26, sternum 1, ribs 24) and Appendicular (126: pectoral girdle 4, pelvic girdle 2, upper limbs 60, lower limbs 60). True ribs (pairs 1-7), False (8-10), Floating (11-12).

---

## Neural Control & Coordination
- **Neuron & Conduction**:
  - Resting potential: $-70\\text{ mV}$ (inside negative) maintained by $3Na^+-2K^+$ ATPase pump and $K^+$ leak channels.
  - Action potential: Stimulus causes rapid $Na^+$ influx through voltage-gated channels $\\rightarrow$ depolarisation to $+30\\text{ mV}$. Repolarisation caused by $K^+$ efflux.
- **Brain Anatomy**:
  - *Forebrain*: Cerebrum (corpus callosum connects two cerebral hemispheres; sensory, motor and association areas), Thalamus (relay center), Hypothalamus (body temperature, hunger, thirst, neurohormones).
  - *Midbrain*: Corpora quadrigemina (4 optic/auditory reflex lobes).
  - *Hindbrain*: Pons, Cerebellum (posture and balance equilibrium), Medulla oblongata (respiratory, cardiovascular, vomiting reflexes).

---

## Endocrine Glands & Hormones
- **Hypothalamus**: Releasing (GnRH, TRH) and Inhibiting (Somatostatin) neurohormones.
- **Pituitary Gland**:
  - Adenohypophysis: GH (excess causes gigantism in kids, acromegaly in adults; deficiency causes dwarfism), Prolactin, TSH, ACTH, LH & FSH (gonadotropins).
  - Neurohypophysis: Oxytocin (milk ejection, uterine contractions during child birth) and Vasopressin (ADH).
- **Thyroid Gland**: $T_3, T_4$ (iodine required; deficiency causes Goitre, cretinism in children, myxoedema in adults; Graves' disease hyperthyroidism) and Thyrocalcitonin (TCT, lowers blood $Ca^{2+}$).
- **Parathyroid**: Parathormone (PTH, increases blood $Ca^{2+}$, hypercalcemic hormone antagonistic to TCT).
- **Adrenal Gland**: Cortex secretes Glucocorticoids (Cortisol: gluconeogenesis, anti-inflammatory), Mineralocorticoids (Aldosterone: $Na^+$ retention), Androgenic steroids. Medulla secretes Adrenaline (epinephrine) and Noradrenaline (emergency 'fight or flight' hormones).
- **Pancreas (Islets of Langerhans)**: $\\alpha$-cells secrete Glucagon (hyperglycemic), $\\beta$-cells secrete **Insulin** (hypoglycemic, promotes glucose uptake into cells; deficiency causes Diabetes Mellitus).
"""
            }
        ]
    },
    {
        "unit": "Unit 6: Reproduction",
        "description": "Sexual reproduction in flowering plants (microsporogenesis, megasporogenesis, pollination, double fertilisation, seed development, apomixis), human reproductive systems, gametogenesis, menstrual cycle, fertilisation, pregnancy, lactation, and reproductive health (contraception, MTP, STDs, ART).",
        "lessons": [
            {
                "title": "6.1 Sexual Reproduction in Flowering Plants",
                "content": """# Sexual Reproduction in Flowering Plants

## Microsporogenesis & Pollen Grains
- **Stamen**: Filament + Anther (bilobed, dithecous, 4 microsporangia).
- **Anther Wall Layers** (outside to inside): Epidermis $\\rightarrow$ Endothecium (hygroscopic, dehiscence) $\\rightarrow$ Middle layers $\\rightarrow$ **Tapetum** (innermost nutritive layer, multinucleate, dense cytoplasm).
- Microspore Mother Cell (MMC, $2n$) undergoes meiosis to form **Microspore Tetrad** ($n$).
- **Pollen Grain (Male Gametophyte)**:
  - *Exine*: Outer hard wall composed of **Sporopollenin** (most resistant organic material known; withstands high temp, strong acids, alkali; no enzyme can degrade it!). Has **germ pores** where sporopollenin is absent.
  - *Intine*: Inner thin cellulose and pectin layer.
  - *Vegetative Cell*: Large with irregular nucleus and food reserves.
  - *Generative Cell*: Small, floats in vegetative cytoplasm; divides mitotically into **2 male gametes**.
  - Pollen grains shed at 2-celled stage in $>60\\%$ angiosperms; 3-celled stage in remainder.

---

## Megasporogenesis & Embryo Sac (Female Gametophyte)
- **Ovule (Megasporangium)**: Attached to placenta by funicle. Parts: Hilum, Integuments, Micropyle, Chalaza, Nucellus.
- Megaspore Mother Cell (MMC, $2n$) divides meiotically into 4 megaspores; 3 degenerate and 1 functional megaspore remains (**Monosporic development**).
- Functional megaspore nucleus undergoes 3 successive free-nuclear mitotic divisions to form **7-celled, 8-nucleate Embryo Sac**:
  - *Egg Apparatus (at micropyle)*: 1 Egg cell + 2 Synergids (with **filiform apparatus** to guide pollen tube).
  - *Antipodal Cells (at chalaza)*: 3 cells.
  - *Central Cell*: Large cell with **2 Polar Nuclei**.

---

## Pollination & Double Fertilisation
- **Pollination Types**: Autogamy (same flower; **cleistogamous** flowers like *Viola*, *Oxalis*, *Commelina* never open, ensuring assured seed set), Geitonogamy (different flower of same plant, genetically autogamous), Xenogamy (cross-pollination between different plants, brings genetic variation).
- **Double Fertilisation (Unique to Angiosperms, Nawaschin)**:
  - 1. **Syngamy**: 1st male gamete ($n$) + Egg cell ($n$) $\\rightarrow$ Zygote ($2n$).
  - 2. **Triple Fusion**: 2nd male gamete ($n$) + 2 Polar nuclei ($2n$) $\\rightarrow$ Primary Endosperm Nucleus (**PEN, $3n$**).
- **Endosperm**: Develops before embryo to provide nutrition. Coconut water is free-nuclear endosperm; surrounding white kernel is cellular endosperm.
- **Apomixis**: Production of seeds without fertilisation (mimics sexual reproduction in *Asteraceae* and grasses). Polyembryony occurs in *Citrus* and Mango.
"""
            },
            {
                "title": "6.2 Human Reproduction & Reproductive Health",
                "content": """# Human Reproduction & Reproductive Health

## Male & Female Reproductive Anatomy
- **Male System**: Testes situated in extra-abdominal **scrotum** (maintains $2-2.5^\\circ\\text{C}$ lower temperature essential for spermatogenesis). Seminiferous tubules contain **Sertoli cells** (nurse cells, secrete inhibin) and **Leydig cells** (interstitial cells, secrete testosterone under LH). Accessory ducts: Rete testis $\\rightarrow$ Vasa efferentia $\\rightarrow$ Epididymis $\\rightarrow$ Vas deferens. Accessory glands: Seminal vesicles ($60\\%$ semen volume, rich in fructose), Prostate, Bulbourethral (Cowper's, lubricating).
- **Female System**: Ovaries $\\rightarrow$ Fallopian tube (Infundibulum with fimbriae, **Ampulla** site of fertilisation, Isthmus) $\\rightarrow$ Uterus (Perimetrium, Myometrium smooth muscle for labour contractions, Endometrium glandular lining shedding during menstruation).

---

## Gametogenesis & Menstrual Cycle
- **Spermatogenesis**: Continuous from puberty onwards. Spermatogonia ($2n$) $\\rightarrow$ Primary spermatocyte ($2n$) $\\rightarrow$ Meiosis I $\\rightarrow$ Secondary spermatocytes ($n$) $\\rightarrow$ Meiosis II $\\rightarrow$ Spermatids ($n$) $\\rightarrow$ Spermiogenesis $\\rightarrow$ Spermatozoa ($n$).
- **Oogenesis**: Initiated during embryonic development! Primary oocytes arrested at **Prophase I** until puberty. At puberty, primary oocyte finishes Meiosis I $\\rightarrow$ Secondary oocyte ($n$, arrested at **Metaphase II**) + 1st polar body. Meiosis II completed **only upon sperm entry**, yielding Ovum + 2nd polar body.
- **Menstrual Cycle (28 days)**:
  - Menstrual Phase (Days 1-5): Endometrial breakdown due to progesterone withdrawal.
  - Follicular / Proliferative Phase (Days 6-13): FSH stimulates Graafian follicle growth; estrogen repairs endometrium.
  - **Ovulatory Phase (Day 14)**: **LH Surge** triggers rupture of Graafian follicle and release of secondary oocyte.
  - Luteal / Secretory Phase (Days 15-28): Ruptured follicle becomes **Corpus Luteum**, secreting high amounts of **Progesterone** to maintain endometrium.

---

## Reproductive Health & ART
- **Contraceptive Methods**:
  - *Barrier*: Condoms (protect against STDs/HIV), Diaphragms, Cervical caps.
  - *IUDs*: Non-medicated (*Lippes loop*), Copper-releasing (*CuT, Cu7, Multiload 375* suppress sperm motility and fertilising capacity), Hormone-releasing (*Progestasert, LNG-20* make uterus unsuitable for implantation).
  - *Oral Pills*: *Saheli* (weekly, non-steroidal, developed by CDRI Lucknow).
  - *Surgical*: Vasectomy (vas deferens cut) and Tubectomy (fallopian tubes cut).
- **Assisted Reproductive Technologies (ART)**:
  - **IVF-ET**: In-vitro fertilisation followed by embryo transfer (**ZIFT**: zygote up to 8 blastomeres into fallopian tube; **IUT**: embryo $>8$ blastomeres into uterus).
  - **GIFT**: Transfer of gametes into fallopian tube of female who cannot produce ovum.
  - **ICSI**: Intra-Cytoplasmic Sperm Injection directly into ovum.
"""
            }
        ]
    },
    {
        "unit": "Unit 7: Genetics and Evolution",
        "description": "Mendelian inheritance, monohybrid and dihybrid crosses, incomplete dominance, codominance, chromosomal theory, linkage, sex determination, sex-linked disorders, DNA structure, packaging, replication, transcription, genetic code, translation, lac operon, HGP, DNA fingerprinting, origin of life, natural selection, Hardy-Weinberg principle, and human evolution.",
        "lessons": [
            {
                "title": "7.1 Mendelian Genetics, Linkage & Genetic Disorders",
                "content": """# Mendelian Genetics & Chromosomal Inheritance

## Mendel's Laws & Deviations
- Gregor Mendel worked on garden pea (*Pisum sativum*) for 7 years (1856-1863), studying 7 contrasting traits.
- **Law of Segregation**: Alleles separate during gamete formation so each gamete carries only one allele (Purity of gametes). Monohybrid cross phenotypic ratio $3:1$, genotypic ratio $1:2:1$.
- **Law of Independent Assortment**: Dihybrid cross F2 ratio: **9 : 3 : 3 : 1** (Round Yellow : Round Green : Wrinkled Yellow : Wrinkled Green).
- **Test Cross**: Dominant phenotype crossed with homozygous recessive ($Tt \\times tt \\rightarrow 1:1$).
- **Deviations**:
  - *Incomplete Dominance*: Snapdragon (*Antirrhinum*) red $\\times$ white $\\rightarrow$ pink F1 ($1:2:1$ phenotypic & genotypic).
  - *Codominance*: ABO blood groups ($I^A$ and $I^B$ both fully expressed in $I^A I^B$ group AB).
  - *Multiple Alleles*: ABO blood groups controlled by 3 alleles ($I^A, I^B, i$) giving 6 genotypes and 4 phenotypes.
  - *Pleiotropy*: Single gene influences multiple traits (e.g. Phenylketonuria).

---

## Linkage, Sex Determination & Genetic Disorders
- **Chromosomal Theory of Inheritance (Sutton & Boveri, 1902)**: Chromosomes and genes occur in pairs and segregate together. Verified experimentally by **T.H. Morgan** in *Drosophila melanogaster*.
- **Linkage & Recombination**: Genes on the same chromosome are linked. Recombination frequency used by Alfred Sturtevant to construct genetic maps ($1\\text{ map unit} = 1\\%\\text{ recombination} = 1\\text{ cM}$).
- **Sex Determination**: XX-XY (Humans, *Drosophila* - male heterogametic), XX-XO (Grasshopper), ZW-ZZ (Birds - female heterogametic), Haplodiploidy (Honeybees: females $2n=32$, males haploid $n=16$ via parthenogenesis).
- **Mendelian Disorders**:
  - *Haemophilia*: X-linked recessive, defect in blood clotting cascade.
  - *Sickle-Cell Anaemia*: Autosomal recessive point mutation in $\\beta$-globin gene ($GAG \\rightarrow GUG$), replacing Glutamic acid with **Valine at position 6**.
  - *Thalassemia*: Quantitative defect in $\\alpha$ or $\\beta$ globin chain synthesis.
  - *Phenylketonuria (PKU)*: Lack of phenylalanine hydroxylase enzyme $\\rightarrow$ accumulation of phenylalanine.
- **Chromosomal Disorders**:
  - *Down's Syndrome*: Trisomy of chromosome 21 ($47, +21$). Short stature, furrowed tongue, mental retardation.
  - *Klinefelter's Syndrome*: Karyotype $47, XXY$. Tall male, gynaecomastia, sterile.
  - *Turner's Syndrome*: Karyotype $45, XO$. Sterile female, webbed neck, rudimentary ovaries.
"""
            },
            {
                "title": "7.2 Molecular Basis of Inheritance & Evolution",
                "content": """# Molecular Genetics & Evolution

## DNA Structure, Replication & Central Dogma
- **DNA Double Helix (Watson & Crick, 1953)**: Antiparallel strands, pitch $3.4\\text{ nm}$, 10 bp per turn ($0.34\\text{ nm}$ per bp), $A=T$ (2 H-bonds) and $G\\equiv C$ (3 H-bonds). **Chargaff's Rule**: $[A] = [T]$ and $[G] = [C]$.
- **DNA Packaging**: In eukaryotes, negatively charged DNA wraps around positively charged **histone octamer** (rich in basic lysine and arginine) to form a **nucleosome** ($200\\text{ bp}$).
- **Replication**: Semi-conservative (**Meselson & Stahl**, $^{15}N/^{14}N$ in *E. coli*). DNA polymerase synthesizes 5' to 3' continuously on leading strand and discontinuously as **Okazaki fragments** (joined by DNA ligase) on lagging strand.
- **Transcription**: Template strand 3' to 5'; coding strand 5' to 3'. In eukaryotes: RNA Pol I (rRNA), RNA Pol II (mRNA/hnRNA), RNA Pol III (tRNA, 5S rRNA). Post-transcriptional modifications: Splicing (remove introns), Capping (methyl guanosine triphosphate at 5'), Tailing (poly-A at 3').
- **Genetic Code**: Triplet, 61 sense codons + 3 stop codons (UAA, UAG, UGA). **AUG** is initiator codon (codes for Methionine). Code is universal, degenerate, and unambiguous.
- **Lac Operon (Jacob & Monod)**: Inducible operon. Gene $i$ codes for repressor. In presence of inducer (**lactose / allolactose**), repressor is inactivated $\\rightarrow$ RNA polymerase transcribes structural genes: $lacZ$ ($\\beta$-galactosidase), $lacY$ (permease), $lacA$ (transacetylase).

---

## Origin of Life & Organic Evolution
- **Chemical Evolution (Oparin-Haldane)**: Confirmed by **Miller-Urey experiment (1953)**: Spark discharge in $CH_4, NH_3, H_2, H_2O$ vapour at $800^\\circ\\text{C}$ formed amino acids.
- **Evidences of Evolution**:
  - *Homologous Organs (Divergent Evolution)*: Same origin and structure, different functions. Forelimbs of whales, bats, cheetah, humans; thorns of *Bougainvillea* and tendrils of *Cucurbita*.
  - *Analogous Organs (Convergent Evolution)*: Different structure, same function. Wings of butterfly and bird; sweet potato (root tuber) and potato (stem tuber).
- **Natural Selection**: Industrial melanism in peppered moth (*Biston betularia*). Stabilising, Directional, and Disruptive selection.
- **Hardy-Weinberg Principle**: Allele frequencies remain constant in absence of mutation, gene flow, genetic drift, selection, and non-random mating.
  $$p + q = 1, \\quad p^2 + 2pq + q^2 = 1$$
- **Human Evolution**: *Dryopithecus* $\\rightarrow$ *Ramapithecus* (man-like) $\\rightarrow$ *Australopithecus* (2 mya) $\\rightarrow$ *Homo habilis* (first toolmaker, 650-800 cc) $\\rightarrow$ *Homo erectus* (1.5 mya, 900 cc, meat-eater) $\\rightarrow$ *Neanderthal man* (1400 cc, buried dead) $\\rightarrow$ *Homo sapiens* (1350 cc, cave art).
"""
            }
        ]
    },
    {
        "unit": "Unit 8: Biology and Human Welfare",
        "description": "Human health and common diseases (typhoid, pneumonia, malaria life cycle, filariasis, ringworm, dengue), basic immunology, innate and acquired immunity, vaccination, allergy, autoimmunity, cancer, HIV/AIDS, drug/alcohol abuse, and microbes in human welfare (dairy, industrial, sewage treatment, biogas, biocontrol, biofertilisers).",
        "lessons": [
            {
                "title": "8.1 Human Diseases, Immunology & Cancer/AIDS",
                "content": """# Health, Immunity, Cancer & AIDS

## Common Pathogenic Diseases in Humans
- **Typhoid**: *Salmonella typhi*, contaminated food/water, sustained high fever, intestinal perforation, diagnosed by **Widal test**.
- **Pneumonia**: *Streptococcus pneumoniae*, *Haemophilus influenzae*, infects lung alveoli which fill with fluid.
- **Common Cold**: *Rhino viruses*, infects nose and respiratory passage but NOT the lungs.
- **Malaria**: *Plasmodium* (*P. vivax*, *P. falciparum* malignant). Vector: Female *Anopheles* mosquito. Sporozoites enter liver cells $\\rightarrow$ reproduce asexually $\\rightarrow$ burst RBCs releasing toxic **haemozoin** (causes recurring chills and high fever).
- **Amoebiasis**: *Entamoeba histolytica*, protozoan in large intestine, stools with excess mucus and blood clots.
- **Filariasis / Elephantiasis**: *Wuchereria bancrofti*, transmitted by female *Culex* mosquito, chronic inflammation of lymphatic vessels of lower limbs.
- **Ringworm**: Fungi (*Microsporum*, *Trichophyton*, *Epidermophyton*), dry scaly lesions on skin/nails.
- **Dengue & Chikungunya**: Viral, vector is *Aedes aegypti* mosquito.

---

## Immunology
- **Innate Immunity** (Non-specific, at birth):
  - Physical: Skin, mucus coating of respiratory/digestive tracts.
  - Physiological: Stomach $HCl$, saliva, tears containing lysozyme.
  - Cellular: Phagocytes like polymorphonuclear leukocytes (PMNL-neutrophils), monocytes, macrophages.
  - Cytokine: **Interferons** (proteins secreted by virus-infected cells to protect healthy neighboring cells).
- **Acquired Immunity** (Pathogen-specific, memory):
  - Humoral (HMI): B-lymphocytes produce **Antibodies** ($H_2L_2$ molecule; IgG most abundant, IgA in colostrum, IgE in allergies, IgM, IgD).
  - Cell-Mediated (CMI): T-lymphocytes; responsible for **graft rejection** in organ transplants.
- **Vaccination**: Introduces inactivated/attenuated pathogen to generate memory B and T cells.
- **Autoimmunity**: Immune system attacks self-antigens (e.g. **Rheumatoid Arthritis**).

---

## Cancer, HIV & Drug Abuse
- **Cancer**: Cells lose **contact inhibition**, undergo uncontrolled proliferation forming tumours (benign vs malignant which shows **metastasis**). Caused by carcinogens (UV, X-rays, tobacco smoke). Treatment: Surgery, radiotherapy, chemotherapy, and immunotherapy ($\\alpha$-interferon).
- **AIDS**: Caused by **HIV** (retrovirus with RNA genome). Virus attacks **Helper T-lymphocytes ($T_H$)** via reverse transcriptase, depleting $T_H$ count and causing severe immunocompromise. Diagnosed by **ELISA**; confirmed by Western blot.
- **Drugs**: Opioids (Heroin/smack from *Papaver somniferum*), Cannabinoids (*Cannabis sativa*, cardiovascular effects), Cocaine (*Erythroxylum coca*, interferes with dopamine transport).
"""
            },
            {
                "title": "8.2 Microbes in Human Welfare",
                "content": """# Microbes in Human Welfare

## Household & Industrial Products
- **Household**:
  - *Lactobacillus* (LAB): Converts milk into curd, improves nutritional quality by increasing **Vitamin $B_{12}$**, checks disease microbes in gut.
  - *Saccharomyces cerevisiae* (Baker's yeast): Ferments dough for bread, releasing $CO_2$.
  - *Propionibacterium shermanii*: Produces large holes in Swiss cheese due to large $CO_2$ emission.
  - *Roquefort cheese*: Ripened by specific fungi for characteristic flavor.
- **Industrial**:
  - Brewer's Yeast (*S. cerevisiae*): Ferments malted cereals and fruit juices into ethanol.
  - Antibiotics: **Penicillin** discovered by Alexander Fleming from *Penicillium notatum*, full potential established by Florey and Chain.
  - Organic Acids: *Aspergillus niger* (Citric acid), *Acetobacter aceti* (Acetic acid), *Clostridium butylicum* (Butyric acid), *Lactobacillus* (Lactic acid).
  - Bioactive Molecules:
    - **Cyclosporin A**: Immunosuppressive agent in organ transplant patients, extracted from fungus *Trichoderma polysporum*.
    - **Statins**: Blood cholesterol lowering agents (competitive inhibitor of cholesterol synthesis enzyme), produced by yeast *Monascus purpureus*.
    - **Streptokinase**: 'Clot buster' for removing clots from blood vessels, produced by *Streptococcus*.

---

## Sewage Treatment, Biogas & Biocontrol
- **Sewage Treatment**:
  - *Primary Treatment*: Physical removal of particles via sequential filtration and sedimentation (primary sludge).
  - *Secondary (Biological) Treatment*: Effluent passed to aeration tanks where aerobic microbes form **flocs** (bacteria associated with fungal filaments), drastically reducing **BOD (Biochemical Oxygen Demand)**. Lower BOD = less polluted water. Then passed to anaerobic sludge digesters where methanogens produce **Biogas** ($CH_4, CO_2, H_2S$).
- **Biogas Production**: Methanogenic bacteria like *Methanobacterium* in cattle dung (gobar) produce methane-rich fuel. Technology developed in India by IARI and KVIC.
- **Biocontrol Agents**:
  - Ladybird beetle controls aphids; Dragonflies control mosquitoes.
  - *Bacillus thuringiensis* (Bt): Spores control butterfly caterpillars.
  - *Trichoderma*: Free-living root fungus controlling soil-borne plant pathogens.
  - **Baculoviruses (*Nucleopolyhedrovirus*)**: Species-specific, narrow-spectrum insecticides safe for non-target organisms.
- **Biofertilisers**: *Rhizobium* (legume root nodules), *Azospirillum*, *Azotobacter* (free-living $N_2$ fixers), *Mycorrhiza* (*Glomus* absorbs phosphorus for plants), Cyanobacteria (*Nostoc*, *Anabaena*, *Oscillatoria* in paddy fields).
"""
            }
        ]
    },
    {
        "unit": "Unit 9: Biotechnology and Its Applications",
        "description": "Principles and processes of biotechnology, recombinant DNA technology, restriction enzymes, cloning vectors, PCR, bioreactors, downstream processing, applications in health (human insulin, gene therapy, molecular diagnosis), agriculture (Bt crops, RNAi, Golden rice), transgenic animals, and biosafety/ethical issues.",
        "lessons": [
            {
                "title": "9.1 Principles & Processes of Recombinant DNA Technology",
                "content": """# Recombinant DNA Technology

## Tools of Recombinant DNA Technology
- Definition (EFB): Integration of natural science and organisms, cells, parts thereof, and molecular analogues for products and services.
- **First Recombinant DNA (1972)**: Constructed by **Stanley Cohen and Herbert Boyer** by combining antibiotic resistance gene with plasmid of *Salmonella typhimurium*.
- **Key Enzymes**:
  - **Restriction Endonucleases ('Molecular Scissors')**: Cut DNA at specific palindromic sequences. First discovered was *Hind II* (6 bp). *EcoRI* cuts $5'\\text{-G}\\downarrow\\text{AATTC-3'}$, producing sticky single-stranded overhangs.
  - **DNA Ligase ('Molecular Glue')**: Seals phosphodiester backbone between complementary sticky ends.
  - **DNA Polymerase**: Synthesizes new DNA strands.
- **Agarose Gel Electrophoresis**: Separates DNA fragments based on size and negative charge towards the anode ($+$). Visualised by staining with **Ethidium Bromide (EtBr)** under UV light as bright orange bands. Extraction of band from gel is **Elution**.

---

## Cloning Vectors & Competent Hosts
- **Features of Cloning Vector**:
  - 1. *Origin of Replication (ori)*: Controls copy number of linked DNA.
  - 2. *Selectable Marker*: Distinguishes transformants from non-transformants (e.g. $amp^R, tet^R$ in plasmid **pBR322**).
  - 3. *Cloning Sites*: Unique recognition sites for restriction enzymes. **Insertional Inactivation**: e.g. Insertion into $\\beta$-galactosidase gene ($lacZ$) yields white recombinant colonies instead of blue in presence of chromogenic substrate.
  - 4. *Vectors for Plants/Animals*: *Ti plasmid* of *Agrobacterium tumefaciens* (disarmed) for plants; Retroviruses (disarmed) for animals.
- **Processes of Genetic Engineering**:
  - Isolation of DNA (using lysozyme, cellulase, or chitinase; RNA removed by RNase, proteins by protease; precipitated with **chilled ethanol**).
  - **Polymerase Chain Reaction (PCR, Kary Mullis)**: In-vitro amplification of gene:
    - 1. *Denaturation*: $94^\\circ\\text{C}$ splits dsDNA.
    - 2. *Annealing*: $50-60^\\circ\\text{C}$ primers bind.
    - 3. *Extension*: $72^\\circ\\text{C}$ using thermostable **Taq Polymerase** (isolated from thermophilic bacterium *Thermus aquaticus*).
  - **Bioreactors**: Large-scale culture ($100-1000\\text{ L}$) with optimal temperature, pH, substrate, and aeration (stirred-tank and sparged bioreactors).
  - **Downstream Processing**: Separation, purification, formulation, and clinical quality testing.
"""
            },
            {
                "title": "9.2 Applications of Biotechnology in Medicine & Agriculture",
                "content": """# Biotechnology Applications & Biosafety

## Applications in Medicine
- **Genetically Engineered Insulin (Humulin)**:
  - Natural human insulin produced as pro-hormone containing A chain (21 aa), B chain (30 aa), and extra connecting **C-peptide** (which is cleaved during maturation).
  - In 1983, American company **Eli Lilly** synthesized two separate DNA sequences for chains A and B, introduced them into *E. coli*, extracted chains separately, and combined them via **disulphide bonds** to form mature human insulin without C-peptide!
- **Gene Therapy**:
  - First clinical gene therapy (1990) performed on 4-year-old girl with **ADA (Adenosine Deaminase) deficiency** (causing Severe Combined Immunodeficiency, SCID).
  - Functional ADA cDNA introduced into cultured lymphocytes of patient using retroviral vector. Permanent cure requires introduction of ADA gene into bone marrow cells at early embryonic stages.
- **Molecular Diagnosis**: Early pathogen detection before clinical symptoms appear using **PCR** (detects HIV, oncogene mutations) and **ELISA** (based on antigen-antibody interactions).

---

## Applications in Agriculture & Transgenic Organisms
- **Bt Cotton**: Bacterium *Bacillus thuringiensis* produces crystalline insecticidal proteins (**Cry proteins**).
  - Cry protein exists as inactive protoxin; upon ingestion by insect, it solubilises in **alkaline gut pH**, active toxin binds to midgut epithelial cells, creates pores, causes lysis and insect death.
  - Genes: $cryIAc$ and $cryIIAb$ control cotton bollworms; $cryIAb$ controls corn borer.
- **RNA Interference (RNAi)**:
  - Cellular defense mechanism in all eukaryotes: silencing of specific mRNA by complementary double-stranded RNA (dsRNA).
  - Nematode *Meloidogyne incognita* infects tobacco roots causing yield loss. *Agrobacterium* vectors introduced nematode-specific sense and antisense genes, generating dsRNA that silenced parasite mRNA.
- **Transgenic Animals**:
  - Over $95\\%$ of transgenic animals are mice.
  - Transgenic cow **Rosie (1997)** produced human protein-enriched milk ($2.4\\text{ g/L}$) containing **human $\\alpha$-lactalbumin**, nutritionally more balanced for human babies.
  - Transgenic models used to study human diseases: Cancer, Cystic fibrosis, Alzheimer's.
- **Ethical Issues & Biopiracy**:
  - **GEAC** (Genetic Engineering Appraisal Committee) regulates GM research validity and public safety in India.
  - **Biopiracy**: Use of bio-resources by multinational corporations without authorization and compensatory payment (e.g. patents on Indian Basmati rice by RiceTec in USA, neem, and turmeric).
"""
            }
        ]
    },
    {
        "unit": "Unit 10: Ecology and Environment",
        "description": "Organisms and environment, abiotic factors, adaptations, population attributes, population growth curves, population interactions (mutualism, competition, predation, parasitism, commensalism, amensalism), ecosystem structure and function, energy flow, ecological pyramids, ecological succession, nutrient cycling, biodiversity patterns, loss of biodiversity (Evil Quartet), and conservation strategies (in-situ and ex-situ).",
        "lessons": [
            {
                "title": "10.1 Organisms, Populations & Ecosystem Dynamics",
                "content": """# Organisms, Populations & Ecosystem Dynamics

## Abiotic Factors & Adaptations
- **Temperature**: Most ecologically relevant factor. Eurythermal (wide range) vs Stenothermal (narrow range).
- **Responses to Abiotic Stress**:
  - *Regulate*: Maintain homeostasis (birds and mammals, constant internal temp and osmolarity).
  - *Conform*: Internal environment changes with external (99% animals and nearly all plants).
  - *Migrate*: Temporary movement to hospitable areas (e.g. Siberian cranes to Keoladeo National Park, Bharatpur).
  - *Suspend*: Hibernation in winter (bears), Aestivation in summer (snails, fish), Diapause in zooplankton, spores in bacteria/fungi.
- **Adaptations**:
  - **Allen's Rule**: Mammals from colder climates have shorter ears and limbs to minimize heat loss.
  - Kangaroo rat in North American deserts satisfies water needs via internal fat oxidation, produces concentrated urine.
  - Desert plants (*Opuntia*): Thick cuticle, sunken stomata, CAM photosynthetic pathway, leaves reduced to spines.
  - Altitude Sickness ($low\\text{ }pO_2$): Body compensates by increasing RBC production, decreasing Hb-binding affinity, and increasing breathing rate.

---

## Population Growth & Interactions
- **Attributes**: Birth rate, death rate, sex ratio, age pyramids (expanding, stable, declining).
- **Growth Models**:
  - *Exponential Growth* (unlimited resources): $\\frac{dN}{dt} = rN \\implies N_t = N_0 e^{rt}$ (J-shaped curve).
  - *Logistic Growth* (limited resources, Verhulst-Pearl): $\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)$ (Sigmoid S-shaped curve, $K =$ Carrying Capacity).
- **Population Interactions**:
  - *Mutualism ($+/+$)*: Lichens (alga + fungus), Mycorrhiza (fungus + roots), Fig and Fig-wasp, Mediterranean orchid *Ophrys* and bee (**sexual deceit**).
  - *Competition ($-/-$)*: **Gause's Competitive Exclusion Principle** (two closely related species competing for identical limiting resources cannot coexist indefinitely; inferior eliminated, e.g. Abingdon tortoise in Galapagos became extinct after goats introduced). Resource partitioning (*MacArthur's warblers*).
  - *Predation ($+/-$)*: Predator keeps prey population under control. Keystone predator *Pisaster* starfish. Biological control of prickly pear cactus by *Cactoblastis* moth in Australia.
  - *Parasitism ($+/-$)*: Ectoparasites (lice, ticks, *Cuscuta*), Endoparasites (*Plasmodium*, liver fluke), **Brood parasitism** (koel lays eggs in crow's nest).
  - *Commensalism ($+/0$)*: Orchid on mango tree, barnacles on whale, cattle egret and grazing cattle, sea anemone and clownfish.
  - *Amensalism ($0/-$)*: *Penicillium* secretes penicillin inhibiting bacteria.

---

## Ecosystem Structure & Energy Flow
- **Productivity**: Gross Primary Productivity (GPP) minus Respiratory losses ($R$) = **Net Primary Productivity (NPP)**. Total biosphere NPP $\\approx 170\\text{ billion tonnes}$ (oceans contribute only $55\\text{ billion tonnes}$ despite covering $70\\%$ surface).
- **Energy Flow**: Unidirectional. **Lindeman's 10% Law**: Only $10\\%$ of energy is transferred from one trophic level to the next.
- **Ecological Pyramids**: Pyramid of energy is **ALWAYS upright**. Pyramid of biomass is inverted in aquatic ecosystems (phytoplankton biomass $<$ zooplankton biomass).
- **Succession**: Primary (bare rock, pioneer species lichens/mosses $\\rightarrow$ mesic climax forest) vs Secondary (abandoned farmland, faster).
"""
            },
            {
                "title": "10.2 Biodiversity, Conservation & Environmental Protection",
                "content": """# Biodiversity & Conservation

## Biodiversity Patterns & Estimates
- Term popularised by sociobiologist **Edward Wilson**.
- Levels: Genetic diversity (e.g. 50,000 strains of rice, 1,000 mango varieties in India; *Rauwolfia vomitoria* medicinal reserpine), Species diversity (Western Ghats have more amphibian species than Eastern Ghats), Ecological diversity.
- Global estimates: **Robert May** estimates global species diversity at $\\approx 7\\text{ million}$. More than $70\\%$ are animals (insects comprise $>70\\%$ of all animal species). Fungi species exceed total species of fish + amphibians + reptiles + mammals! India has $2.4\\%$ of world land area but possesses **$8.1\\%$ global species diversity** (one of 12 megadiverse nations).
- **Latitudinal Gradient**: Species diversity decreases from equator to poles. Tropical Amazon rainforest in South America is richest in biodiversity on Earth.
- **Species-Area Relationship (Alexander von Humboldt)**:
  $$\\log S = \\log C + Z \\log A$$
  Rectangular hyperbola. Slope $Z$ is typically $0.1-0.2$ for small regions, and $0.6-1.2$ for large continental scales.

---

## Loss of Biodiversity: The 'Evil Quartet'
1. **Habitat Loss and Fragmentation**: Most important cause of extinction. Tropical rainforests reduced from $14\\%$ to $<6\\%$. Amazon 'lungs of planet' cleared for soybean and cattle pastures.
2. **Over-Exploitation**: Steller's sea cow, Passenger pigeon extinct due to human greed.
3. **Alien / Invasive Species**: Introduction of Nile Perch into Lake Victoria caused extinction of $>200$ cichlid fish species. Invasive weeds: *Parthenium* (carrot grass), *Lantana*, *Eichhornia* (water hyacinth). African catfish *Clarias gariepinus* threatens indigenous fishes.
4. **Co-Extinctions**: When host species goes extinct, obligate parasites and mutualists also perish.

---

## Biodiversity Conservation Strategies
- **In-Situ Conservation (On-site)**: Protecting endangered species within their natural habitats.
  - **Biodiversity Hotspots**: Regions with exceptional species richness and high endemism under severe threat. 34 hotspots worldwide; 3 in India: **Western Ghats & Sri Lanka**, **Indo-Burma**, **Himalaya**.
  - Protected Areas in India: 14 Biosphere Reserves (*Nilgiri* first in 1986), 90 National Parks, $>500$ Wildlife Sanctuaries.
  - **Sacred Groves**: Forest tracts protected through religious traditions (Khasi and Jaintia hills in Meghalaya, Aravalli hills in Rajasthan, Western Ghats in Karnataka/Maharashtra).
- **Ex-Situ Conservation (Off-site)**: Removing threatened plants and animals from vulnerable habitats to specialized settings for protection.
  - Zoological parks, Botanical gardens, Wildlife safari parks.
  - **Cryopreservation**: Preserving gametes in liquid nitrogen at $-196^\\circ\\text{C}$ in viable fertile condition for long periods.
  - In-vitro fertilisation, tissue culture propagation, and seed banks.
- **International Treaties**: Earth Summit in Rio de Janeiro (1992) and World Summit on Sustainable Development in Johannesburg (2002).
"""
            }
        ]
    }
]

NEET_ALL_COURSES = [
    # ── BIOLOGY COURSES (Units 1 to 5 and 6 to 10 divisions) ──────────────────
    {
        "title": "NEET Biology: Units 1 to 5 (Diversity, Anatomy, Cell, Plant & Human Physiology)",
        "description": "Class 11 core medical entrance syllabus: Living world classification, plant morphology & anatomy, animal tissues, cockroach & frog, cell organelles, biomolecules, cell division, photosynthesis, plant respiration, and human organ systems.",
        "career": "NEET Biology Specialist",
        "difficulty": "beginner",
        "units": BIOLOGY_UNITS_FULL[:5]
    },
    {
        "title": "NEET Biology: Units 6 to 10 (Reproduction, Genetics, Welfare, Biotechnology & Ecology)",
        "description": "Class 12 high-scoring medical entrance syllabus: Sexual reproduction in flowering plants, human reproduction, reproductive health, Mendelian genetics, molecular basis of inheritance, evolution, immunology, cancer/AIDS, biotechnology principles & applications, and ecology.",
        "career": "NEET Biology Specialist",
        "difficulty": "intermediate",
        "units": BIOLOGY_UNITS_FULL[5:10]
    },
    {
        "title": "NEET UG 2026: Biology Complete Master Syllabus (Units 1 to 10)",
        "description": "Comprehensive 360/360 target curriculum for NEET UG 2026 covering all 10 official units across Botany and Zoology with NCERT line-by-line notes, diagrams, comparison tables, and practice MCQs.",
        "career": "NEET Biology Specialist",
        "difficulty": "intermediate",
        "units": BIOLOGY_UNITS_FULL
    },

    # ── PHYSICS COURSES (5-Unit Divisions) ────────────────────────────────────
    {
        "title": "NEET Physics: Units 1 to 5 (Measurement, Kinematics, Laws of Motion, Work & Rotation)",
        "description": "Foundation mechanics for NEET: SI units, dimensional analysis, error propagation, 1D/2D kinematics, projectile motion, Newton's laws, friction, circular dynamics, work-energy theorem, vertical circle, collisions, and rotational motion.",
        "career": "NEET Physics Mastery",
        "difficulty": "beginner",
        "units": PHYSICS_UNITS[:5]
    },
    {
        "title": "NEET Physics: Units 6 to 10 (Gravitation, Solids & Fluids, Thermodynamics & Waves)",
        "description": "Core physical properties and oscillations: Kepler laws, variation of g, satellite motion, elasticity, fluid dynamics, Bernoulli theorem, surface tension, calorimetry, laws of thermodynamics, kinetic theory of gases, SHM, and acoustics.",
        "career": "NEET Physics Mastery",
        "difficulty": "intermediate",
        "units": PHYSICS_UNITS[5:10]
    },
    {
        "title": "NEET Physics: Units 11 to 15 (Electrostatics, Current Electricity, Magnetism & EM Waves)",
        "description": "High-weightage electrodynamics: Coulomb's law, Gauss theorem, electric potential, capacitors, drift velocity, Kirchhoff's laws, Wheatstone bridge, Biot-Savart law, cyclotron, electromagnetic induction, AC circuits, and EM spectrum.",
        "career": "NEET Physics Mastery",
        "difficulty": "advanced",
        "units": PHYSICS_UNITS[10:15]
    },
    {
        "title": "NEET Physics: Units 16 to 20 (Optics, Modern Physics, Semiconductor Devices & Lab Skills)",
        "description": "Final 5 units: Ray optics, mirrors, lenses, prism, wave optics, YDSE, diffraction, photoelectric effect, Bohr atom, nuclear physics, p-n junction diodes, Zener regulator, logic gates, and the complete practical lab syllabus.",
        "career": "NEET Physics Mastery",
        "difficulty": "intermediate",
        "units": PHYSICS_UNITS[15:20]
    },
    {
        "title": "NEET UG 2026: Physics Complete Master Syllabus (Units 1 to 20)",
        "description": "Complete 180/180 target curriculum for NEET UG 2026 covering all 20 official units with step-by-step mathematical derivations, vector diagrams, formulas, solved examples, and NEET-style MCQs.",
        "career": "NEET Physics Mastery",
        "difficulty": "intermediate",
        "units": PHYSICS_UNITS
    },

    # ── CHEMISTRY COURSES (5-Unit Divisions) ──────────────────────────────────
    {
        "title": "NEET Chemistry: Units 1 to 5 (Basic Concepts, Atomic Structure, Bonding, Thermodynamics & Solutions)",
        "description": "Physical Chemistry Part 1: Mole concept, stoichiometry, empirical formulas, Bohr model, quantum numbers, electronic configuration, VSEPR theory, hybridisation, molecular orbital theory, thermochemistry, Hess's law, and solution colligative properties.",
        "career": "NEET Chemistry Mastery",
        "difficulty": "beginner",
        "units": CHEMISTRY_UNITS[:5]
    },
    {
        "title": "NEET Chemistry: Units 6 to 10 (Equilibrium, Electrochemistry, Kinetics, Periodicity & p-Block)",
        "description": "Physical & Inorganic Chemistry: Le Chatelier principle, pH, buffers, solubility product Ksp, redox reactions, Nernst equation, electrolytic conductance, chemical kinetics, rate laws, Arrhenius equation, periodic trends, and p-block elements (groups 13 to 18).",
        "career": "NEET Chemistry Mastery",
        "difficulty": "intermediate",
        "units": CHEMISTRY_UNITS[5:10]
    },
    {
        "title": "NEET Chemistry: Units 11 to 15 (d- & f-Block, Coordination Compounds, Organic Purification & Hydrocarbons)",
        "description": "Inorganic & Organic Chemistry Part 1: Transition elements, lanthanoid contraction, potassium permanganate & dichromate, Werner coordination theory, CFT, isomerism, qualitative Lassaigne analysis, GOC electronic effects, reaction intermediates, and hydrocarbons.",
        "career": "NEET Chemistry Mastery",
        "difficulty": "intermediate",
        "units": CHEMISTRY_UNITS[10:15]
    },
    {
        "title": "NEET Chemistry: Units 16 to 20 (Haloalkanes, Oxygen & Nitrogen Compounds, Biomolecules & Practicals)",
        "description": "Organic & Practical Chemistry Part 2: SN1/SN2 mechanisms, haloarenes, alcohols, phenols, ethers, named reactions (Aldol, Cannizzaro, Reimer-Tiemann), carboxylic acids, amines, diazonium salts, carbohydrates, amino acids, vitamins, and salt analysis.",
        "career": "NEET Chemistry Mastery",
        "difficulty": "advanced",
        "units": CHEMISTRY_UNITS[15:20]
    },
    {
        "title": "NEET UG 2026: Chemistry Complete Master Syllabus (Units 1 to 20)",
        "description": "Complete 180/180 target curriculum for NEET UG 2026 covering all 20 official units of Physical, Inorganic, and Organic Chemistry with chemical equations, reaction mechanisms, worked numericals, and quick revision boxes.",
        "career": "NEET Chemistry Mastery",
        "difficulty": "intermediate",
        "units": CHEMISTRY_UNITS
    }
]

def populate_all_courses():
    with app.app_context():
        print("=" * 70)
        print("Starting Population of NEET Courses (Units 1-5, 6-10, 11-15, 16-20 Divisions)")
        print("=" * 70)

        # 1. Map careers
        career_map = {}
        for c in Career.query.all():
            career_map[c.name] = c.id

        default_career_id = list(career_map.values())[0] if career_map else 1

        # 2. Purge existing courses and topics
        print("\n1. Purging existing courses and topic hierarchy...")
        all_courses = Course.query.all()
        course_ids = [c.id for c in all_courses]
        if course_ids:
            all_topics = Topic.query.filter(Topic.course_id.in_(course_ids)).all()
            topic_ids = [t.id for t in all_topics]
            if topic_ids:
                LearningPathItem.query.filter(LearningPathItem.topic_id.in_(topic_ids)).delete(synchronize_session=False)
                TopicPrerequisite.query.filter(TopicPrerequisite.topic_id.in_(topic_ids)).delete(synchronize_session=False)
                TopicPrerequisite.query.filter(TopicPrerequisite.prerequisite_id.in_(topic_ids)).delete(synchronize_session=False)
                
                all_lessons = Lesson.query.filter(Lesson.topic_id.in_(topic_ids)).all()
                lesson_ids = [l.id for l in all_lessons]
                if lesson_ids:
                    LessonProgress.query.filter(LessonProgress.lesson_id.in_(lesson_ids)).delete(synchronize_session=False)
                    Lesson.query.filter(Lesson.id.in_(lesson_ids)).delete(synchronize_session=False)
                Topic.query.filter(Topic.id.in_(topic_ids)).delete(synchronize_session=False)

            CourseSkill.query.filter(CourseSkill.course_id.in_(course_ids)).delete(synchronize_session=False)
            Course.query.filter(Course.id.in_(course_ids)).delete(synchronize_session=False)
            db.session.commit()
            print(f"  -> Cleared {len(course_ids)} old courses.")

        # 3. Insert all new 13 courses with their unit divisions
        print(f"\n2. Inserting {len(NEET_ALL_COURSES)} NEET unit-divided courses...")
        total_topics = 0
        total_lessons = 0

        for c_idx, c_info in enumerate(NEET_ALL_COURSES):
            car_id = career_map.get(c_info["career"], default_career_id)
            course = Course(
                title=c_info["title"],
                description=c_info["description"],
                difficulty=c_info["difficulty"],
                career_id=car_id
            )
            db.session.add(course)
            db.session.flush()

            for t_idx, u in enumerate(c_info["units"]):
                topic = Topic(
                    course_id=course.id,
                    title=u["unit"],
                    description=u["description"],
                    order_index=t_idx + 1
                )
                db.session.add(topic)
                db.session.flush()
                total_topics += 1

                for l_idx, l in enumerate(u["lessons"]):
                    lesson = Lesson(
                        topic_id=topic.id,
                        title=l["title"],
                        content=l["content"],
                        order_index=l_idx + 1
                    )
                    db.session.add(lesson)
                    total_lessons += 1

            # Commit after each course to prevent DB connection timeout
            db.session.commit()
            print(f"  [{c_idx+1}/{len(NEET_ALL_COURSES)}] Created: '{course.title}' ({len(c_info['units'])} Units)")

        print("\n" + "=" * 70)
        print(f"SUCCESS: Populated {len(NEET_ALL_COURSES)} Courses, {total_topics} Units/Topics, and {total_lessons} In-depth Lessons.")
        print("=" * 70)

if __name__ == '__main__':
    populate_all_courses()
